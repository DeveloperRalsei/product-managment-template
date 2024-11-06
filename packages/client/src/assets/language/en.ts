export const en = {
    app: {
        title: "App",
        links: {
            dashboard: "Dashboard",
            users: "Users",
        },
    },
    users: {
        table_name: "Name",
        table_email: "E-Mail",
        table_role: "Role",
        table_edit: "Edit",

        search_input: "Search...",

        role: {
            admin: "Admin",
            user: "User",
        },

        error: "Something went wrong, please try login again",

        add_user: "Add User",
        delete_user: "Delete User",
        table_page_size: "Page Size",

        empty: "No users found",
    },
    login: {
        title: "Login",
        resetBtn: "Reset",
        loginBtn: "Login",
        loginInput: {
            email: "Email",
            password: "Password",
        },
        validation: {
            email: "Invalid email",
            password: "The password must be at least 4 characters",
        },
    },
} as const;
