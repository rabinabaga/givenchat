import HttpService from "../../service/http.service";

class MessagesService extends HttpService {
  async getAllUsers(search) {
    try {
      let response = await this.getRequest(
        `api/v1/chat/user?search=${search}`,
        null,
        {
          auth: true,
        }
      );
      console.log("resons g pl sevc", response);
      return response;
    } catch (exception) {
      throw exception;
    }
  }
  async fetchAllMessages(id) {
    try {
      let response = await this.getRequest(`api/v1/messages/${id}`, null, {
        auth: true,
      });
      console.log("resons g pl sevc in fetch all message [in mesg service frontend]", response);
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  async getChatWithUser(userId) {
    try {
      let response = await this.postRequest(
        "api/v1/chat",
        { userId },
        {
          auth: true,
        }
      );
      console.log("get chat with user", response);
      return response;
    } catch (exception) {
      throw exception;
    }
  }

  async createMessage(data) {
    console.log("data in post gaem plan", data);
    try {
      console.log("in post gaem plan data");
      let response = await this.postRequest("api/v1/messages", data, {
        auth: true,
      });

      console.log("resons g pl sevc", response);
      return response;
    } catch (exception) {
      throw exception;
    }
  }
}

const messagesSvc = new MessagesService();
export default messagesSvc;
