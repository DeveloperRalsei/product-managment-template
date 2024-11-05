import { User } from "@common";

export const reducer = (
    state: { users: User[] },
    action: { type: string; payload: User[] }
) => {
    switch (action.type) {
        case reducerValues.SET_USERS:
            return { ...state, users: action.payload };
        case reducerValues.SET_LOADING:
            return { ...state, loading: action.payload };
        case reducerValues.SET_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const initialState = {
    users: [],
};

export const reducerValues = {
    SET_USERS: "SET_USERS",
    SET_LOADING: "SET_LOADING",
    SET_ERROR: "SET_ERROR",
};