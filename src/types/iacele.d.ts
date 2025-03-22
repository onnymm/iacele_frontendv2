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

        interface DarkMode {
            darkMode: boolean;
            setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
        };
    };

    declare namespace UI {

        interface Input {
            value?: string;
            onValueChange?: React.Dispatch<React.SetStateAction<string>>;
        };

        interface CoreInput extends Input {
            label: string;
            icon?: React.FC<React.SVGProps<SVGSVGElement>>;
            type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
            endContent?: React.ReactNode;
            name: string;
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

            type AuthenticationAction = (
                username: string,
                password: string,
                setError: React.Dispatch<React.SetStateAction<string>>
            ) => (Promise<void>);
        };
    };

    declare namespace API {

        declare namespace Response {

            interface Authentication {
                'access_token': string;
                'token_type': 'bearer';
            };

            interface Error {
                detail: string;
            };
        };
    };

    declare namespace Browser {

        declare namespace LocalStorage {

            type DarkModeValue = 'false' | 'true' | null;
        };
    };
};
