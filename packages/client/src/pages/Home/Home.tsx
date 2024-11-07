import { Space, Stack, Title } from "@mantine/core";
import { BreadCrumbs } from "../../components/ui/Breadcrumbs";
import { useTranslation } from "react-i18next";

export const Home = () => {
    const { t } = useTranslation();
    const breadcrumbs = {
        label: t("app.links.dashboard"),
        href: "",
    };

    return (
        <Stack w={"100%"} gap={0} pt={0}>
            <BreadCrumbs data={[breadcrumbs]} />
            <Title order={2}>{t("home.title")}</Title>
            <Space h={"30vh"} />
        </Stack>
    );
};
