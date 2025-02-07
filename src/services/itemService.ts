const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateItems = (numbers: number[]): string[] => {
    const prefixMap: { [key: string]: number } = {};
    const items: string[] = [];

    numbers.forEach((number) => {
        const firstDigit = number > 26 ? Number(String(number)[0]) : number;
        const prefix = ALPHABET[firstDigit - 1] || "";
        if (!prefix) return;

        const suffix = (prefixMap[prefix] || 0) + 1;
        prefixMap[prefix] = suffix;
        items.push(`${prefix}${suffix}`);
    });
    return items;
};


export const createCombinations = (items: string[], length: number): string[][] => {
    const validCombinations: string[][] = [];
    const stack: string[][] = [];

    stack.push([]);

    while (stack.length > 0) {
        const combination = stack.pop()!;
        const startIdx = combination.length === 0 ? 0 : items.indexOf(combination[combination.length - 1]) + 1;

        if (combination.length === length) {
            validCombinations.push(combination);
            continue;
        }

        for (let i = startIdx; i < items.length; i++) {
            const itemPrefix = items[i][0];

            if (!combination.some(item => item[0] === itemPrefix)) {
                stack.push([...combination, items[i]]);
            }
        }
    }

    return validCombinations;
};
