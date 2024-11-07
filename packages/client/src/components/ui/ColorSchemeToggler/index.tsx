import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export const ColorSchemeToggler = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    return (
        <ActionIcon
            onClick={toggleColorScheme}
            color={colorScheme === "dark" ? "blue" : "gray"}>
            {colorScheme === "dark" ? <IconMoonFilled /> : <IconSunFilled />}
        </ActionIcon>
    );
};
