import {
    Alert,
    Button,
    Card,
    Group,
    LoadingOverlay,
    PasswordInput,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { nprogress } from "@mantine/nprogress";
import { IconAlertCircle } from "@tabler/icons-react";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

export const Login = () => {
    const { t } = useTranslation();
    const { user, loading } = useUser();
    const navigate = useNavigate();

    document.title = t("login.title");

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+$/.test(value) ? null : t("login.validation.email"),
            password: (value) =>
                value.length >= 4 ? null : t("login.validation.password"),
        },
    });

    const handleSubmit = async (values: any) => {
        nprogress.start();
        try {
            const response = await fetch("/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                throw new Error("Login Failed");
            }

            showNotification({
                color: "green",
                message: t("login.success"),
            });
            window.open("/dashboard", "_self");
        } catch (error) {
            console.error(error);
            showNotification({
                message: t("login.error"),
                color: "red",
            });
        } finally {
            nprogress.complete();
        }
    };

    return (
        <Stack mah={"100vh"} mih={"100vh"} align={"center"} justify={"center"}>
            <LoadingOverlay visible={loading} />

            <Title order={1} fz={"h2"}>
                Login
            </Title>
            <Card>
                <form onSubmit={form.onSubmit((v) => handleSubmit(v))}>
                    <Stack>
                        <TextInput
                            label={t("login.loginInput.email")}
                            withAsterisk
                            type="email"
                            {...form.getInputProps("email")}
                        />
                        <PasswordInput
                            label={t("login.loginInput.password")}
                            withAsterisk
                            {...form.getInputProps("password")}
                        />
                    </Stack>
                    <Group grow mt={"md"}>
                        <Button
                            type="reset"
                            variant="default"
                            onClick={form.reset}>
                            {t("login.resetBtn")}
                        </Button>
                        <Button type="submit">{t("login.loginBtn")}</Button>
                    </Group>
                </form>
            </Card>
        </Stack>
    );
};
