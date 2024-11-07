import { useDisclosure } from "@mantine/hooks";
import { createContext, ReactNode, useContext } from "react";

interface SettingsContextProps {
    isDrawerOpen: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
}

const SettingContext = createContext<SettingsContextProps | undefined>(
    undefined
);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [opened, { open, close }] = useDisclosure();

    return (
        <SettingContext.Provider
            value={{
                isDrawerOpen: opened,
                openDrawer: open,
                closeDrawer: close,
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
