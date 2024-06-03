import HttpService from "../../service/http.service";

class ChatService extends HttpService {
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
  async fetchChats() {
    try {
      let response = await this.getRequest(
        `api/v1/chat/`,
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

    async createGroup(data) {
      console.log("data in post gaem plan", data);
      try {
        console.log("in post gaem plan data");
        let response = await this.postRequest("api/v1/chat/group", data, {
          auth: true,
        });

        console.log("resons g pl sevc", response);
        return response;
      } catch (exception) {
        throw exception;
      }
    }
}

const chatSvc = new ChatService();
export default chatSvc;
