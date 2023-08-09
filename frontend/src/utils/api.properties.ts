export const ApiProperties = {
    host: "localhost",
    port: 8080,
    endpath: "/api",
    routes: {
        getApplications: "/api/applications/",
        getApplicationById: "/api/applications/{id}",
        addApplication: "/api/applications/add",
        deleteApplication: "/api/applications/delete",

        addUser: "/api/users/create",
        loginUser: "/api/users/login"
    }
}