export type FormAuth = {
    'email': string;
    'password': string;
}

export interface LocationState {
    body: string;
    description: string;
    tagList: string[];
    title: string;
    slug: string;
}

export type FormRegister = {
    'email': string;
    'password': string;
    'username': string;
}

export type FormSettings = {
    'image': string;
    'username': string;
    'bio': string;
    'email': string;
    'password': string
}