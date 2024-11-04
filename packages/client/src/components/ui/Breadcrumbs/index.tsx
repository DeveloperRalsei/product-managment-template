import { Breadcrumbs, Anchor } from "@mantine/core";
import { Link } from "react-router-dom";

export const BreadCrumbs = ({
    data,
}: {
    data: {
        label: string;
        href: string;
    }[];
}) => {
    return (
        <Breadcrumbs mb={25}>
            {data.map((link, index) => (
                <Anchor
                    key={link.label + index}
                    component={Link}
                    to={link.href}
                    fz={{ sm: "h4", md: "h3" }}
                    fw={"bold"}>
                    {link.label}
                </Anchor>
            ))}
        </Breadcrumbs>
    );
};
