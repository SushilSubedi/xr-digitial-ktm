import BaseRequest from 'services/requests/Base';

const BASE_URL = 'http://localhost:3000';

const URLS = {
  ALL_PRODUCTS: `${BASE_URL}/products`,
  FETCH_PRODUCT_CATEGORIES: `${BASE_URL}/product_categories`,
  INDIVIDUAL_PRODUCT_URL: `${BASE_URL}/products/:product_id`,
};

class ProductApi extends BaseRequest {
  static fetchProducts() {
    return this.get(URLS.ALL_PRODUCTS);
  }

  /**
   *
   * @param {init} productID - ID of individual product
   * @returns
   */
  static deleteProduct(productID) {
    const deleteUrl = URLS.INDIVIDUAL_PRODUCT_URL.replace(
      ':product_id',
      productID
    );

    return this.delete(deleteUrl);
  }

  /**
   *
   * @param {array} data - NEWLY CREATED PRODUCT
   * @returns
   */
  static addProduct(data) {
    return this.post(URLS.ALL_PRODUCTS, data);
  }

  /**
   *
   * @param {init} productID - ID of individual product
   * @returns
   */
  static updateProduct(productID, data) {
    const editUrl = URLS.INDIVIDUAL_PRODUCT_URL.replace(
      ':product_id',
      productID
    );

    return this.patch(editUrl, data);
  }
}

export default ProductApi;
