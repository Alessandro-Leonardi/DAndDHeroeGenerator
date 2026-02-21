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
    {
        name: "Elfo",
        description: "Seres longevos ligados à magia e à natureza, com sentidos aguçados.",
        traits: ["Visão no Escuro", "Ancestralidade Feérica", "Transe (4h de descanso)"],
        gameplayImpact: "Alta mobilidade e resistência a magias de sono e encanto.",
        bonus: { "Destreza": 2, "Inteligência": 1 },
        speed: 9
    },
    {
        name: "Anão",
        description: "Resilientes e fortes, mestres da forja e da pedra com constituição inabalável.",
        traits: ["Resiliência Anã", "Sentido da Rocha", "Visão no Escuro Superior"],
        gameplayImpact: "Extremamente duráveis. Ganham mais pontos de vida a cada nível.",
        bonus: { "Constituição": 2, "Força": 1 },
        speed: 7.5
    },
    {
        name: "Draconato",
        description: "Descendentes de dragões que canalizam o poder elemental em seus sopros.",
        traits: ["Arma de Sopro", "Resistência Elemental", "Linhagem Dracônica"],
        gameplayImpact: "Poderoso ataque de área e resistência a um tipo específico de dano.",
        bonus: { "Força": 2, "Carisma": 1 },
        speed: 9
    },
    {
        name: "Halfling",
        description: "Pequenos, ágeis e extremamente sortudos, capazes de evitar desastres.",
        traits: ["Sorte (Rerolar 1)", "Bravura", "Agilidade Halfling"],
        gameplayImpact: "Consistência incrível em rolagens, raramente falham criticamente.",
        bonus: { "Destreza": 2, "Carisma": 1 },
        speed: 7.5
    },
    {
        name: "Tiefling",
        description: "Marcados por uma linhagem infernal, possuem afinidade natural com magia sombria.",
        traits: ["Resistência Infernal", "Legado Diabólico (Magias)", "Visão no Escuro"],
        gameplayImpact: "Ótimos para classes de Carisma, com acesso a truques mágicos natos.",
        bonus: { "Carisma": 2, "Inteligência": 1 },
        speed: 9
    }
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
    {
        name: "Mago",
        hitDie: 6,
        primaryAbility: ["Inteligência"],
        description: "Estudiosos das artes arcanas que manipulam a realidade.",
        combatRole: "Dano em área e controle de campo.",
        outOfCombatRole: "Especialista em conhecimento histórico e arcano.",
        subclasses: [
            { name: "Abjurador", description: "Mestre das proteções mágicas.", synergy: "Excelente para quem quer sobreviver." },
            { name: "Evocador", description: "Poder destrutivo bruto e explosivo.", synergy: "Foco total em Inteligência e dano." },
            { name: "Adivinho", description: "Manipula a sorte e vê o futuro.", synergy: "Estratégico para controlar rolagens de dados." }
        ]
    },
    {
        name: "Ladino",
        hitDie: 8,
        primaryAbility: ["Destreza"],
        description: "Especialistas em furtividade, perícias e ataques precisos.",
        combatRole: "Dano explosivo em alvo único e mobilidade.",
        outOfCombatRole: "Infiltração, abrir fechaduras e desarmar armadilhas.",
        subclasses: [
            { name: "Assassino", description: "Letal contra alvos desprevenidos.", synergy: "Sinergia com alta Iniciativa." },
            { name: "Ladrão", description: "Extrema agilidade manual.", synergy: "Interage com objetos como ação bônus." },
            { name: "Trapaceiro Arcano", description: "Mistura ladinagem com ilusões.", synergy: "Requer Inteligência como atributo secundário." }
        ]
    },
    {
        name: "Clérigo",
        hitDie: 8,
        primaryAbility: ["Sabedoria"],
        description: "Intermediários entre os deuses e os mortais.",
        combatRole: "Suporte, cura e tanques secundários.",
        outOfCombatRole: "Curandeiro e conselheiro espiritual.",
        subclasses: [
            { name: "Domínio da Vida", description: "Mestre absoluto da cura.", synergy: "Indispensável para a longevidade do grupo." },
            { name: "Domínio da Guerra", description: "Lutador abençoado pela divindade.", synergy: "Sinergia com Força para ataques extras." },
            { name: "Domínio da Luz", description: "Canaliza o poder do sol para incinerar inimigos.", synergy: "Sinergia com Sabedoria para magias de fogo." }
        ]
    },
    {
        name: "Paladino",
        hitDie: 10,
        primaryAbility: ["Força", "Carisma"],
        description: "Guerreiros sagrados unidos por um juramento inquebrável.",
        combatRole: "Tanque robusto com alto dano de impacto (Smite).",
        outOfCombatRole: "Líder inspirador e diplomata.",
        subclasses: [
            { name: "Devoção", description: "O cavaleiro clássico da justiça.", synergy: "Equilibra perfeitamente Força e Carisma." },
            { name: "Vingança", description: "Focado em caçar um único inimigo.", synergy: "Melhor para quem foca em dano puro." },
            { name: "Anciões", description: "Defensor da natureza e da luz.", synergy: "Ganham defesas mágicas incríveis." }
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