import { User } from "@common";
import { Text, Group, Avatar, Stack } from "@mantine/core";

export const UserManager = ({ user }: { user: User }) => {
    return (
        <Group>
            <Group gap={5} h={60}>
                <Avatar />
                <Stack>
                    <Text size="sm" fz="sm" fw={500}>
                        {user.name}
                    </Text>
                    <Text size="sm" fz="xs">
                        {user.email}
                    </Text>
                </Stack>
            </Group>
        </Group>
    );
};
