import {
    Drawer,
    ColorSwatch,
    DefaultMantineColor,
    Group,
    Tooltip,
    useMantineTheme,
} from "@mantine/core";
import { useSettings } from "../../context/SettingsContext";
import { defaultSettings } from "../../assets/settings";

export const SettingsDrawer = () => {
    const { isSettingsOpen, closeSettings } = useSettings();
    const theme = useMantineTheme();
    const colors: DefaultMantineColor[] = [
        "red",
        "orange",
        "yellow",
        "green",
        "lime",
        "teal",
        "cyan",
        "blue",
        "grape",
        "indigo",
        "pink",
        "violet",
    ];

    return (
        <Drawer
            id="settings"
            onClose={closeSettings}
            opened={isSettingsOpen}
            title="Settings">
            <Group wrap="wrap">
                {colors.map((c, i) => (
                    <Tooltip label={c} key={i}>
                        <ColorSwatch
                            radius={"sm"}
                            style={{ cursor: "pointer" }}
                            color={c}
                            onClick={() => {
                                defaultSettings.primaryColor = c;
                            }}
                        />
                    </Tooltip>
                ))}
            </Group>
        </Drawer>
    );
};
