import { ActionIcon } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import { IconDeviceDesktop } from "@tabler/icons-react";

export const FullScreenToggler = () => {
    const { fullscreen, toggle } = useFullscreen();

    return (
        <ActionIcon color={fullscreen ? "red" : "teal"} onClick={toggle}>
            <IconDeviceDesktop />
        </ActionIcon>
    );
};
