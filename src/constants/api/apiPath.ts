const API_PATH = {
    TOKEN: '/token/',
    ACCOUNT: {
        ME: '/account/me/',
    },
    CRUD: {
        CREATE: '/crud/create/',
        READ: '/crud/read/',
        SEARCH_READ: '/crud/search_read',
        UPDATE: '/crud/update',
        DELETE: '/crud/delete',
    },
    SERVER: {
        ACTION: '/server/action/',
        TASK: '/server/task/',
    },
    FRONTEND: {
        FORM: {
            GET: '/frontend/form/get/',
        },
        LIST: {
            _: '/frontend/tree/',
            GET: '/frontend/list/get/',
        },
    },
}

export default API_PATH;
