import React from 'react';

interface IdentityProps {
  background: string;
  alignment: string;
}

// Dados didáticos para o "Mini Curso"
const IDENTITY_INFO = {
  background: {
    title: "📜 O que é um Antecedente?",
    desc: "Representa o que você fazia antes de ser um aventureiro. No D&D 2024, ele define suas perícias iniciais e seu primeiro Talento (Feat)."
  },
  alignment: {
    title: "⚖️ O que é Tendência?",
    desc: "É a bússola moral do seu herói. Ela ajuda você a decidir como seu personagem reagiria a dilemas éticos durante a jornada."
  }
};

const CharacterIdentity: React.FC<IdentityProps> = ({ background, alignment }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/40 p-6 rounded-2xl border border-amber-900/20">
      
      {/* Seção de Antecedente */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎭</span>
          <h3 className="text-xl font-bold text-amber-500">Antecedente: {background}</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed italic">
          "Seu passado moldou suas habilidades. Como {background}, você traz experiências únicas para o grupo."
        </p>
        <div className="bg-amber-950/20 p-3 rounded-lg border-l-2 border-amber-700">
          <h4 className="text-[10px] font-black uppercase text-amber-600 mb-1">{IDENTITY_INFO.background.title}</h4>
          <p className="text-[11px] text-slate-400">{IDENTITY_INFO.background.desc}</p>
        </div>
      </div>

      {/* Seção de Tendência */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔮</span>
          <h3 className="text-xl font-bold text-amber-500">Tendência: {alignment}</h3>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed italic">
          "Agindo como um herói {alignment}, o mundo reagirá às suas escolhas e valores."
        </p>
        <div className="bg-amber-950/20 p-3 rounded-lg border-l-2 border-amber-700">
          <h4 className="text-[10px] font-black uppercase text-amber-600 mb-1">{IDENTITY_INFO.alignment.title}</h4>
          <p className="text-[11px] text-slate-400">{IDENTITY_INFO.alignment.desc}</p>
        </div>
      </div>

    </div>
  );
};

export default CharacterIdentity;