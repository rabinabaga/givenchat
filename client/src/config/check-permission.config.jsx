import { useEffect, useState } from "react";
import authSvc from "../pages/auth/auth.service";
import { useNavigate } from "react-router-dom";
// import { Toast } from "react-bootstrap";
import {toast} from "react-toastify";

const CheckPermission =  ({role, Component}) => {

    let [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    const getLoggedInUser = async() => {
        try{
          
            let response = await authSvc.getLoggedInUser();
            console.log("check permission get loggedin user response", response);
            if(response){
                console.log("check per response before setloading false", response);
                if(response.role==='admin'){
                    console.log("check if admin", response.role);
                    setLoading(false);
                }else{
                    toast.error("You do not have permission to access this page");
                    navigate("/"+response.role);
                }
            }else{
                throw "User does not exist"
            }
        }catch(exception){
            localStorage.removeItem("token");

            localStorage.removeItem("refreshToken");
            toast.error("Token Error");
            navigate('/login');
        }
    }

    useEffect(() => {

        getLoggedInUser()
    },[])
    if(loading){
        return <>Loading...</>
    }else{
        return  Component
        // return <>Welcome Admin</>
      
    }
   
}

export default CheckPermission;