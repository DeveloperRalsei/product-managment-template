import {
    Avatar,
    Button,
    Group,
    LoadingOverlay,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useSearchParams } from "react-router-dom";
import { BreadCrumbs } from "../../components/ui/Breadcrumbs";
import { useEffect, useState } from "react";
import { nprogress } from "@mantine/nprogress";
import { UserWithId } from "@common";
import { showNotification } from "@mantine/notifications";

export const Delete = () => {
    const [searchParams] = useSearchParams();
    let ids = searchParams.get("ids")?.split(",");
    const [users, setUsers] = useState<UserWithId[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUsers() {
            if (!ids) {
                showNotification({
                    message: "User not found",
                    color: "red",
                });
            }
            setLoading(true);
            nprogress.start();

            try {
                for (const id of ids || []) {
                    const response = await fetch(`/api/v1/users/${id}`);
                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error("User not found");
                    }

                    setUsers((prev) => [...prev, data.user]);
                }
            } catch (error) {
                console.error(error);
                showNotification({
                    message: "User not found",
                    color: "red",
                });
            }
            nprogress.complete();
            setLoading(false);
        }

        fetchUsers();
    }, []);

    const breadcrumbs = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Users",
            href: "/dashboard/users",
        },
        {
            label: "Delete",
        },
    ];

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        nprogress.start();

        try {
            for (const id of ids || []) {
                const response = await fetch("/api/v1/users/delete", {
                    method: "DELETE",
                    body: JSON.stringify({ id }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("User not found");
                }

                const data = await response.json();
                showNotification({
                    message: "User Deleted Successfuly",
                    color: "green",
                });
            }
        } catch (error) {
            console.error(error);
            showNotification({
                message: "User Deleted Failed",
                color: "red",
            });
        }

        setLoading(false);
        nprogress.complete();
    };

    return (
        <Stack>
            <BreadCrumbs data={breadcrumbs} />
            <Title order={3}>Delete</Title>

            {ids ? (
                <>
                    <Group>
                        <Text>This users will be deleted. Are you sure?</Text>
                        <form onSubmit={handleDelete}>
                            <Button
                                loading={loading}
                                type="submit"
                                size="xs"
                                color="red">
                                Delete
                            </Button>
                        </form>
                    </Group>
                    <Stack>
                        {loading ? (
                            <Stack pos="relative">
                                <LoadingOverlay visible />
                            </Stack>
                        ) : (
                            <>
                                {users.map((u, i) => (
                                    <Group key={u._id + i}>
                                        <Avatar />
                                        <Title order={5}>{u.name}</Title>
                                    </Group>
                                ))}
                            </>
                        )}
                    </Stack>
                </>
            ) : (
                <Text>Select users to delete.</Text>
            )}
        </Stack>
    );
};
