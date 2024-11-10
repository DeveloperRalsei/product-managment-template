import { MantineProvider } from "@mantine/core";
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
import { theme, defaultSettings } from "./assets/settings";

createRoot(document.getElementById("root")!).render(
    <MantineProvider
        theme={theme}
        defaultColorScheme={defaultSettings.colorScheme}>
        <Notifications />
        <NavigationProgress />
        <I18nextProvider i18n={i18n} defaultNS={[]}>
            <SettingsProvider>
                <SettingsDrawer />
                <UserProvider>
                    <Router />
                </UserProvider>
            </SettingsProvider>
        </I18nextProvider>
    </MantineProvider>
);
