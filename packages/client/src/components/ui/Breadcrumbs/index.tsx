import { Breadcrumbs, Button } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const BreadCrumbs = ({
    data = [{ label: "Dashboard", href: "/dashboard", disabled: false }],
}: {
    data: {
        label: string;
        href?: string;
        icon?: React.ReactNode;
        disabled?: boolean;
    }[];
}) => {
    return (
        <Breadcrumbs
            mb={"md"}
            separator={<IconArrowRight size={12} />}
            separatorMargin={0}>
            {data.map((link, index) => (
                <Button
                    key={link.label + index}
                    component={Link}
                    to={link.href || ""}
                    leftSection={link.icon}
                    disabled={link.disabled}
                    variant="subtle"
                    size="compact-lg"
                    fz={{ sm: "h4", md: "h3" }}
                    fw={"bold"}>
                    {link.label}
                </Button>
            ))}
        </Breadcrumbs>
    );
};
