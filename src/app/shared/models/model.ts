export interface loginApiRequest {
    username: string;
    password: string;
}

export class loginApiResponse {
    created: string;
    id: string;
    ttl: number;
    userId: number;

    constructor() {
        this.created = null;
        this.id = null;
        this.ttl = null;
        this.userId = null;
    }
}

export class product {
    id: number;
    name: string;
    price: number;
    rating: number;

    constructor() {
        this.id = null;
        this.name = null;
        this.price = null;
        this.rating = null;
    }
}

export interface addProductApiRequest {
    name: string;
    price: number;
    rating: number;
}