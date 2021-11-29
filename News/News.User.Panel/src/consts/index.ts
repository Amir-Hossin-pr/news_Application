export const appTitle = "Friends News";

export const rules = {
    required: (value: any) => !!value || "Filling this field is compulsory",
};

export const messages = {
    formInvalid: "The full form is not filled",
    networkError: "An error occurred in connection to the server",
    canNotNull: (item: string) => `The ${item} value cannot be empty`,
};

export const tokenName = "Authorization";

export const enums = {
    UserType: {
        User: 0,
        Seller: 1
    }
};

export const navigationItemsIr = [
    {
        id: 0,
        icon: "mdi-home",
        title: "Home",
        to: "/",
    },
    {
        id: 1,
        icon: "mdi-account",
        title: "User Account",
        to: "/account",
    },
    {
        id: 2,
        icon: 'mdi-magnify',
        title: 'Search',
        to: "/search"
    },
];

export const bottomItems = [
    {
        id: 0,
        icon: 'mdi-home',
        title: 'Home',
        to:"/"
    },
        
    {
        id: 1,
        icon: 'mdi-magnify',
        title: 'Search',
        to: "/search"
    },
    {
        id: 2,
        icon: 'mdi-account',
        title: 'Profile',
        to: "/account"
    }
];
