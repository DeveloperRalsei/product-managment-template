export const tr = {
    app: {
        title: "Program",
        links: {
            dashboard: "Panel",
            users: "Kullanıcılar",
            add: "Ekle",
            edit: "Düzenle",
            delete: "Sil",
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

        error: "Bir şeyler ters gitti, lütfen tekrar giriş yapmayı deneyin",

        add_user: "Kullanıcı Ekle",
        delete_user: "Kullanıcı Sil",
        table_page_size: "Sayfa Sayısı",

        empty: "Kullanıcı bulunamadı",

        validation: {
            name: "En az 4 karakter içermelidir",
            email: "Geçersiz e-posta",
            password: "En az 4 karakter içermelidir",
        },

        add_input: {
            name: "İsim",
            email: "E-Posta",
            password: "Şifre",
            role: "Rol",
            submit: "Kaydet",
            reset: "Sıfırla",
            error: "Bir şeyler ters gitti, lütfen tekrar deneyin",
            success: "User created",
        },
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
        error: "Giriş başarısız oldu",
        success: "Giriş başarılı",
    },
} as const;
