import React from 'react';
import { DndClass, Subclass } from '../types';


interface StrategyGuideProps {
  dndClass: DndClass;
  subclass: Subclass;
}

const StrategyGuide: React.FC<StrategyGuideProps> = ({ dndClass, subclass }) => {
  if (!subclass) return null;

  return (
    <div className="bg-gradient-to-br from-slate-900 to-amber-950/20 border-2 border-amber-600/30 p-6 rounded-2xl shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">💡</span>
        <div>
          <h2 className="text-2xl font-bold text-amber-400">Guia de Estratégia: {subclass.name}</h2>
          <p className="text-xs text-amber-600/70 uppercase tracking-widest font-black">Como brilhar na mesa de jogo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Coluna 1: O Papel do Herói */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-300 uppercase mb-2 border-b border-slate-700">⚔️ Em Combate</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{dndClass.combatRole}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-slate-300 uppercase mb-2 border-b border-slate-700">🗣️ Fora de Combate</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{dndClass.outOfCombatRole}</p>
          </div>
        </div>

        {/* Coluna 2: Sinergia e Gameplay */}
        <div className="bg-black/30 p-4 rounded-xl border border-amber-900/20">
          <h3 className="text-amber-500 font-bold mb-2 flex items-center gap-2">
            ✨ Sinergia da Subclasse
          </h3>
          <p className="text-sm text-slate-300 mb-4 italic">
            {subclass.description}
          </p>
          
          <div className="p-3 bg-amber-600/10 rounded border border-amber-500/20">
            <span className="text-[10px] font-black text-amber-600 uppercase">Dica de Mestre:</span>
            <p className="text-xs text-amber-200/80 leading-snug mt-1">
              {subclass.synergy}
            </p>
          </div>
        </div>
      </div>

      {/* Explicador de Regra Rápida */}
      <div className="mt-8 pt-4 border-t border-slate-800 text-center">
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
          Dica: Sempre que atacar ou usar uma perícia, role um **d20** e some o seu **Modificador**.
        </p>
      </div>
    </div>
  );
};

export default StrategyGuide;