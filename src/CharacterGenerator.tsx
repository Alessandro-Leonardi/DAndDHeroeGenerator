import React, { useState } from "react";
import { AbilityScore, Character } from "./types";
import { generateRandomCharacter } from "./utils/generatorLogic";

// Importação dos componentes para a versão de tela
import StatCard from "./components/StatCard";
import CombatStats from "./components/CombatStats";
import SkillsList from "./components/SkillsList";
import CharacterIdentity from "./components/CharacterIdentity";
import StrategyGuide from "./components/StrategyGuide";

// --- NOVO COMPONENTE: PRINT SHEET (Layout Rígido A4) ---
const PrintSheet: React.FC<{ character: Character }> = ({ character }) => {
    return (
        <div className="hidden print:block bg-white text-slate-950 antialiased">
            {/* Wrapper de Escala 90% e Centralização */}
            <div className="w-[210mm] h-[297mm] mx-auto p-[10mm] origin-top scale-[1.0]">
                {/* Cabeçalho Rígido */}
                <header className="border-b-4 border-slate-900 pb-4 mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black uppercase tracking-tighter">
                            {character.name}
                        </h1>
                        <p className="text-xl font-bold text-slate-700 italic">
                            {character.race.name} · {character.dndClass.name}{" "}
                            (Nível {character.level})
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="block text-xs font-black uppercase tracking-widest text-slate-400">
                            D&D 2024
                        </span>
                        <span className="text-sm font-bold">
                            Ficha de Personagem
                        </span>
                    </div>
                </header>

                {/* Seção de Identidade e Estratégia */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="border border-slate-300 p-3 rounded">
                        <span className="text-[10px] font-black uppercase text-slate-500">
                            Antecedente
                        </span>
                        <p className="font-bold">{character.background}</p>
                    </div>
                    <div className="border border-slate-300 p-3 rounded">
                        <span className="text-[10px] font-black uppercase text-slate-500">
                            Tendência
                        </span>
                        <p className="font-bold">{character.alignment}</p>
                    </div>
                </div>

                {/* Grid Principal de 12 Colunas (Sem classes responsivas) */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Coluna Esquerda: Atributos (4 colunas) */}
                    <div className="col-span-4 space-y-3">
                        <h3 className="text-xs font-black uppercase bg-slate-900 text-white p-1 text-center rounded">
                            Atributos
                        </h3>
                        {Object.entries(character.stats).map(
                            ([ability, value]) => (
                                <div
                                    key={ability}
                                    className="flex justify-between items-center border-b-2 border-slate-100 py-1"
                                >
                                    <span className="font-bold text-sm uppercase">
                                        {ability}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-slate-400">
                                            ({value})
                                        </span>
                                        <span className="text-lg font-black w-8 text-right">
                                            {Math.floor((value - 10) / 2) >= 0
                                                ? `+${Math.floor((value - 10) / 2)}`
                                                : Math.floor((value - 10) / 2)}
                                        </span>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>

                    {/* Coluna Direita: Combate e Perícias (8 colunas) */}
                    <div className="col-span-8 space-y-6">
                        {/* Status de Combate Rígidos */}
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="border-2 border-slate-900 p-2 rounded-lg">
                                <span className="block text-[10px] font-black uppercase">
                                    Classe de Armadura
                                </span>
                                <span className="text-2xl font-black">
                                    {10 +
                                        Math.floor(
                                            (character.stats["Destreza"] - 10) /
                                                2,
                                        )}
                                </span>
                            </div>
                            <div className="border-2 border-slate-900 p-2 rounded-lg bg-slate-50">
                                <span className="block text-[10px] font-black uppercase">
                                    Pontos de Vida
                                </span>
                                <span className="text-2xl font-black">
                                    {character.dndClass.hitDie +
                                        Math.floor(
                                            (character.stats["Constituição"] -
                                                10) /
                                                2,
                                        )}
                                </span>
                            </div>
                            <div className="border-2 border-slate-900 p-2 rounded-lg">
                                <span className="block text-[10px] font-black uppercase">
                                    Iniciativa
                                </span>
                                <span className="text-2xl font-black">
                                    +
                                    {Math.floor(
                                        (character.stats["Destreza"] - 10) / 2,
                                    )}
                                </span>
                            </div>
                        </div>

                        {/* Perícias Simplificadas para Impressão */}
                        <div>
                            <h3 className="text-xs font-black uppercase bg-slate-900 text-white p-1 text-center rounded mb-2">
                                Perícias Domadas
                            </h3>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                {[
                                    "Atletismo",
                                    "Acrobacia",
                                    "Furtividade",
                                    "Percepção",
                                    "Persuasão",
                                    "Intuição",
                                ].map((skill) => (
                                    <div
                                        key={skill}
                                        className="flex items-center gap-2 text-[11px] border-b border-slate-100"
                                    >
                                        <div className="w-2 h-2 rounded-full border border-slate-900 bg-slate-900"></div>
                                        <span className="font-medium uppercase">
                                            {skill}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Guia de Estratégia Rápido */}
                        <div className="bg-slate-50 p-3 rounded border border-slate-200">
                            <h4 className="text-[10px] font-black uppercase mb-1">
                                Dica de Gameplay (
                                {character.selectedSubclass.name})
                            </h4>
                            <p className="text-[10px] leading-tight italic text-slate-700">
                                {character.selectedSubclass.synergy}
                            </p>
                        </div>
                    </div>
                </div>

                <footer className="mt-8 border-t border-slate-200 pt-4 text-center">
                    <p className="text-[9px] text-slate-400 uppercase tracking-widest">
                        Documento gerado digitalmente para D&D 2024 Heroes App
                    </p>
                </footer>
            </div>
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---
const CharacterGenerator: React.FC = () => {
    const [character, setCharacter] = useState<Character | null>(null);

    const handleGenerate = () => {
        const newChar = generateRandomCharacter();
        setCharacter(newChar);
    };

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-serif">
            {/* VERSÃO DE TELA: Escondida na impressão via print:hidden */}
            <div className="print:hidden">
                <header className="text-center mb-12 border-b border-amber-900/20 pb-8">
                    <h1 className="text-4xl md:text-7xl font-black text-amber-500 mb-4 tracking-tighter drop-shadow-md">
                        D&D 2024 HEROES ⚔️
                    </h1>
                    <p className="text-slate-400 italic text-lg max-w-2xl mx-auto">
                        Gere heróis lendários instantaneamente e aprenda as
                        regras do novo Player's Handbook.
                    </p>

                    <div className="flex justify-center gap-4 mt-8">
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

                <section className="max-w-6xl mx-auto space-y-10">
                    {character && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
                            <section className="space-y-6">
                                <CharacterIdentity
                                    background={character.background}
                                    alignment={character.alignment}
                                />
                                <StrategyGuide
                                    dndClass={character.dndClass}
                                    subclass={character.selectedSubclass}
                                />
                            </section>

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-fit">
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
                        </div>
                    )}
                </section>
            </div>

            {/* VERSÃO DE IMPRESSÃO: Injetada de forma rígida */}
            {character && <PrintSheet character={character} />}
        </main>
    );
};

export default CharacterGenerator;
