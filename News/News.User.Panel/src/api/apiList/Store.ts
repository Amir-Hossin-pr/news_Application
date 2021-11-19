import { apiCall, exception } from "../ApiCall";

export default {
  async getBestStores(page = 0, count = 15) {
    try {
      let request = await apiCall.get(
        `Store/GetBestStores?page=${page}&count=${count}`
      );
      let json = await request.data;
      return this.createStoreResult(json);
    } catch {
      return exception;
    }
  },
  async getStores(guild, page = 0, count = 15) {
    try {
      let request = await apiCall.get(
        `Store/GetStores?guildId=${guild}&page=${page}&count=${count}`
      );
      let json = await request.data;
      return this.createStoreResult(json);
    } catch {
      return exception;
    }
  },
  async sellerRequest(store) {
    try {
      let request = await apiCall.post("Store/SellerRequest", store);
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        store: json.result.store,
      };
    } catch {
      return exception;
    }
  },
  async getUserStores(page, count) {
    try {
      let request = await apiCall.get(
        `Store/GetUserStores?page=${page}&count=${count}`
      );
      let response = await request.data;
      return this.createStoreResult(response);
    } catch {
      return exception;
    }
  },
  async getStoreAdminDetail(storeId) {
    try {
      let request = await apiCall.get(
        `Store/GetStoreAdminDetail?storeId=${storeId}`
      );
      let response = await request.data;
      return {
        status: response.status,
        title: response.title,
        message: response.message,
        data: response.result.storeDetial,
      };
    } catch {
      return exception;
    }
  },
  async getStoreNewTickets(page, count, storeId) {
    try {
      let request = await apiCall.get(
        `Store/GetStoreNewTickets?page=${page}&count=${count}&storeId=${storeId}`
      );
      let response = await request.response;
      return this.createStoreTicketResult(response);
    } catch {
      return exception;
    }
  },
  async getBestSelledProducts(page, count, storeId) {
    try {
      let request = await apiCall.get(
        `Store/GetBestSelledProducts?page=${page}&count=${count}&storeId=${storeId}`
      );
      let response = await request.data;
      return {
        status: response.status,
        title: response.title,
        message: response.message,
        pageCount: response.result.pageCount,
        products: response.result.products,
      };
    } catch {
      return exception;
    }
  },
  createStoreTicketResult: (json) => ({
    status: json.status,
    title: json.title,
    message: json.message,
    pageCount: json.result.pageCount,
    tikcets: json.result.tickets,
  }),
  createStoreResult: (json) => ({
    status: json.status,
    title: json.title,
    message: json.message,
    pageCount: json.result.pageCount,
    stores: json.result.stores,
  }),
};
