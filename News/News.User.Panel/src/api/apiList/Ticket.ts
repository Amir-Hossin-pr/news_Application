import { apiCall, exception } from "@/api/ApiCall";

export default {
  async getTickets(page = 0, count = 15) {
    try {
      let request = await apiCall.get(
        `Ticket/Gettickets?page=${page}&count=${count}`
      );
      let response = await request.data;
      return this.returnTicket(response);
    } catch {
      return exception;
    }
  },
  returnTicket: (json) => ({
    status: json.status,
    title: json.title,
    message: json.message,
    pageCount: json.result.pageCount,
    tickets: json.result.tickets,
  }),
};
