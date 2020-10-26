export const isError = code => {
    const digit = parseInt(code.toString()[0], 10);
    return digit === 4 || digit === 5;
};
