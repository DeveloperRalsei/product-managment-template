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
    Avatar,
    Tooltip,
    Pagination,
    Select,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useEffect, useReducer, useState } from "react";
import { BreadCrumbs } from "../../../components/ui/Breadcrumbs";
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { Link, redirect } from "react-router-dom";
import { reducer, initialState, reducerValues } from "./userReducer";

export const Users = () => {
    const { t } = useTranslation();

    const [{ users }, dispatch] = useReducer(reducer, initialState);

    const { SET_USERS } = reducerValues;

    const [isEmpty, setIsEmpty] = useState(false);
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

                if (!response.ok) {
                    throw new Error("Network Error");
                }

                const data = await response.json();

                if (data.users.length === 0) {
                    setIsEmpty(true);
                    return;
                }

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

    const selectedUsersQuery = new URLSearchParams();

    let emailQuery: string[] = [];
    selectedRows.forEach((email) => {
        emailQuery.push(email);
    });

    selectedUsersQuery.append("email", emailQuery.join(","));

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
                            <ActionIcon
                                component={Link}
                                to={"/dashboard/users/add"}>
                                <IconPlus size={16} />
                            </ActionIcon>
                        </Tooltip>

                        {selectedRows.length > 0 && (
                            <Tooltip label={t("users.delete_user")}>
                                <ActionIcon
                                    color="red"
                                    component={Link}
                                    to={
                                        "/dashboard/users/delete?" +
                                        selectedUsersQuery
                                    }>
                                    <IconTrash size={16} />
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </Group>
                    <Pagination
                        total={Math.ceil(filteredUsers.length / pageSize)}
                        visibleFrom="md"
                        value={page}
                        onChange={setPage}
                        size="sm"
                    />

                    <Group>
                        <label>{t("users.table_page_size")}</label>
                        <Select
                            id="pageSize"
                            value={String(pageSize)}
                            w={100}
                            withScrollArea
                            onChange={(e) => setPageSize(Number(e))}
                            data={["5", "10", "20", "30", "50", "100"]}
                        />
                    </Group>
                </Group>
                <Group hiddenFrom="md" justify="center" w={"100%"}>
                    <Pagination
                        total={Math.ceil(filteredUsers.length / pageSize)}
                        value={page}
                        onChange={setPage}
                        withControls={false}
                        size={"sm"}
                    />
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
                            <Table.Td w={0}>
                                <Checkbox
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            users.forEach((user) =>
                                                setSelectedRows((prev) => [
                                                    ...prev,
                                                    user.email,
                                                ])
                                            );
                                        } else {
                                            setSelectedRows([]);
                                        }
                                    }}
                                />
                            </Table.Td>
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
                        ) : isEmpty ? (
                            <Table.Tr>
                                <Table.Td colSpan={99} ta={"center"}>
                                    <Text>{t("users.empty")}</Text>
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
                                            <Badge color="red" variant="dot">
                                                {t("users.role.admin")}
                                            </Badge>
                                        )}
                                        {user.role === "user" && (
                                            <Badge
                                                color="blue"
                                                variant="default">
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
        </Stack>
    );
};
