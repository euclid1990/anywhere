export type User = {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

export type Message = {
    user_id: string;
    user_name: string;
    content: string;
}

export type Location = {
    lat: number;
    lng: number;
}