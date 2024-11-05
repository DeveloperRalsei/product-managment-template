export const tr = {
    app: {
        title: "Program",
        links: {
            dashboard: "Panel",
            users: "Kullanıcılar",
        },
    },
    users: {
        table_name: "İsim",
        table_email: "E-Posta",
        table_role: "Rol",
        table_edit: "Düzenle",

        search_input: "Ara...",

        role: {
            admin: "Admin",
            user: "Kullanıcı",
        },

        error: "Hata Oluştu",

        add_user: "Kullanıcı Ekle",
        delete_user: "Kullanıcı Sil",
    },
    login: {
        title: "Giriş",
        loginBtn: "Giriş",
        resetBtn: "Sıfırla",
        loginInput: {
            email: "E-posta",
            password: "Şifre",
        },
        validation: {
            email: "Geçersiz e-posta",
            password: "Şifre en az 4 karakter içermelidir",
        },
    },
} as const;
