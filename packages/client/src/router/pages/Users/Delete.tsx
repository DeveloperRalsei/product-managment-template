import { Stack, Title } from "@mantine/core";
import { useSearchParams } from "react-router-dom";

export const Delete = () => {
    const [searchParams] = useSearchParams();
    let emails = searchParams.get("email")?.split(",");

    if (!emails) {
        return "No email selected";
    }

    return (
        <Stack>
            <Title order={3}>Delete</Title>
            {emails.map((e) => (
                <p>{e}</p>
            ))}
        </Stack>
    );
};
