import { RequestHandler } from "express";
import userModel from "../model/user.model";

import {
    createUser,
    findUserByEmail,
    findUserById,
    findUsersViaQuery,
} from "../service/user.service";
import { User } from "@common";

export const listUsers: RequestHandler = async (req, res) => {
    if (req.body) req.body = {};

    if (req.query.q) {
        try {
            const users = await findUsersViaQuery(req.query.q as string);

            users.forEach((user) => {
                user.password = "The password must be hidden for privacy";
            });

            res.status(200).json({
                message: "Users Listed",
                success: true,
                users,
            });
            return;
        } catch (error) {
            res.status(404).json({
                error: "Users Not Found",
                success: false,
            });
            return;
        }
    }

    try {
        const users = await userModel.find();

        users.forEach((user) => {
            user.password = "The password must be hidden for privacy";
        });

        res.status(200).json({
            message: "Users Listed",
            users,
        });
        return;
    } catch (error) {}
};

export const getUser: RequestHandler = async (req, res) => {
    try {
        const user = await findUserById(req.params.id);

        if (!user) {
            res.status(404).json({
                error: "User not found",
                success: false,
            });
            return;
        }

        res.status(200).json({
            message: "User found",
            success: true,
            user,
        });
        return;
    } catch (error) {
        res.status(404).json({
            error: "User not found",
            success: false,
        });
        return;
    }
};

export const addUser: RequestHandler = async (req, res) => {
    let userBody: User = req.body;

    let { name, email, password, role } = userBody;

    if (!email || !password) {
        res.status(400).json({
            error: "Email or Password is missing",
            success: false,
        });
        return;
    }

    if (!role) userBody.role = "user";
    if (!name) userBody.name = "";

    try {
        const findUser = await findUserByEmail(req.body.email);

        if (findUser) {
            res.status(400).json({
                error: "User Already Exists",
                success: false,
            });
            return;
        }

        const user = await createUser(userBody);

        res.status(200).json({
            message: "User created",
            success: true,
            user,
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(400).json({
            error: "User creation error " + error,
            success: false,
        });
        return;
    }
};
