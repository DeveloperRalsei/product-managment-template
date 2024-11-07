import { LoadingOverlay } from "@mantine/core";
import { useEffect } from "react";

export const Logout = () => {
    useEffect(() => {
        async function logout() {
            try {
                const response = await fetch("/api/v1/logout", {
                    method: "POST",
                    credentials: "include",
                });

                if (response.ok) {
                    window.location.href = "/";
                } else {
                    console.error("Logout failed");
                }
            } catch (error) {
                console.error("Logout error:", error);
            }
        }
        logout();
    }, []);

    return <LoadingOverlay visible />;
};
