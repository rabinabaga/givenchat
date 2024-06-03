import axiosInstance from "../../config/axios.config";
import HttpService from "../../service/http.service";

class AuthService extends HttpService{
    register = async (data)=>{
      try{
        let response = await this.postRequest("v1/auth/register",data,{
          files:true
          });
          return response;
          console.log("auth service response",response); 
      }catch(exception){
        // console.log("exception in auth service", exception);
        throw exception;

      }
    }

    tokenVerify = async (token) => {
        try{
            let response = await this.getRequest("v1/auth/verify-token/"+token);
            return response;
        }catch(exception){
            throw exception;
        }
    }


    passwordSet = async (token, data) => {
      try{
        let response = await this.postRequest("v1/auth/password-set/"+token,data);
        console.log("authsvc pwd set", response);
        return response;

      }catch(exception){
        throw exception;
      }
    }

    login = async (data) => {
      try{
          let response = await this.postRequest("api/v1/auth/login",data);
          
          return response;
      }catch(exception){
        throw exception;
      }
    }

    getLoggedInUser = async () => {
      try{
        console.log("get looged in ser");
        let response = await this.getRequest("api/v1/auth/me",null, {auth:true})
        return response
      }catch(exception){
        return exception.response;
      }
    }


}

const authSvc = new AuthService();
export default authSvc;