import { RequestHandler } from "express";
import userModel from "../model/user.model";
import {
    createUser,
    findUserByEmail,
    findUserById,
    findUsersViaQuery,
    deleteUser as delUser,
    updateUser as upUser,
} from "../service/user.service";
import { User } from "@common";
import { authByUser } from "../utils/authByUser";
import { hash } from "../utils/hasher";

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

        user.password = "The password must be hidden for privacy";

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
    authByUser(req, res);

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

export const deleteUser: RequestHandler = async (req, res) => {
    authByUser(req, res);

    const { id } = req.body;

    if (!id) {
        res.status(400).json({
            error: "User not found",
            success: false,
        });
        return;
    }

    try {
        await delUser(id);

        res.status(200).json({
            message: "User deleted successfuly",
        });
    } catch (error) {
        res.status(500).json({
            error,
            success: false,
        });
    }
};

export const updateUser: RequestHandler = async (req, res) => {
    authByUser(req, res);

    const user = req.body;
    const { name, email, role, password } = user;

    if (!email || !password) {
        res.status(400).json({
            error: "Email or password is required",
            success: false,
        });
        return;
    }

    if (!name) user.name = "";
    if (!role) user.role = "user";

    try {
        let updatedUser = await upUser(user);

        updatedUser!.password = "The password must be hidden for privacy";

        res.status(200).json({
            message: "User updated successfuly",
            updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internel Server Error",
            success: false,
        });
        return;
    }
};
