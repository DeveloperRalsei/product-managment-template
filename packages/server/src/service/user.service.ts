import { ObjectId } from "mongoose";
import userModel from "../model/user.model";
import { User } from "@common";
import bcrypt from "bcrypt";

export async function findUsers() {
    return Promise.resolve(userModel.find());
}

export async function findUsersViaQuery(query: string) {
    return Promise.resolve(
        userModel.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
            ],
        })
    );
}

export async function findUserById(id: ObjectId | string) {
    return Promise.resolve(userModel.findById(id));
}

export async function createUser(user: User) {
    try {
        bcrypt.hash(user.password, 10, async (error, hashed) => {
            if (error) {
                console.error(error);
                return;
            }
            user.password = hashed;
            return Promise.resolve(userModel.create(user));
        });
    } catch (error) {
        console.error(error);
        return;
    }
}
