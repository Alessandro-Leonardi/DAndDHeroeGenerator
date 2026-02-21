import React, { useState } from "react";
import { AbilityScore, Character } from "./types";
import { generateRandomCharacter } from "./utils/generatorLogic";

// Importação dos componentes para a versão de tela
import StatCard from "./components/StatCard";
import CombatStats from "./components/CombatStats";
import SkillsList from "./components/SkillsList";
import CharacterIdentity from "./components/CharacterIdentity";
import StrategyGuide from "./components/StrategyGuide";

// --- COMPONENTE PRINT SHEET (Layout Rígido A4) ---
const PrintSheet: React.FC<{ character: Character }> = ({ character }) => {
    return (
        <div className="hidden print:block bg-white text-slate-950 antialiased">
            {/* Wrapper com escala e margens de segurança */}
            <div className="w-[210mm] h-[297mm] mx-auto p-[15mm] origin-top scale-[0.9]">
                {/* Cabeçalho Rígido */}
                <header className="border-b-2 border-slate-950 pb-4 mb-8 flex justify-between items-end">
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

                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="border border-slate-200 p-4 rounded-md">
                        <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                            Antecedente
                        </span>
                        <p className="font-bold text-lg leading-none">
                            {character.background}
                        </p>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-md">
                        <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                            Tendência
                        </span>
                        <p className="font-bold text-lg leading-none">
                            {character.alignment}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-4 space-y-4">
                        <h3 className="text-[11px] font-black uppercase tracking-widest border-b border-slate-900 pb-1 mb-4">
                            Atributos
                        </h3>
                        {Object.entries(character.stats).map(
                            ([ability, value]) => (
                                <div
                                    key={ability}
                                    className="flex justify-between items-center border-b border-slate-100 py-2"
                                >
                                    <span className="font-bold text-xs uppercase text-slate-600">
                                        {ability}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-slate-400 tabular-nums">
                                            ({value})
                                        </span>
                                        <span className="text-xl font-black w-10 text-right tabular-nums">
                                            {Math.floor((value - 10) / 2) >= 0
                                                ? `+${Math.floor((value - 10) / 2)}`
                                                : Math.floor((value - 10) / 2)}
                                        </span>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>

                    <div className="col-span-8 space-y-10">
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="border border-slate-300 p-3 rounded-lg">
                                <span className="block text-[9px] font-black uppercase text-slate-500 mb-1">
                                    Classe de Armadura
                                </span>
                                <span className="text-3xl font-black">
                                    {10 +
                                        Math.floor(
                                            (character.stats["Destreza"] - 10) /
                                                2,
                                        )}
                                </span>
                            </div>
                            <div className="bg-slate-50 border border-slate-300 p-3 rounded-lg">
                                <span className="block text-[9px] font-black uppercase text-slate-500 mb-1">
                                    Pontos de Vida
                                </span>
                                <span className="text-3xl font-black">
                                    {character.dndClass.hitDie +
                                        Math.floor(
                                            (character.stats["Constituição"] -
                                                10) /
                                                2,
                                        )}
                                </span>
                            </div>
                            <div className="border border-slate-300 p-3 rounded-lg">
                                <span className="block text-[9px] font-black uppercase text-slate-500 mb-1">
                                    Iniciativa
                                </span>
                                <span className="text-3xl font-black">
                                    +
                                    {Math.floor(
                                        (character.stats["Destreza"] - 10) / 2,
                                    )}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-[11px] font-black uppercase tracking-widest border-b border-slate-900 pb-1 mb-4">
                                Perícias Domadas
                            </h3>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-3 pl-2">
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
                                        className="flex items-center gap-3 text-xs border-b border-slate-50 pb-1"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-slate-900 flex-shrink-0"></div>
                                        <span className="font-semibold uppercase tracking-tight">
                                            {skill}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2">
                                Estratégia ({character.selectedSubclass.name})
                            </h4>
                            <p className="text-[11px] leading-relaxed italic text-slate-800">
                                {character.selectedSubclass.synergy}
                            </p>
                        </div>
                    </div>
                </div>
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
            {/* VERSÃO DE TELA */}
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
                            className="bg-amber-600 hover:bg-amber-500 text-white px-10 py-4 rounded-full font-bold text-xl transition-all transform hover:scale-105 shadow-lg"
                        >
                            🎲 Gerar Personagem
                        </button>

                        {character && (
                            <button
                                onClick={() => window.print()}
                                className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-6 py-4 rounded-full font-bold transition-all"
                            >
                                📜 Exportar PDF
                            </button>
                        )}
                    </div>
                </header>

                <section className="max-w-6xl mx-auto space-y-10">
                    {character && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
                            {/* --- NOVO: Cabeçalho do Perfil do Herói na UI --- */}
                            <div className="bg-slate-900/50 border border-amber-500/30 p-8 rounded-3xl backdrop-blur-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <span className="text-8xl font-black italic">
                                        LVL {character.level}
                                    </span>
                                </div>
                                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-2 italic">
                                            {character.name}
                                        </h2>
                                        <div className="flex flex-wrap gap-3 items-center">
                                            <span className="px-4 py-1 bg-amber-600 text-white text-sm font-black rounded-full uppercase">
                                                {character.race.name}
                                            </span>
                                            <span className="px-4 py-1 bg-slate-800 text-amber-400 text-sm font-black rounded-full uppercase border border-amber-400/20">
                                                {character.dndClass.name}
                                            </span>
                                            <span className="text-slate-400 font-bold ml-2">
                                                Subclasse:{" "}
                                                <span className="text-slate-200">
                                                    {
                                                        character
                                                            .selectedSubclass
                                                            .name
                                                    }
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

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

            {/* VERSÃO DE IMPRESSÃO */}
            {character && <PrintSheet character={character} />}
        </main>
    );
};

export default CharacterGenerator;
