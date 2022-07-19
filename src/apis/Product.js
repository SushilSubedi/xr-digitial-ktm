import BaseRequest from 'services/requests/Base';

const BASE_URL = 'http://localhost:3000';

const URLS = {
  FETCH_ALL_PRODUCTS: `${BASE_URL}/products`,
  FETCH_PRODUCT_CATEGORIES: `${BASE_URL}/product_categories`,
  DELETE_PRODUCT_URL: `${BASE_URL}/products/:product_id`,
};

class ProductApi extends BaseRequest {
  static fetchProducts() {
    return this.get(URLS.FETCH_ALL_PRODUCTS);
  }

  static deleteProduct(productID) {
    const deleteUrl = URLS.DELETE_PRODUCT_URL.replace(':product_id', productID);

    return this.get(deleteUrl);
  }
}

export default ProductApi;
