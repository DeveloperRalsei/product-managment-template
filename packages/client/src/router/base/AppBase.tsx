import {
    AppShell,
    Burger,
    Container,
    Group,
    NavLink,
    ScrollArea,
    Title,
    LoadingOverlay,
} from "@mantine/core";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { IconChevronRight, IconHome, IconUsers } from "@tabler/icons-react";
import { UserManager } from "../../components/ui/UserManager";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";

function AppBase() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const { user, loading } = useUser();
    const navigate = useNavigate();

    document.title = t("app.title");

    useHotkeys([
        ["1", () => i18n.changeLanguage("en")],
        ["2", () => i18n.changeLanguage("tr")],
    ]);

    useEffect(() => {
        if (!user && !loading) {
            navigate("/");
        }
    }, [user, loading, navigate]);

    if (!user) {
        open("/", "_self");
        return <></>;
    }

    const pathname = location.pathname.split("dashboard")[1].replace(/^\//, "");
    const links = [
        {
            label: t("app.links.dashboard"),
            href: "",
            icon: <IconHome size={16} />,
            isVisible: true,
        },
        {
            label: t("app.links.users"),
            href: "users",
            icon: <IconUsers size={16} />,
            isVisible: user?.role === "admin",
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
            <LoadingOverlay visible={loading} />
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
                            display={link.isVisible ? "flex" : "none"}
                            leftSection={link.icon}
                            rightSection={<IconChevronRight size={16} />}
                            active={link.href === pathname}
                            onClick={close}
                        />
                    ))}
                </AppShell.Section>
                {user && (
                    <AppShell.Section
                        px={"sm"}
                        py={"md"}
                        bd={"1px 0 0 0 var(--mantine-color-dark)"}>
                        <UserManager user={user} />
                    </AppShell.Section>
                )}
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
