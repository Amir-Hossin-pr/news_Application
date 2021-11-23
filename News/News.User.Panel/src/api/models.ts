export interface Login {
    userName: string;
    password: string;
}

export interface Signup {
    userName: string;
    fullName: string;
    mobileNo: string;
    password: string;
}

export interface Activation {
    userName: string;
    activeCode: string;
}