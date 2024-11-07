import { createTheme, MantineProvider } from "@mantine/core";
import { createRoot } from "react-dom/client";
import Router from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { NavigationProgress } from "@mantine/nprogress";
import { UserProvider } from "./context/UserContext";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";
import { SettingsProvider } from "./context/SettingsContext";
import { SettingsDrawer } from "./components/SettingsDrawer";

const theme = createTheme({
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

createRoot(document.getElementById("root")!).render(
    <MantineProvider theme={theme} defaultColorScheme="dark">
        <Notifications />
        <NavigationProgress />
        <I18nextProvider i18n={i18n}>
            <SettingsProvider>
                <SettingsDrawer />
                <UserProvider>
                    <Router />
                </UserProvider>
            </SettingsProvider>
        </I18nextProvider>
    </MantineProvider>
);
