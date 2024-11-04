export const serverPort = 3000;

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
}
