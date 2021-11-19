import { apiCall, exception } from "../ApiCall";

export default {
  async getProducts(page, count) {
    try {
      let request = await apiCall.get(
        `Product/GetProducts?page=${page}&count=${count}`
      );
      let json = await request.data;
      return this.returnProducts(json);
    } catch {
      return exception;
    }
  },
  async getProductStores(productId) {
    try {
      let request = await apiCall.get(
        `Product/GetProductStores?productId=${productId}`
      );
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        stores: json.result,
      };
    } catch {
      return exception;
    }
  },
  async getProduct(productId) {
    try {
      let request = await apiCall.get(
        `Product/GetProduct?productId=${productId}`
      );
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        product: json.result,
      };
    } catch {
      return exception;
    }
  },
  async getGroupProducts(groupId, page, count) {
    try {
      let request = await apiCall.get(
        `Product/GetGroupProducts?groupId=${groupId}&page=${page}&count=${count}`
      );
      let json = await request.data;
      return this.returnProducts(json);
    } catch {
      return exception;
    }
  },
  async getPopularProducts(page, count) {
    try {
      let request = await apiCall.get(
        `Product/GetPopularProducts?page=${page}&count=${count}`
      );
      let json = await request.data;
      return this.returnProducts(json);
    } catch {
      return exception;
    }
  },
  async getBestSellingProducts(page, count) {
    try {
      let request = await apiCall.get(
        `Product/GetBestSellingProducts?page=${page}&count=${count}`
      );
      let json = await request.data;
      return this.returnProducts(json);
    } catch {
      return exception;
    }
  },
  async getPropposedProducts(page, count) {
    try {
      let request = await apiCall.get(
        `Product/GetPropposedProducts?page=${page}&count=${count}`
      );
      let json = await request.data;
      return this.returnProducts(json);
    } catch {
      return exception;
    }
  },
  async getProductFeatures(productId) {
    try {
      let result = await apiCall.get(
        `Product/GetProductFeatures?productId=${productId}`
      );
      let json = await result.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        features: json.result,
      };
    } catch {
      return exception;
    }
  },
  async getRelatedProducts(productId, page = 1, count = 15) {
    try {
      let request = await apiCall.get(
        `Product/GetRelatedProducts?productId=${productId}&page=${page}&count=${count}`
      );
      let json = await request.data;
      return this.returnProducts(json);
    } catch {
      return exception;
    }
  },
  returnProducts: (json) => ({
    status: json.status,
    title: json.title,
    message: json.message,
    pageCount: json.result.pageCount,
    products: json.result.products,
  }),
};
