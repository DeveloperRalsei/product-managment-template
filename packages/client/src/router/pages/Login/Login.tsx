import {
    Alert,
    Button,
    Card,
    Group,
    LoadingOverlay,
    Stack,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { nprogress } from "@mantine/nprogress";
import { IconAlertCircle, IconEye, IconEyeClosed } from "@tabler/icons-react";
import { useUser } from "../../../context/UserContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState("");
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
                setError("Login Failed");
                throw new Error("Login Failed");
            }

            const data = await response.json();

            setError("");
            window.open("/dashboard", "_self");
        } catch (error) {
            console.error(error);
            setError("Login Failed");
        } finally {
            nprogress.complete();
        }
    };

    return (
        <Stack mah={"100vh"} mih={"100vh"} align={"center"} justify={"center"}>
            <LoadingOverlay visible={loading} />
            {error && (
                <Alert color="red" icon={<IconAlertCircle />}>
                    {error}
                </Alert>
            )}
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
                        <TextInput
                            label={t("login.loginInput.password")}
                            withAsterisk
                            rightSection={
                                !isVisible ? (
                                    <IconEyeClosed
                                        size={16}
                                        color="var(--mantine-color-gray-5)"
                                        onClick={() => setIsVisible(true)}
                                        cursor={"pointer"}
                                    />
                                ) : (
                                    <IconEye
                                        size={16}
                                        color="var(--mantine-color-blue-5)"
                                        onClick={() => setIsVisible(false)}
                                        cursor={"pointer"}
                                    />
                                )
                            }
                            type={isVisible ? "text" : "password"}
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
