import React, { useMemo } from 'react';
import { DndClass, AbilityScore } from '../types';
import { calculateModifier } from '../utils/dndMath';

interface CombatStatsProps {
  dndClass: DndClass;
  stats: Record<AbilityScore, number>;
  level: number;
}

// Sub-componente especializado para manter a Responsabilidade Única
const CombatBox: React.FC<{ title: string; value: string | number; description: string; formula: string }> = ({ 
  title, value, description, formula 
}) => (
  <div className="flex flex-col bg-slate-800/50 border-l-4 border-amber-600 p-4 rounded-r-lg">
    <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">{title}</span>
    <span className="text-4xl font-black text-white my-1">{value}</span>
    <p className="text-[11px] text-slate-400 italic mb-2 leading-tight">{description}</p>
    <span className="text-[9px] font-mono text-slate-500 mt-auto">{formula}</span>
  </div>
);

const CombatStats: React.FC<CombatStatsProps> = ({ dndClass, stats }) => {
  // Memoizamos os cálculos para performance e clareza
  const combatData = useMemo(() => {
    const conMod = calculateModifier(stats['Constituição']);
    const dexMod = calculateModifier(stats['Destreza']);
    
    return {
      hp: dndClass.hitDie + conMod,
      ac: 10 + dexMod,
      proficiency: 2 // No nível 1, é sempre +2 no D&D 2024
    };
  }, [dndClass, stats]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-700 shadow-xl">
      <CombatBox 
        title="Pontos de Vida (HP)"
        value={combatData.hp}
        description="Sua saúde. Se chegar a 0, você cai em combate."
        formula={`$$ ${dndClass.hitDie} (d${dndClass.hitDie}) + ${calculateModifier(stats['Constituição'])} (CON) $$`}
      />

      <CombatBox 
        title="Classe de Armadura (CA)"
        value={combatData.ac}
        description="O quão difícil é te acertar. Inclui sua agilidade natural."
        formula={`$$ 10 + ${calculateModifier(stats['Destreza'])} (DEX) $$`}
      />

      <CombatBox 
        title="Bônus de Proficiência"
        value={`+${combatData.proficiency}`}
        description="Reflete seu treinamento. Adicionado em perícias que você domina."
        formula="$$ \text{Fixo (Nível 1)} $$"
      />
    </div>
  );
};

export default CombatStats;