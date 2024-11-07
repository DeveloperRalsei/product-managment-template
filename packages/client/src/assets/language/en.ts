export const en = {
    app: {
        title: "App",
        links: {
            dashboard: "Dashboard",
            users: "Users",
            add: "Add",
            edit: "Edit",
            delete: "Delete",
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

        validation: {
            name: "Enter a name that contains at least 4 character",
            email: "Enter a valid email",
            password: "Enter a password that contains at least 4 character",
        },

        add_input: {
            name: "Name",
            email: "E-Mail",
            password: "Password",
            role: "Role",
            submit: "Submit",
            reset: "Reset",
            error: "Something went wrong, please try again",
            success: "User created",
        },
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
        error: "Login Failed",
        success: "Login Success",
    },
} as const;
