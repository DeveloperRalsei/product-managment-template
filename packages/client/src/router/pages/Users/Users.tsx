import { User } from "@common";
import { Loader, Stack } from "@mantine/core";
import { useEffect, useState } from "react";

export const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch("/api/v1/users");
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (isError) {
        return <div>Error {}</div>;
    }

    return (
        <Stack>
            {users.map((user) => (
                <div key={user.id}>{user.name}</div>
            ))}
        </Stack>
    );
};
