import { User } from "@common";
import {
    Stack,
    TextInput,
    PasswordInput,
    Select,
    Group,
    Button,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/types";
import { t } from "i18next";

export const UserForm = ({
    form,
    handleSubmit,
    loading,
}: {
    form: UseFormReturnType<User>;
    handleSubmit: (data: User) => void;
    loading: boolean;
}) => {
    return (
        <form
            onSubmit={form.onSubmit((v) => handleSubmit(v))}
            onReset={form.reset}>
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
    );
};
