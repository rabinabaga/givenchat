const mongoose = require("mongoose")
const UserModel = require("../auth/user.model")


const stepSchema = new mongoose.Schema({
    step_title: String,
    order_number:{
        type: Number,
        required:false,
        default:0   
    }, 
    status:{
        type:String,
        enum:['untouched',"active","completed"],
        default:"untouched",
        required:true
    }
  });

const GamePlanSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        min: 2,
        max: 50
    },
    start_time:{
        type:String,
        required:false
    },completed_time:{
        type:String,
        required:false
    },
    steps: [stepSchema],
    status: {
        type: String, 
        required: true, 
        enum: ['untouched','active', 'completed'],
        default: "untouched"
    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }, 
   team_members:{
    type:[mongoose.Types.ObjectId],
    ref:"User",
    required:false
   },
   total_steps:{
    type:Number,
    min:1,
    required:false

   },
   parent_game_plan:{
    type:[mongoose.Types.ObjectId],
    ref:"GamePlan",
    required:false
   }
}, {
    timestamps: true, 
    autoIndex: true, 
    autoCreate: true, 
    // collection: "authUsers"
})

// users => authusers
const GamePlanModel = mongoose.model("GamePlan", GamePlanSchema)
module.exports = GamePlanModel;