import { User } from "@common";
import {
    Text,
    Group,
    Avatar,
    Stack,
    ActionIcon,
    Menu,
    Badge,
} from "@mantine/core";
import {
    IconChevronRight,
    IconLogout,
    IconSettings,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const UserManager = ({ user }: { user: User }) => {
    return (
        <Group>
            <Group h={60} w={"100%"} justify="space-between">
                <Group>
                    <Avatar />
                    <Stack gap={4}>
                        <Text size="sm" fz="sm" fw={500}>
                            {user.name}
                        </Text>
                        <Text size="sm" fz="xs">
                            {user.email}
                        </Text>
                    </Stack>
                </Group>
                <Menu position="right-end">
                    <Menu.Target>
                        <ActionIcon variant="default" color="dark">
                            <IconChevronRight size={16} />
                        </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown p={"sm"}>
                        <Stack>
                            <Group>
                                <Group>
                                    <Avatar size={35} />
                                    <Text size="sm" fz="sm" fw={500}>
                                        {user.name}
                                    </Text>
                                </Group>
                                <Badge
                                    color={
                                        user.role === "admin" ? "red" : "gray"
                                    }
                                    variant="light">
                                    {user.role === "admin" ? "Admin" : "User"}
                                </Badge>
                            </Group>
                            <Menu.Divider />
                            <Group justify="space-between" w={"100%"}>
                                <ActionIcon>
                                    <IconSettings size={16} />
                                </ActionIcon>
                                <Group>
                                    <ActionIcon
                                        color="red"
                                        component={Link}
                                        to={"/logout"}>
                                        <IconLogout size={16} />
                                    </ActionIcon>
                                </Group>
                            </Group>
                        </Stack>
                    </Menu.Dropdown>
                </Menu>
            </Group>
        </Group>
    );
};
