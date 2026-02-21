import React from 'react';
import { AbilityScore } from '../types';
import { calculateModifier } from '../utils/dndMath';

interface StatCardProps {
  label: AbilityScore;
  value: number;
}

// Dicionário Educativo Interno (Encapsulamento de Conhecimento)
const STAT_DESCRIPTIONS: Record<AbilityScore, string> = {
  Força: "Mede o poder físico bruto. Importante para atacar com armas pesadas e atletismo.",
  Destreza: "Mede agilidade, reflexos e equilíbrio. Influencia sua Defesa (CA) e iniciativa.",
  Constituição: "Mede saúde e vitalidade. Define quantos Pontos de Vida (HP) você terá.",
  Inteligência: "Mede acuidade mental e memória. Essencial para Magos e investigação.",
  Sabedoria: "Mede percepção e intuição. Vital para Clérigos e notar perigos ao redor.",
  Carisma: "Mede a força de personalidade e persuasão. Usado por Bardos e Paladinos."
};

const StatCard: React.FC<StatCardProps> = ({ label, value }) => {
  const modifier = calculateModifier(value);
  const modifierDisplay = modifier >= 0 ? `+${modifier}` : modifier;

  // Cálculo da porcentagem para a barra visual (D&D vai de 1 a 20 para jogadores)
  const progressWidth = Math.min((value / 20) * 100, 100);

  return (
    <div className="group bg-slate-900 border-2 border-slate-800 hover:border-amber-500/50 p-4 rounded-xl transition-all duration-300 shadow-inner relative overflow-hidden">
      {/* Background Decorativo (Brilho Sutil) */}
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-500/5 blur-2xl group-hover:bg-amber-500/10 transition-all" />

      <div className="flex justify-between items-start mb-2">
        <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs">{label}</h3>
        <span className="text-xs text-slate-500 font-mono">Base: {value}</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Círculo do Modificador - O número mais usado no jogo */}
        <div className="flex flex-col items-center justify-center w-14 h-14 bg-amber-600 rounded-lg shadow-lg border border-amber-400/30">
          <span className="text-2xl font-black text-white leading-none">{modifierDisplay}</span>
          <span className="text-[10px] text-amber-100 font-bold uppercase mt-1">MOD</span>
        </div>

        {/* Informação Educativa Contextual */}
        <div className="flex-1">
          <p className="text-[11px] leading-tight text-slate-400 italic">
            {STAT_DESCRIPTIONS[label]}
          </p>
        </div>
      </div>

      {/* Barra de Progresso Visual */}
      <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-amber-700 to-amber-400 transition-all duration-1000 ease-out"
          style={{ width: `${progressWidth}%` }}
        />
      </div>

      {/* Rodapé Matemático (O "Porquê") */}
      <div className="mt-2 text-[9px] text-slate-600 font-mono text-right italic">
        Fórmula: $$ ( {value} - 10 ) / 2 $$
      </div>
    </div>
  );
};

export default StatCard;