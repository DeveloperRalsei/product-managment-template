export const wait = (milliSeconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds));
};
