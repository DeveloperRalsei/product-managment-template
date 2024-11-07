import { Stack } from "@mantine/core";
import { BreadCrumbs } from "../../components/ui/Breadcrumbs";
import { useForm } from "@mantine/form";
import { User } from "@common";
import { formInitialValues } from "../../definitions";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { nprogress } from "@mantine/nprogress";
import { UserForm } from "../../components/ui/UserForm";

export const Edit = () => {
    const form = useForm<User>(formInitialValues);
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        async function fetchUser(id: string) {
            setLoading(true);
            nprogress.start();
            try {
                const response = await fetch(`/api/v1/users/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Something went wrong");
                }

                const { password, ...userValues } = data.user;
                setUser(userValues);
                form.setValues(userValues);
            } catch (error) {
                showNotification({
                    message: "Something went wrong",
                    color: "red",
                });
                console.error(error);
            }
            nprogress.complete();
            setLoading(false);
        }

        fetchUser(id!);
    }, [id]);

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    const breadcrumbs = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Users",
            href: "/dashboard/users",
        },
        {
            label: "Edit",
            href: "/dashboard/users/edit",
        },
    ];

    return (
        <Stack>
            <BreadCrumbs data={breadcrumbs} />

            <UserForm
                form={form}
                loading={loading}
                handleSubmit={handleSubmit}
            />
        </Stack>
    );
};
