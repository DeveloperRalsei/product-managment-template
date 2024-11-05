import {
    AppShell,
    Text,
    Avatar,
    Burger,
    Container,
    Group,
    NavLink,
    ScrollArea,
    Title,
    Stack,
} from "@mantine/core";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { IconChevronRight, IconHome, IconUsers } from "@tabler/icons-react";

function AppBase() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    document.title = t("app.title");

    useHotkeys([
        ["1", () => i18n.changeLanguage("en")],
        ["2", () => i18n.changeLanguage("tr")],
    ]);

    const pathname = location.pathname.split("dashboard")[1].replace(/^\//, "");
    const links = [
        {
            label: t("app.links.dashboard"),
            href: "",
            icon: <IconHome size={16} />,
        },
        {
            label: t("app.links.users"),
            href: "users",
            icon: <IconUsers size={16} />,
        },
    ];

    return (
        <AppShell
            header={{ height: 65 }}
            navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: { desktop: false, mobile: !opened },
            }}>
            <AppShell.Header>
                <Group
                    w={"100%"}
                    h={"100%"}
                    align="center"
                    justify="space-between"
                    px={"md"}>
                    <Group>
                        <Burger
                            hiddenFrom="sm"
                            opened={opened}
                            onClick={toggle}
                        />
                        <Title order={1} fz={"h2"}>
                            {t("app.title")}
                        </Title>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar>
                <AppShell.Section grow my={"md"} component={ScrollArea}>
                    {links.map((link) => (
                        <NavLink
                            key={link.href}
                            component={Link}
                            to={link.href}
                            label={link.label}
                            leftSection={link.icon}
                            rightSection={<IconChevronRight size={16} />}
                            active={link.href === pathname}
                            onClick={close}
                        />
                    ))}
                </AppShell.Section>
                <AppShell.Section px={"sm"} py={"md"} bd={"dashed"}>
                    <Group>
                        <Group gap={5} h={60}>
                            <Avatar />
                            <Stack>
                                <Text size="sm" fz="sm" fw={500}>
                                    {t("app.user.name")}
                                </Text>
                                <Text size="sm" fz="xs">
                                    {t("app.user.email")}
                                </Text>
                            </Stack>
                        </Group>
                    </Group>
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main>
                <Container size={"md"} pt={20}>
                    <Outlet />
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}

export default AppBase;
