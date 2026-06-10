// 게임 런타임 상태 (골드/점수/웨이브/인벤토리 메타). 이벤트 버스로 HUD 갱신.

import { registry } from './registry';

export type GameStateSnapshot = {
  gold: number;
  score: number;
  wave: number;
  waveProgress: number;
  waveTotal: number;
  units: number;
  unitsMax: number;
  mobs: number;
  mobsCap: number;
  summonCost: number;
  autoMerge: boolean;
};

export class GameState {
  gold: number;
  score: number = 0;
  wave: number = 1;
  waveProgress: number = 0; // 이번 웨이브 처치 수
  waveTotal: number = 0;    // 이번 웨이브 총 몹 수
  purchases: number = 0;    // 소환 횟수 (비용 곡선)
  autoMerge: boolean = true;

  constructor() {
    this.gold = registry.config.startGold;
  }

  get summonCost(): number {
    return registry.summonCost(this.purchases);
  }

  canAfford(cost: number): boolean {
    return this.gold >= cost;
  }

  spend(amount: number): void {
    this.gold = Math.max(0, this.gold - amount);
  }

  earn(amount: number): void {
    this.gold += amount;
  }

  addScore(amount: number): void {
    this.score += amount;
  }
}
