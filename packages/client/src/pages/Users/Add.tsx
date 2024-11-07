import {
    Button,
    Checkbox,
    Group,
    PasswordInput,
    Select,
    Stack,
    TextInput,
} from "@mantine/core";
import { BreadCrumbs } from "../../components/ui/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { useForm } from "@mantine/form";
import { User } from "@common";
import { showNotification } from "@mantine/notifications";
import { nprogress } from "@mantine/nprogress";
import { useState } from "react";

export const Add = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
            role: "user",
        } as User,
        validate: {
            name: (value) =>
                value.length >= 4 ? null : t("users.validation.name"),
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : t("users.validation.email"),
            password: (value) =>
                value.length >= 4 ? null : t("users.validation.password"),
        },
    });

    const breadcrumbs = [
        {
            label: t("app.links.dashboard"),
            href: "/dashboard",
        },
        {
            label: t("app.links.users"),
            href: "/dashboard/users",
        },
        {
            label: t("app.links.add"),
            href: "/dashboard/users/add",
        },
    ];

    const handleSubmit = async (values: User) => {
        nprogress.start();
        setLoading(true);
        try {
            const response = await fetch("/api/v1/users/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
                showNotification({
                    message: t("users.add_input.error"),
                    color: "red",
                });
            }

            if (import.meta.env.DEV) {
                console.log(data);
            }
            showNotification({
                message: t("users.add_input.success"),
                color: "green",
            });
        } catch (error) {
            showNotification({
                message: t("users.add_input.error"),
                color: "red",
            });
        } finally {
            nprogress.complete();
            setLoading(false);
        }
    };

    return (
        <Stack>
            <BreadCrumbs data={breadcrumbs} />

            <form onSubmit={form.onSubmit((v) => handleSubmit(v))}>
                <Stack>
                    <TextInput
                        label={t("users.add_input.name")}
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label={t("users.add_input.email")}
                        {...form.getInputProps("email")}
                    />
                    <PasswordInput
                        label={t("users.add_input.password")}
                        {...form.getInputProps("password")}
                    />
                    <Select
                        label={t("users.add_input.role")}
                        data={["admin", "user"]}
                        clearable={false}
                        {...form.getInputProps("role")}
                    />
                </Stack>
                <Group mt={"md"}>
                    <Button type="reset" variant="default">
                        {t("users.add_input.reset")}
                    </Button>
                    <Button type="submit" loading={loading}>
                        {t("users.add_input.submit")}
                    </Button>
                </Group>
            </form>
        </Stack>
    );
};
