
export const messages = {
    exception: (message) => ({
        status: false,
        code: 500,
        title: 'An Exception Has Thrrowed',
        message: message
    }),

    userNotFound: {
        status: false,
        code: 404,
        title: 'User NotFound',
        message: 'Wrong User Name'
    },

    accessDenied: (message) => ({
        status: false,
        code: 403,
        title: 'Access Denied',
        message: message
    }),

    userExist: {
        status: false,
        code: 403,
        title: 'User Name Already Taked',
        message: 'User Name or Email or MobileNo Already Taked'
    },

    success: ({ title, message, result }) => ({
        status: true,
        code: 200,
        title: title,
        message: message,
        result: result
    }),

    notFound: (message: string) => ({
        status: false,
        code: 404,
        message: message,
        result: {}
    })
}
