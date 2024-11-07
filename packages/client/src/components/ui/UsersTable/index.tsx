import {
    Table,
    Checkbox,
    Badge,
    Group,
    Avatar,
    Loader,
    Text,
    ActionIcon,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
};

type UserTableProps = {
    users: User[];
    loading: boolean;
    isError: boolean;
    isEmpty: boolean;
    selectedIds: string[];
    onToggleSelect: (userId: string) => void;
    onSelectAll: (isSelected: boolean) => void;
    page: number;
    pageSize: number;
};

export const UserTable = ({
    users,
    loading,
    isError,
    isEmpty,
    selectedIds,
    onToggleSelect,
    onSelectAll,
    page,
    pageSize,
}: UserTableProps) => {
    const { t } = useTranslation();

    const paginatedUsers = users.slice((page - 1) * pageSize, page * pageSize);

    return (
        <Table.ScrollContainer minWidth={700}>
            <Table highlightOnHover withColumnBorders striped withTableBorder>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Td w={0}>
                            <Checkbox
                                onChange={(e) => onSelectAll(e.target.checked)}
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
                            <Table.Tr key={user._id}>
                                <Table.Td>
                                    <Checkbox
                                        aria-label="Select Row"
                                        checked={selectedIds.includes(user._id)}
                                        onChange={() =>
                                            onToggleSelect(user._id)
                                        }
                                    />
                                </Table.Td>
                                <Table.Td>
                                    {(page - 1) * pageSize + index + 1}
                                </Table.Td>
                                <Table.Td>
                                    <Group gap={5}>
                                        <Avatar size={35} />
                                        {user.name}
                                    </Group>
                                </Table.Td>
                                <Table.Td>{user.email}</Table.Td>
                                <Table.Td>
                                    {user.role === "admin" && (
                                        <Badge color="red" variant="light">
                                            {t("users.role.admin")}
                                        </Badge>
                                    )}
                                    {user.role === "user" && (
                                        <Badge color="blue" variant="default">
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
    );
};
