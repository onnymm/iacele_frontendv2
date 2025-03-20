declare namespace IACele {

    declare namespace Application {

        interface CurrentUserData {
            id: number | undefined;
            user: string;
            name: string;
            odoo_id: number | undefined;
            "create_date": string;
            "write_date": string;
        };
    };

    declare namespace Context {

        interface Token {
            token: string | null;
            setToken: React.Dispatch<React.SetStateAction<string | null>>;
        };
    };

    declare namespace Core {

        declare namespace Security {

            interface AuthenticationHeaders {
                headers: {
                    accept: string;
                    "Content-Type"?: string;
                    "Authorization"?: string;
                }
            };

            type AuthenticationAction = (username: string, password: string) => (Promise<boolean>);
        };
    };
};
