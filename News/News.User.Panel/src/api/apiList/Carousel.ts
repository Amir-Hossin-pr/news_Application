import {apiCall} from "../ApiCall";

export default {
  async getItems() {
    try {
      let request = await apiCall.get("Application/GetSlider");
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        items: json.result,
      };
    } catch {
      return apiCall.exception;
    }
  },
};
