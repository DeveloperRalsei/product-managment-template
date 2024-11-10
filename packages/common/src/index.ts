export const serverPort = 3000;

export interface User {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
}

export interface UserWithId extends User {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export type Product = {
    name: string;
    description: string;
    price: number;
};

export type ProductWithId = Product & {
    _id: string;
    createdAt: string;
    updatedAt: string;
};
