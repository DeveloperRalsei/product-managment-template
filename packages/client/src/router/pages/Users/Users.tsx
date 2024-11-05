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
    Box,
    Avatar,
    Tooltip,
    Pagination,
    Select,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useEffect, useReducer, useState } from "react";
import { BreadCrumbs } from "../../../components/ui/Breadcrumbs";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { reducer, initialState, reducerValues } from "./userReducer";

export const Users = () => {
    const { t } = useTranslation();

    const [{ users }, dispatch] = useReducer(reducer, initialState);

    const { SET_USERS } = reducerValues;

    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await fetch("/api/v1/users");
                const data = await response.json();

                Array(200)
                    .fill(0)
                    .forEach((_, index) => {
                        data.users.push({
                            _id: index + 1,
                            name: `User ${index + 1}`,
                            email: `user${index + 1}@gmail.com`,
                            role: "user",
                        });
                    });

                dispatch({ type: SET_USERS, payload: data.users });
            } catch (error) {
                console.error(error);
                setIsError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredUsers = users.filter((user) =>
        [user.name, user.email].some((value) => value.includes(search))
    );

    const paginatedUsers = filteredUsers.slice(
        (page - 1) * pageSize,
        page * pageSize
    );

    const breadcrumbs = [
        { label: t("app.links.dashboard"), href: "/dashboard" },
        {
            label: t("app.links.users"),
            href: "/dashboard/users",
        },
    ];

    return (
        <Stack>
            <BreadCrumbs data={breadcrumbs} />
            <Group>
                <Group grow w={"100%"}>
                    <TextInput
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t("users.search_input")}
                    />
                </Group>
                <Group w={"100%"} justify="space-between">
                    <Group>
                        <Tooltip label={t("users.add_user")}>
                            <ActionIcon>
                                <IconPlus size={16} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label={t("users.delete_user")}>
                            <ActionIcon color="red">
                                <IconTrash size={16} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                    <Group>
                        <Select
                            value={String(pageSize)}
                            onChange={(e) => setPageSize(Number(e))}
                            data={["5", "10", "20", "30", "50", "100"]}
                            width={30}
                        />
                        <Pagination
                            total={Math.ceil(filteredUsers.length / pageSize)}
                            value={page}
                            onChange={setPage}
                            size="sm"
                        />
                    </Group>
                </Group>
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
                            paginatedUsers.map((user, index) => (
                                <Table.Tr key={user.name + user._id + index}>
                                    <Table.Th w={0}>
                                        <Checkbox
                                            aria-label="Select Row"
                                            checked={selectedRows.includes(
                                                user.email
                                            )}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedRows((prev) => [
                                                        ...prev,
                                                        user.email,
                                                    ]);
                                                } else {
                                                    setSelectedRows((prev) =>
                                                        prev.filter(
                                                            (email) =>
                                                                email !==
                                                                user.email
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                    </Table.Th>
                                    <Table.Th>
                                        {(page - 1) * pageSize + index + 1}
                                    </Table.Th>
                                    <Table.Td>
                                        <Group gap={5}>
                                            <Avatar size={35} />
                                            {user.name}
                                        </Group>
                                    </Table.Td>
                                    <Table.Td>{user.email}</Table.Td>
                                    <Table.Td>
                                        {user.role === "admin" && (
                                            <Badge color="red">
                                                {t("users.role.admin")}
                                            </Badge>
                                        )}
                                        {user.role === "user" && (
                                            <Badge color="blue">
                                                {t("users.role.user")}
                                            </Badge>
                                        )}
                                    </Table.Td>
                                    <Table.Td>
                                        <ActionIcon
                                            component={Link}
                                            to={`/dashboard/users/edit/${user._id}`}>
                                            <IconEdit />
                                        </ActionIcon>
                                    </Table.Td>
                                </Table.Tr>
                            ))
                        )}
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>

            <Stack>
                {selectedRows.map((row) => (
                    <Box key={row}>{row}</Box>
                ))}
            </Stack>
        </Stack>
    );
};
