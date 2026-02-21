import React, { useState } from "react";
import { AbilityScore, Character } from "./types";
import { generateRandomCharacter } from "./utils/generatorLogic";

// Importação dos novos componentes modulares
import StatCard from "./components/StatCard";
import CombatStats from "./components/CombatStats";
import SkillsList from "./components/SkillsList";
import CharacterIdentity from "./components/CharacterIdentity";
import StrategyGuide from "./components/StrategyGuide";

const CharacterGenerator: React.FC = () => {
    const [character, setCharacter] = useState<Character | null>(null);

    const handleGenerate = () => {
        const newChar = generateRandomCharacter();
        setCharacter(newChar);
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-serif print:bg-white print:text-slate-900 print:p-0">
            <div className="print-container">
                {/* Header Épico */}
                <header className="text-center mb-12 border-b border-amber-900/20 pb-8">
                    <h1 className="text-4xl md:text-7xl font-black text-amber-500 mb-4 tracking-tighter drop-shadow-md">
                        D&D 2024 HEROES ⚔️
                    </h1>
                    <p className="text-slate-400 italic text-lg max-w-2xl mx-auto print:text-sm print:text-slate-600">
                        Gere heróis lendários instantaneamente e aprenda as
                        regras do novo Player's Handbook.
                    </p>

                    <div className="flex justify-center gap-4 mt-8 print:hidden">
                        <button
                            onClick={handleGenerate}
                            className="bg-amber-600 hover:bg-amber-500 text-white px-10 py-4 rounded-full 
                                   font-bold text-xl transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(217,119,6,0.3)]"
                        >
                            🎲 Gerar Personagem
                        </button>

                        {character && (
                            <button
                                onClick={() => window.print()}
                                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 
                                     hover:text-white px-6 py-4 rounded-full font-bold transition-all"
                            >
                                📜 Exportar PDF
                            </button>
                        )}
                    </div>
                </header>

                <section className="max-w-6xl mx-auto space-y-10 print:space-y-4">
                    {character && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10 print:space-y-6">
                            {/* 1. Identidade e Guia de Estratégia (Layout Full Width) */}
                            <section className="space-y-6 print:space-y-4">
                                <CharacterIdentity
                                    background={character.background}
                                    alignment={character.alignment}
                                />

                                <div className="print:break-inside-avoid">
                                    <StrategyGuide
                                        dndClass={character.dndClass}
                                        subclass={character.selectedSubclass}
                                    />
                                </div>
                            </section>

                            {/* 2. Grid de Atributos, Combate e Perícias */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 print:grid-cols-12 print:gap-4">
                                {/* Coluna de Atributos (Stats) */}
                                <div className="lg:col-span-5 print:col-span-5 grid grid-cols-2 gap-4 h-fit">
                                    {(
                                        Object.entries(character.stats) as [
                                            AbilityScore,
                                            number,
                                        ][]
                                    ).map(([ability, value]) => (
                                        <StatCard
                                            key={ability}
                                            label={ability}
                                            value={value}
                                        />
                                    ))}
                                </div>

                                {/* Coluna de Combate e Perícias */}
                                <div className="lg:col-span-7 space-y-8">
                                    <CombatStats
                                        dndClass={character.dndClass}
                                        stats={character.stats}
                                        level={character.level}
                                    />
                                    <SkillsList
                                        stats={character.stats}
                                        proficiencyBonus={2}
                                    />
                                </div>
                            </div>

                            {/* Footer Educativo */}
                            <footer className="text-center py-10 opacity-50">
                                <p className="text-xs uppercase tracking-[0.3em]">
                                    Criado para D&D 5ª Edição - Player's
                                    Handbook 2024
                                </p>
                            </footer>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default CharacterGenerator;
