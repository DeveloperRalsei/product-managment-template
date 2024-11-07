import { useTranslation } from "react-i18next";
import { useEffect, useReducer, useState } from "react";
import { BreadCrumbs } from "../../components/ui/Breadcrumbs";
import {
    ActionIcon,
    Group,
    Loader,
    Stack,
    TextInput,
    Pagination,
    Select,
    Tooltip,
    Box,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { reducer, initialState, reducerValues } from "./userReducer";
import { useUser } from "../../context/UserContext";
import { useDebouncedValue } from "@mantine/hooks";
import { UserTable } from "../../components/ui/UsersTable";

export const Users = () => {
    const { t } = useTranslation();
    const [{ users }, dispatch] = useReducer(reducer, initialState);
    const { SET_USERS } = reducerValues;

    const [isEmpty, setIsEmpty] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { user } = useUser();
    const [debounced] = useDebouncedValue(search, 200);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/v1/users");
                if (!response.ok) {
                    window.open("/", "_self");
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
        [user.name, user.email].some((value) => value.includes(debounced))
    );

    const breadcrumbs = [
        { label: t("app.links.dashboard"), href: "/dashboard" },
        { label: t("app.links.users"), href: "/dashboard/users" },
    ];

    const onToggleSelect = (userId: string) => {
        setSelectedIds((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const onSelectAll = (isSelected: boolean) => {
        setSelectedIds(isSelected ? users.map((user) => user._id) : []);
    };

    return (
        <Stack>
            <BreadCrumbs data={breadcrumbs} />
            <Group wrap="wrap" grow w={"100%"} hiddenFrom="md">
                <TextInput
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("users.search_input")}
                />
            </Group>
            <Group>
                <Group grow w={"100%"} visibleFrom="md">
                    <TextInput
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={t("users.search_input")}
                    />
                </Group>
                <Group w={"100%"} justify="space-between">
                    <Group hidden={user?.role !== "admin"}>
                        <Tooltip label={t("users.add_user")}>
                            <ActionIcon
                                component={Link}
                                to={"/dashboard/users/add"}>
                                <IconPlus size={16} />
                            </ActionIcon>
                        </Tooltip>

                        {selectedIds.length > 0 && (
                            <Tooltip label={t("users.delete_user")}>
                                <ActionIcon
                                    color="red"
                                    component={Link}
                                    to={`/dashboard/users/delete?ids=${selectedIds.join(
                                        ","
                                    )}`}>
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
            <Group w={"100%"} justify="center" hiddenFrom="md">
                <Pagination
                    total={Math.ceil(filteredUsers.length / pageSize)}
                    value={page}
                    onChange={setPage}
                    size="sm"
                    display={"block"}
                />
            </Group>
            <UserTable
                users={filteredUsers}
                loading={loading}
                isError={isError}
                isEmpty={isEmpty}
                selectedIds={selectedIds}
                onToggleSelect={onToggleSelect}
                onSelectAll={onSelectAll}
                page={page}
                pageSize={pageSize}
            />
        </Stack>
    );
};
