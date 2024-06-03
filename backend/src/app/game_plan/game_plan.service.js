const GamePlanModel = require("./game_plan.model");

class GamePlanService {
  async createGamePlan(req) {
    console.log("req body in game plan service", req.body);
  
    let response;
    let status;
    if(req.body._id){
      // console.log("inside req body with _id");
      status=req.body.status;
      try {
         response = await GamePlanModel.findByIdAndUpdate(
          { _id: req.body._id },
          {
            status:status,
            steps:req.body.steps,
            start_time: req.body.start_time,
            completed_time:req.body.completed_time
          },{new:true}
        );
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    }else{
      let new_game_plan;
      status="untouched";
      console.log("inside req body with _id");
      if(req.body.parent_game_plan){
        const gamePlanFromDb = await GamePlanModel.findOne({ _id: req.body.parent_game_plan });
         new_game_plan = new GamePlanModel({
          title: req.body.title,
          steps: req.body.steps,
          createdBy: req.authUser,
          status:status,
          parent_game_plan:gamePlanFromDb,
          total_steps:req.body.steps.length
        });
      }else{
        new_game_plan = new GamePlanModel({
          title: req.body.title,
          steps: req.body.steps,
          createdBy: req.authUser,
          status:status,
          total_steps:req.body.steps.length
        });
      }
    

      try {
        response = await new_game_plan.save();
      
      } catch (exception) {
        console.log("exception", exception);
        throw exception;
      }
    }
 
 

    return response;
  }
  totalCount = async(filter={}) =>{
    return GamePlanModel.countDocuments(filter);
  }

  listAllGamePlans = async (filter = {}, paging = { skip: 0, limit: 8 }) => {
    try {
      const game_plans = await GamePlanModel.find(filter)
        .populate("createdBy",["_id", "name", "email", "role","phone"])
        .populate("parent_game_plan")
        .sort({ createdAt: "asc" })
        .skip(paging.skip)
        .limit(paging.limit);
        
      return game_plans;
    } catch (exception) {
      throw exception;
    }
  };
}

const gamePlanSvc = new GamePlanService();
module.exports = gamePlanSvc;
