export type AbilityScore = 'Força' | 'Destreza' | 'Constituição' | 'Inteligência' | 'Sabedoria' | 'Carisma' ;

export interface Subclass {
  name: string;
  description: string;
  synergy: string; // Explicação educativa de como ela brilha
}

export interface DndClass {
  name: string;
  hitDie: number; // Dado de Vida (d8, d10, etc)
  primaryAbility: AbilityScore[]; // Atributos principais para essa classe
  description: string;
  combatRole: string;
  outOfCombatRole: string;
  subclasses: Subclass[];
}

export interface Character {
  name: string;
  race: Race;
  dndClass: DndClass;
  selectedSubclass: Subclass;
  background: string;    // Certifique-se de que esta linha existe
  alignment: string;
  stats: Record<AbilityScore, number>;
  level: number;
}

export interface Race {
  name: string;
  description: string;
  traits: string[];
  gameplayImpact: string; // Adicionado para resolver o erro
  speed: number;
  // O bônus é opcional pois algumas raças podem ter lógicas diferentes
  bonus?: Partial<Record<AbilityScore, number>>; 
}