import { User } from "@common";
import {
    ActionIcon,
    Badge,
    Text,
    Checkbox,
    Group,
    Loader,
    Stack,
    Table,
    TextInput,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { BreadCrumbs } from "../../../components/ui/Breadcrumbs";
import { IconEdit } from "@tabler/icons-react";

export const Users = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch("/api/v1/users");
                const data = await response.json();
                setUsers(data.users);

                console.log(data.users);
            } catch (error) {
                console.error(error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const rows = users.map((user, index) => (
        <Table.Tr key={user.name + user.id + index}>
            <Table.Th w={0}>
                <Checkbox
                    aria-label="Select Row"
                    checked={selectedRows.includes(user.id)}
                    onChange={(e) => {
                        console.log(selectedRows);
                        if (e.target.checked) {
                            setSelectedRows((prev) => [...prev, user.id]);
                        } else {
                            setSelectedRows((prev) =>
                                prev.filter((id) => id !== user.id)
                            );
                        }
                    }}
                />
            </Table.Th>
            <Table.Th>{index + 1}</Table.Th>
            <Table.Td>{user.name}</Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>
                {user.role === "admin" && (
                    <Badge color="red">{t("users.role.admin")}</Badge>
                )}
                {user.role === "user" && (
                    <Badge color="blue">{t("users.role.user")}</Badge>
                )}
            </Table.Td>
            <Table.Td>
                <ActionIcon onClick={() => console.log("edit")}>
                    <IconEdit />
                </ActionIcon>
            </Table.Td>
        </Table.Tr>
    ));

    const breadcrumbs = [
        { label: t("app.links.dashboard"), href: "/dashboard" },
        {
            label: t("app.links.users"),
            href: "/dashboard/users",
        },
    ];

    return (
        <Stack mih={3000}>
            <BreadCrumbs data={breadcrumbs} />
            <Group grow>
                <TextInput placeholder={t("users.search_input")} />
            </Group>
            <Table.ScrollContainer minWidth={700}>
                <Table
                    highlightOnHover
                    withColumnBorders
                    striped
                    withTableBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Td />
                            <Table.Td w={0}>#</Table.Td>
                            <Table.Td>{t("users.table_name")}</Table.Td>
                            <Table.Td>{t("users.table_email")}</Table.Td>
                            <Table.Td>{t("users.table_role")}</Table.Td>
                            <Table.Td w={0}>{t("users.table_edit")}</Table.Td>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {loading ? (
                            <Table.Tr>
                                <Table.Td colSpan={99} ta={"center"}>
                                    <Loader />
                                </Table.Td>
                            </Table.Tr>
                        ) : isError ? (
                            <Table.Tr>
                                <Table.Td colSpan={99} ta={"center"}>
                                    <Text>{t("users.error")}</Text>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            rows
                        )}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Stack>
    );
};
