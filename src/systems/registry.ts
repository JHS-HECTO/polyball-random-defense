// 게임 데이터 레지스트리 — JSON 로드 + 타입 검증 + 룩업 헬퍼.
// 한 번 로드 후 전역 싱글톤으로 공유.

import Phaser from 'phaser';

export type Grade = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic_low' | 'mythic';
export type Element = 'fire' | 'water' | 'wind' | 'earth' | 'light' | 'dark';
export type Role = 'contact' | 'slugger' | 'speedster' | 'splasher' | 'sniper';

export type RoleCfg = {
  atkMul: number;
  spdMul: number;
  rangeMul: number;
  splash: number;
  splashFrac: number;
  projSpd: number;
  projSize: number;
  label: string;
  badge: string;
};

export type Unit = {
  id: string;
  name: string;
  grade: Grade;
  role: Role;
  element: Element;
  baseAtk: number;
  baseRange: number;
  baseAtkSpeed: number;
  splashRadius: number;
  projectileSpeed: number;
  projectileType: string;
  sprite: string;
};

// 등급×역할 최종 스탯
export type ResolvedStats = {
  atk: number;
  range: number;
  atkSpeed: number;
  splashRadius: number;
  splashFrac: number;
  projSpeed: number;
  projSize: number;
};

export type Enemy = {
  id: string;
  name: string;
  hp: number;
  speed: number;
  sprite: string;
  isBoss: boolean;
  element: Element;
};

export type MergeRecipe = {
  materials: string[];
  result: string;
};

export type HiddenRecipe = {
  name: string;
  materials: string[];
  result: string;
};

// config.json 타입
export type GameConfig = {
  summonCost: { base: number; growth: number; growthFlat: number };
  summonCostFixed: number;
  rerollCost: number;
  maxUnits: number;
  startGold: number;
  goldPerKill: Record<string, number>;
  goldPerKillFlat: number;
  goldPerWaveClear: number;
  gradeWeights: Record<Grade, number>;
  roles: Record<Role, RoleCfg>;
  gradeMultiplier: Record<Grade, number>;
  gradeSpeedBonus: Record<Grade, number>;
  gradeRangeBonus: Record<Grade, number>;
  mobHpByWave: { base: number; perWaveMult: number; bossMult: number };
  mobSpeed: { base: number; perWaveAdd: number; berserkMult: number; maxSpeed: number };
  mobsPerWave: number;
  bossEveryNWaves: number;
  berserkEveryNWaves: number;
  bossHpMultiplier: number;
  gameOverMobCount: number;
  sellRatio: number;
  sellByGrade: Record<Grade, number>;
  waveDurationMs: number;
  bossTimeLimitMs: number;
  bossBaseHp: number;
  bossHpPerBoss: number;
  gradeLabels: Record<Grade, string>;
  gradeColors: Record<Grade, string>;
  anim: {
    idleBobAmp: number;
    idleBobPeriodMs: number;
    idleScaleY: number;
    attackLungePx: number;
    attackLungeInMs: number;
    attackLungeOutMs: number;
    attackSquashScaleX: number;
    attackSquashScaleY: number;
    batSwingMs: number;
    projectileSpeed: number;
    mobHitFlashMs: number;
    mobKnockbackPx: number;
    mobDeathMs: number;
    summonPopInMs: number;
    mergeFlashMs: number;
    vignetteWarnAtMobCount: number;
  };
  elementAdvantage: Record<Element, Element>;
  elementMultiplier: number;
};

class Registry {
  config!: GameConfig;
  units!: ReadonlyArray<Unit>;
  enemies!: ReadonlyArray<Enemy>;
  mergeRecipes!: ReadonlyArray<MergeRecipe>;
  hiddenRecipes!: ReadonlyArray<HiddenRecipe>;

  private unitMap = new Map<string, Unit>();
  private enemyMap = new Map<string, Enemy>();
  private mergeMap = new Map<string, string>(); // sorted material ids → result

  loaded = false;

  loadFromCache(scene: Phaser.Scene): void {
    const cfg = scene.cache.json.get('config') as GameConfig;
    const u = scene.cache.json.get('units') as { units: Unit[] };
    const e = scene.cache.json.get('enemies') as { enemies: Enemy[] };
    const r = scene.cache.json.get('recipes') as { merge: MergeRecipe[]; hidden: HiddenRecipe[] };

    if (!cfg || !u || !e || !r) {
      throw new Error('Registry: required JSON missing from cache');
    }

    this.config = cfg;
    this.units = u.units;
    this.enemies = e.enemies;
    this.mergeRecipes = r.merge;
    this.hiddenRecipes = r.hidden;

    this.unitMap.clear();
    for (const unit of this.units) this.unitMap.set(unit.id, unit);
    this.enemyMap.clear();
    for (const en of this.enemies) this.enemyMap.set(en.id, en);

    this.mergeMap.clear();
    for (const rec of this.mergeRecipes) {
      const k = [...rec.materials].sort().join('|');
      this.mergeMap.set(k, rec.result);
    }

    this.loaded = true;
  }

  unit(id: string): Unit | undefined {
    return this.unitMap.get(id);
  }

  enemy(id: string): Enemy | undefined {
    return this.enemyMap.get(id);
  }

  // 같은 id 3개 → 결과 id. 없으면 null.
  mergeResult(materialIds: string[]): string | null {
    const k = [...materialIds].sort().join('|');
    return this.mergeMap.get(k) ?? null;
  }

  // 히든 조합 매치 — 보유 인벤토리 중 매치 가능한 첫 레시피 반환
  matchHidden(ownedIds: ReadonlyArray<string>): HiddenRecipe | null {
    const owned = new Map<string, number>();
    for (const id of ownedIds) owned.set(id, (owned.get(id) ?? 0) + 1);
    for (const rec of this.hiddenRecipes) {
      const need = new Map<string, number>();
      for (const m of rec.materials) need.set(m, (need.get(m) ?? 0) + 1);
      let ok = true;
      for (const [id, n] of need) {
        if ((owned.get(id) ?? 0) < n) {
          ok = false;
          break;
        }
      }
      if (ok) return rec;
    }
    return null;
  }

  // 가중치 랜덤 등급 → 그 등급 내 랜덤 유닛 1개
  rollRandomUnit(): Unit {
    const w = this.config.gradeWeights;
    const total = Object.values(w).reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    let pickedGrade: Grade = 'common';
    for (const [grade, weight] of Object.entries(w) as Array<[Grade, number]>) {
      r -= weight;
      if (r <= 0) {
        pickedGrade = grade;
        break;
      }
    }
    const pool = this.units.filter((u) => u.grade === pickedGrade);
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx] ?? this.units[0]!;
  }

  // 소환 비용 — 고정 50 (config.summonCostFixed)
  summonCost(_purchaseIndex: number): number {
    return this.config.summonCostFixed;
  }

  gradeOrder(): Grade[] {
    return ['common', 'rare', 'epic', 'legendary', 'mythic_low', 'mythic'];
  }

  // 등급 × 역할 최종 스탯
  resolveStats(u: Unit): ResolvedStats {
    const role = this.config.roles[u.role];
    const gMul = this.config.gradeMultiplier[u.grade];
    const spdBonus = this.config.gradeSpeedBonus[u.grade];
    const rngBonus = this.config.gradeRangeBonus[u.grade];
    return {
      atk: Math.round(u.baseAtk * gMul * role.atkMul),
      range: Math.round(u.baseRange * rngBonus * role.rangeMul),
      atkSpeed: u.baseAtkSpeed * spdBonus * role.spdMul,
      splashRadius: role.splash,
      splashFrac: role.splashFrac,
      projSpeed: role.projSpd,
      projSize: role.projSize,
    };
  }

  // 속성 상성 데미지 배수
  elementMultiplier(attacker: Element, defender: Element): number {
    if (this.config.elementAdvantage[attacker] === defender) return this.config.elementMultiplier;
    return 1;
  }
}

export const registry = new Registry();
