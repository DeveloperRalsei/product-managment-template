import { Drawer } from "@mantine/core";
import { useSettings } from "../../context/SettingsContext";

export const SettingsDrawer = () => {
    const { isDrawerOpen, closeDrawer } = useSettings();

    return (
        <Drawer
            id="settings"
            onClose={closeDrawer}
            opened={isDrawerOpen}
            title="Settings">
            mrow
        </Drawer>
    );
};
