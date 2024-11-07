import { ObjectId } from "mongoose";
import userModel from "../model/user.model";
import { User } from "@common";
import { hash } from "../utils/hasher";

export async function findUsers() {
    return userModel.find();
}

export async function findUsersViaQuery(query: string) {
    return userModel.find({
        $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
        ],
    });
}

export async function findUserById(id: ObjectId | string) {
    return userModel.findById(id);
}

export async function createUser(user: User) {
    try {
        user.password = await hash(user.password);
        return userModel.create(user);
    } catch (error) {
        console.error(error);
        return;
    }
}

export async function findUserByEmail(email: string) {
    return userModel.findOne({
        email,
    });
}

export async function deleteUser(id: ObjectId | string) {
    return userModel.findByIdAndDelete(id);
}
