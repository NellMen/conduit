export type settingsType = {
    status: string;
    error: string | null;
};
export type TypeSetTags = {
    tagName: string;
}
export type userType = {
    email: string;
    password: string;
    username: string;
    bio: string | null;
    image: string | null;
    status: null | string;
    error: null | string;
};