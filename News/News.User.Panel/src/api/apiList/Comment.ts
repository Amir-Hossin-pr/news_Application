import {apiCall} from "../ApiCall";

export default {
  async getProductComments(page = 1, count = 20, productId) {
    try {
      let request = await apiCall.get(
        `Comment/GetProductComments?productId=${productId}&page=${page}&count=${count}`
      );
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        pageCount: json.result.pageCount,
        comments: json.result.comments,
      };
    } catch {
      return apiCall.exception;
    }
  },
  async addComment(comment) {
    try {
      let request = await apiCall.post("Comment/AddComment", comment);
      let json = request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        comment: json.result,
      };
    } catch {
      return apiCall.exception;
    }
  },
  async rateComment(rate) {
    try {
      let request = await apiCall.post("Comment/RateComment", rate);
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        rate: json.result,
      };
    } catch {
      return apiCall.exception;
    }
  },
  async getCommentReplies(commentId, type, page = 0, count = 15) {
    try {
      let request = await apiCall.get(
        `Comment/GetReplies?commentId=${commentId}&type=${type}&page=${page}&count=${count}`
      );
      let json = await request.data;
      return {
        status: json.status,
        title: json.title,
        message: json.message,
        pageCount: json.result.pageCount,
        comments: json.result.comments,
      };
    } catch {
      return apiCall.exception;
    }
  },
};
