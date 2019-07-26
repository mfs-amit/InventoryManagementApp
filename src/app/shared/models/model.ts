export interface loginApiRequest {
    username: string;
    password: string;
}

export class loginApiResponse {
    message: string;
    token: string;
    username: string;
    userType: string;
    _id: string;

    constructor() {
        this.message = null;
        this.token = null;
        this.username = null;
        this.userType = null;
        this._id = null;
    }
}

export class product {
    _id: string;
    name: string;
    price: number;
    mrp: number;
    image: string;
    description: string;
    attribute: attribute[];
    rating: userRating[];
    distributor: [];
}

export interface addProductApiRequest {
    name: string;
    price: number;
    mrp: number;
    image: string;
    description: string;
    attribute: attribute[];
    rating: userRating[];
    distributor: [];
}

export class distributor {
    _id: string;
    name: string;
    email: number;
    phone: number;
    address: number;
    image: string;
}

export interface addDistributorApiRequest {
    name: string;
    email: number;
    phone: number;
    address: number;
    image: string;
}

export class ImageFile {
    file: File;
    uploadProgress: string;
}

export class attribute {
    attributeKey: string;
    attributeValue: string;

    constructor() {
        this.attributeKey = null;
        this.attributeValue = null;
    }
}

export interface userRating {
    rating: number;
    comment: string;
    userId: string;
    userName: string;
}