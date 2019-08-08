import { baseUrl } from 'src/environments/environment';

export const apiUrls = Object({
    login: baseUrl + 'users/login',
    register: baseUrl + 'users/register',
    logout: baseUrl + 'users/logout',
    products: baseUrl + 'products',
    distributors: baseUrl + 'distributors',
    uploadImage: baseUrl + 'products/upload'
})