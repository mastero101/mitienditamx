export interface User {
    id: number;
    email: string;
    name: string;
    isAdmin: boolean;
    password: string;
    addresses?: string[];
}