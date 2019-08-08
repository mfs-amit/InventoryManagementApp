export interface loginApiRequest {
    username: string;
    password: string;
}

export interface registerApiRequest {
    username: string;
    password: string;
    userType: string;
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
    _id?: string;
    name: string;
    price: number;
    mrp: number;
    image: string;
    description: string;
    averageRating?: number;
    attribute: attribute[];
    rating: userRating[];
    distributor: productDistributor[];

    constructor() {
        this._id = null;
        this.name = null;
        this.price = null;
        this.mrp = null;
        this.image = null;
        this.description = null;
        this.attribute = new Array<attribute>();
        this.rating = new Array<userRating>();
        this.distributor = new Array<productDistributor>();
    }
}

export class distributor {
    _id?: string;
    name: string;
    email: number;
    phone: number;
    address: number;
    image: string;

    constructor() {
        this._id = null;
        this.name = null;
        this.email = null;
        this.phone = null;
        this.address = null;
        this.image = null;
    }
}

export class attribute {
    attributeKey: string;
    attributeValue: string;

    constructor() {
        this.attributeKey = null;
        this.attributeValue = null;
    }
}

export class productDistributor {
    distributorName: string;
    distributorPrice: number;

    constructor() {
        this.distributorName = null;
        this.distributorPrice = null;
    }
}

export interface userRating {
    rating: number;
    comment: string;
    userId: string;
    userName: string;
}

export interface alertData {
    alertType: string;
    name: string;
}