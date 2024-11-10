import { useDisclosure } from "@mantine/hooks";
import { createContext, ReactNode, useContext } from "react";
import { defaultSettings, settingsType } from "../assets/settings";

interface SettingsContextProps {
    isSettingsOpen: boolean;
    openSettings: () => void;
    closeSettings: () => void;
}

const SettingContext = createContext<
    (SettingsContextProps & { settings: settingsType }) | undefined
>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [opened, { open, close }] = useDisclosure();

    return (
        <SettingContext.Provider
            value={{
                isSettingsOpen: opened,
                openSettings: open,
                closeSettings: close,
                settings: { ...defaultSettings },
            }}>
            {children}
        </SettingContext.Provider>
    );
};

export function useSettings() {
    const context = useContext(SettingContext);
    if (!context) {
        throw new Error("this hook must be used in SettingsProvider");
    }
    return context;
}
