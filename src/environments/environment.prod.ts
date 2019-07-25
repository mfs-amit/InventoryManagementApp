export const environment = {
  production: true
};

export const baseUrl = 'http://localhost:3001/api/';
export const apiUrls = {
  login: baseUrl + 'users/login',
  logout: baseUrl + 'users/logout',
  products: baseUrl + 'products',
  distributors: baseUrl + 'distributors',
  uploadImage: baseUrl + 'products/upload'
}