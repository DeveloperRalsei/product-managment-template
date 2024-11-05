import { Stack } from "@mantine/core";
import { BreadCrumbs } from "../../../components/ui/Breadcrumbs";

export const Add = () => {
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
            label: "Add",
            href: "/dashboard/users/add",
        },
    ];
    return (
        <Stack>
            <BreadCrumbs data={breadcrumbs} />
        </Stack>
    );
};
