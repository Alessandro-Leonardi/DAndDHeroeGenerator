// utils/dndMath.ts

/**
 * Calcula o modificador de um atributo D&D padrão.
 * Regra: (Valor - 10) / 2, arredondado para baixo.
 */
export const calculateModifier = (value: number): number => {
  return Math.floor((value - 10) / 2);
};

/**
 * Método 4d6 drop lowest: Rola 4 dados de 6 faces e remove o menor.
 */
export const roll4d6DropLowest = (): number => {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  return rolls.sort((a, b) => b - a).slice(0, 3).reduce((acc, val) => acc + val, 0);
};