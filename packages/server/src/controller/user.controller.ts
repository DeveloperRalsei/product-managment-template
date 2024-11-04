import { User } from "@common";
import { wait } from "../utils/helpers";
import { Request, Response } from "express";

export const userController = {
    listUsers: async (req: Request, res: Response) => {
        await wait(1000);
        res.json([
            {
                id: "1",
                name: "Riza",
                email: "riza@gmail.com",
                password: "123456",
            },
            {
                id: "2",
                name: "Naber",
                email: "naber@gmail.com",
                password: "123456",
            },
            {
                id: "3",
                name: "Deltarune",
                email: "deltarune@gmail.com",
                password: "123456",
            },
        ] as User[]);
    },
};
