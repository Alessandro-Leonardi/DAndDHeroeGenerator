import { Character, DndClass, Race, AbilityScore, Subclass } from '../types';
import { calculateModifier, roll4d6DropLowest } from './dndMath';

// --- CONSTANTES DE DADOS (O "CONHECIMENTO" DO APP) ---

const RACES: Race[] = [
  {
      name: "Humano",
      description: "Versáteis e ambiciosos, humanos são conhecidos por sua adaptabilidade.",
      traits: ["Iniciativa Adicional", "Proficiência em uma Perícia"],
      gameplayImpact: "Excelente para qualquer classe. Começa com um talento extra no nível 1.",
      bonus: { "Força": 1, "Destreza": 1, "Constituição": 1, "Inteligência": 1, "Sabedoria": 1, "Carisma": 1 },
      speed: 0
  },
  {
      name: "Goliath",
      description: "Descendentes de gigantes, possuem força física descomunal e resistência.",
      traits: ["Ancestralidade Gigante", "Grande Estatura"],
      gameplayImpact: "Perfeito para tanques e combatentes corpo-a-corpo.",
      bonus: { "Força": 2, "Constituição": 1 },
      speed: 0
  },
  // ... (As outras raças seguiriam este padrão)
];

const CLASSES: DndClass[] = [
  {
    name: "Guerreiro",
    hitDie: 10,
    primaryAbility: ["Força", "Destreza"],
    description: "Mestres do combate marcial e das armas.",
    combatRole: "Linha de frente, dano físico constante.",
    outOfCombatRole: "Atleta e especialista em táticas.",
    subclasses: [
      { name: "Campeão", description: "Foco em acertos críticos.", synergy: "Sinergia pura com Força." },
      { name: "Mestre de Batalha", description: "Usa manobras táticas.", synergy: "Bom com Inteligência ou Carisma secundário." },
      { name: "Cavaleiro Psíquico", description: "Poderes mentais em combate.", synergy: "Requer Inteligência alta." },
      { name: "Eldritch Knight", description: "Guerreiro com magias.", synergy: "Foco em Inteligência." }
    ]
  },
  // ... (As outras 11 classes seguiriam este padrão)
];

const BACKGROUNDS = [
  { name: "Acólito", trait: "Religião/Intuição", impact: "Focado em suporte e conhecimento divino." },
  { name: "Soldado", trait: "Atletismo/Intimidação", impact: "Ideal para personagens de frente de batalha." },
];

const ALIGNMENTS = [
  "Leal e Bom", "Neutro e Bom", "Caótico e Bom",
  "Leal e Neutro", "Neutro", "Caótico e Neutro",
  "Leal e Mau", "Neutro e Mau", "Caótico e Mau"
];

// --- FUNÇÕES AUXILIARES ---

const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// --- LÓGICA PRINCIPAL DE GERAÇÃO ---

export const generateRandomCharacter = (): Character => {
  const race = getRandomItem(RACES);
  const dndClass = getRandomItem(CLASSES);
  const subclass = getRandomItem(dndClass.subclasses);
  const background = getRandomItem(BACKGROUNDS);
  const alignment = getRandomItem(ALIGNMENTS);

  // Gerando atributos base usando 4d6 (conforme solicitado)
  const baseStats: Record<AbilityScore, number> = {
    "Força": roll4d6DropLowest(),
    "Destreza": roll4d6DropLowest(),
    "Constituição": roll4d6DropLowest(),
    "Inteligência": roll4d6DropLowest(),
    "Sabedoria": roll4d6DropLowest(),
    "Carisma": roll4d6DropLowest(),
  };

  // Aplicando bônus raciais (Mentoria: Imutabilidade é chave aqui)
  const finalStats = { ...baseStats };
  if (race.bonus) {
    Object.entries(race.bonus).forEach(([stat, bonus]) => {
      finalStats[stat as AbilityScore] += bonus;
    });
  }

  return {
    name: "Herói Aleatório", // Poderia ser um gerador de nomes depois
    race,
    dndClass,
    selectedSubclass: subclass,
    background: background.name,
    alignment,
    stats: finalStats,
    level: 1
  };
};