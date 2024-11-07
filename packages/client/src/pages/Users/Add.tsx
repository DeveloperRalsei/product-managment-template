import { Stack } from "@mantine/core";
import { BreadCrumbs } from "../../components/ui/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { useForm } from "@mantine/form";
import { User } from "@common";
import { showNotification } from "@mantine/notifications";
import { nprogress } from "@mantine/nprogress";
import { useState } from "react";
import { UserForm } from "../../components/ui/UserForm";
import { formInitialValues } from "../../definitions";

export const Add = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const form = useForm<User>(formInitialValues);

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
                throw new Error(data.message);
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

            <UserForm
                form={form}
                handleSubmit={handleSubmit}
                loading={loading}
            />
        </Stack>
    );
};
