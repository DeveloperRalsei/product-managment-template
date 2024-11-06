export const serverPort = 3000;

export interface User {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
}

export interface UserWithId extends User {
    _id: string;
}
