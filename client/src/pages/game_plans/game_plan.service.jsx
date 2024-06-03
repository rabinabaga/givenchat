import HttpService from "../../service/http.service";

class GamePlanService extends HttpService{
    async getAllGamePlans(){
        try{
            let response = await this.getRequest("api/v1/game_plan",null, {auth:true});
            console.log("resons g pl sevc", response);
            return response.result;
        }catch(exception){
            throw exception;
        }
    }

    async postGamePlan(data){
        console.log("data in post gaem plan", data);
        try{
            console.log("in post gaem plan data");
            let response = await this.postRequest("api/v1/game_plan",data, {auth:true});
            console.log("resons g pl sevc", response);
            return response.result;
        }catch(exception){
            throw exception;
        }
    }
}

const gamePlanSvc = new GamePlanService();
export default gamePlanSvc;