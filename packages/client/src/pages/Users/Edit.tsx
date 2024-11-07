import { Stack } from "@mantine/core";
import { BreadCrumbs } from "../../components/ui/Breadcrumbs";

export const Edit = () => {
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
            label: "Edit",
            href: "/dashboard/users/edit",
        },
    ];
    return (
        <Stack>
            <BreadCrumbs data={breadcrumbs} />
        </Stack>
    );
};
