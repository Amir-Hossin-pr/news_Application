import { apiCall } from "../ApiCall";

export default {
  async groups(page, count) {
    try {
      let request = await apiCall.get(
        `Group/GetGroups?page=${page}&count=${count}`
      );
      let json = await request.data;
      return this.returnGroups(json);
    } catch (err) {
      console.log(err);
      return apiCall.exception;
    }
  },
  async getMainGroups() {
    try {
      let request = await apiCall.get("Group/GetMainGroups");
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        groups: json.result,
      };
    } catch {
      return apiCall.exception;
    }
  },
  async getSubGroups(groupId) {
    try {
      let request = await apiCall.get(`Group/GetSubGroups?groupId=${groupId}`);
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        groups: json.result,
      };
    } catch {
      return apiCall.exception;
    }
  },
  returnGroups: (json) => ({
    status: json.status,
    title: json.title,
    message: json.message,
    groups: json.result.groups,
    pageCount: json.result.pageCount,
  }),
};
