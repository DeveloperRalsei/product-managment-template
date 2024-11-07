import { t } from "i18next";

export const formInitialValues = {
    initialValues: {
        name: "",
        email: "",
        password: "",
        role: "user",
    },
    validate: {
        name: (value: string) =>
            value.length >= 4 ? null : t("users.validation.name"),
        email: (value: string) =>
            /^\S+@\S+$/.test(value) ? null : t("users.validation.email"),
        password: (value: string) =>
            value.length >= 4 ? null : t("users.validation.password"),
    },
} as const;
