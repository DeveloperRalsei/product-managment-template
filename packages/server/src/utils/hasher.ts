import bcrypt from "bcrypt";

export async function hash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, async (error, hashed) => {
            if (error) {
                reject(error);
            }
            resolve(hashed);
        });
    });
}

export async function compare(
    password: string,
    hashed: string
): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashed, async (error, isMatch) => {
            if (error) {
                reject(error);
            }
            resolve(isMatch);
        });
    });
}
