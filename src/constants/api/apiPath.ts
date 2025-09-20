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
        FORM: '/frontend/form/',
        TREE: {
            _: '/frontend/tree/',
            GET: '/frontend/tree/get/',
        },
    },
}

export default API_PATH;
