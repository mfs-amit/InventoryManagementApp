export interface loginApiRequest {
    username: string;
    password: string;
}

export class loginApiResponse {
    message: string;
    token: string;
    username: string;
    userType: string;

    constructor() {
        this.message = null;
        this.token = null;
        this.username = null;
        this.userType = null;
    }
}

export class product {
    _id: string;
    name: string;
    price: number;
    rating: number;
    quantity: number;
    image: string;
    description: string;
    distributor: string;
}

export interface addProductApiRequest {
    name: string;
    price: number;
    rating: number;
    quantity: number;
    image: string;
    description: string;
    distributor: string;
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