import { createTheme, DefaultMantineColor } from "@mantine/core";

export type settingsType = {
    language: "tr" | "en";
    colorScheme: "light" | "dark";
    primaryColor: DefaultMantineColor;
};

export const defaultSettings: settingsType = {
    language: "tr",
    colorScheme: "dark",
    primaryColor: "blue",
};

export const theme = createTheme({
    components: {
        ActionIcon: {
            defaultProps: {
                variant: "light",
            },
        },

        Group: {
            defaultProps: {
                wrap: "nowrap",
            },
        },
    },
});
