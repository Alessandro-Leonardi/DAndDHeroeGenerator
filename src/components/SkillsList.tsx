import React from 'react';
import { AbilityScore } from '../types';
import { calculateModifier } from '../utils/dndMath';

interface Skill {
  name: string;
  ability: AbilityScore;
  description: string;
}

const ALL_SKILLS: Skill[] = [
  { name: 'Atletismo', ability: 'Força', description: 'Correr, saltar, escalar e atividades físicas brutas.' },
  { name: 'Acrobacia', ability: 'Destreza', description: 'Manter-se em pé em superfícies instáveis e acrobacias.' },
  { name: 'Furtividade', ability: 'Destreza', description: 'Esconder-se e mover-se silenciosamente.' },
  { name: 'Prestidigitação', ability: 'Destreza', description: 'Mãos leves, roubo e tarefas manuais delicadas.' },
  { name: 'Arcanismo', ability: 'Inteligência', description: 'Conhecimento sobre magia, planos e itens mágicos.' },
  { name: 'História', ability: 'Inteligência', description: 'Recordar eventos passados, povos e reinos.' },
  { name: 'Investigação', ability: 'Inteligência', description: 'Deduzir conclusões e encontrar pistas escondidas.' },
  { name: 'Natureza', ability: 'Inteligência', description: 'Conhecimento sobre fauna, flora e clima.' },
  { name: 'Religião', ability: 'Inteligência', description: 'Conhecimento sobre deuses, ritos e cultos.' },
  { name: 'Adestrar Animais', ability: 'Sabedoria', description: 'Acalmar ou controlar animais domésticos e selvagens.' },
  { name: 'Intuição', ability: 'Sabedoria', description: 'Ler linguagem corporal e detectar mentiras.' },
  { name: 'Medicina', ability: 'Sabedoria', description: 'Estabilizar feridos e diagnosticar doenças.' },
  { name: 'Percepção', ability: 'Sabedoria', description: 'Notar detalhes ambientais e detectar perigos.' },
  { name: 'Sobrevivência', ability: 'Sabedoria', description: 'Rastrear, caçar e guiar em ambientes selvagens.' },
  { name: 'Atuação', ability: 'Carisma', description: 'Cantar, dançar ou interpretar um papel.' },
  { name: 'Enganação', ability: 'Carisma', description: 'Disfarçar a verdade com palavras ou ações.' },
  { name: 'Intimidação', ability: 'Carisma', description: 'Influenciar alguém através do medo ou ameaças.' },
  { name: 'Persuasão', ability: 'Carisma', description: 'Influenciar alguém com diplomacia e etiqueta.' },
];

interface SkillsListProps {
  stats: Record<AbilityScore, number>;
  proficiencyBonus: number;
}

// --- Sub-componente: SkillItem (Responsabilidade Única) ---
const SkillItem: React.FC<{ skill: Skill; mod: number }> = ({ skill, mod }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
    <div className="flex items-center gap-3 min-w-[140px]">
      <div className="w-8 h-8 flex items-center justify-center bg-amber-600/20 text-amber-500 font-bold rounded border border-amber-500/30">
        {mod >= 0 ? `+${mod}` : mod}
      </div>
      <span className="font-bold text-slate-200">{skill.name}</span>
    </div>
    <p className="text-[11px] text-slate-400 italic flex-1 leading-tight">
      {skill.description}
    </p>
  </div>
);

// --- Componente Principal ---
const SkillsList: React.FC<SkillsListProps> = ({ stats }) => {
  const abilities: AbilityScore[] = ['Força', 'Destreza', 'Inteligência', 'Sabedoria', 'Carisma'];

  return (
    <div className="space-y-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
      <div className="border-b border-amber-900/30 pb-4">
        <h2 className="text-2xl font-bold text-amber-500 flex items-center gap-2">
          📚 Perícias & Conhecimentos
        </h2>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">O que seu personagem sabe fazer na prática</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-12 gap-y-6">
        {abilities.map(ability => {
          const filteredSkills = ALL_SKILLS.filter(s => s.ability === ability);
          if (filteredSkills.length === 0) return null;

          return (
            <div key={ability} className="space-y-3">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-tighter border-l-2 border-slate-700 pl-2">
                Baseadas em {ability}
              </h3>
              <div className="grid gap-2">
                {filteredSkills.map(skill => (
                  <SkillItem 
                    key={skill.name} 
                    skill={skill} 
                    mod={calculateModifier(stats[ability])} 
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsList;