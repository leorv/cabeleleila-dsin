import { Service } from "./Service";

export interface User {
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    administrator: boolean;

    services: Service[];
}