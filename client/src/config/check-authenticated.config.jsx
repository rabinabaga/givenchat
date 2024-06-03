import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import authSvc from "../pages/auth/auth.service";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../reducers/user.reducer";

const CheckAuthenticated = ({ Component }) => {
  console.log("check authenticated");
  const dispatch = useDispatch();

  const [loading,setLoading] = useState(true);


  const getLoggedInUser =  async () => {

    try {
      let response = await authSvc.getLoggedInUser();
      console.log("check permission get loggedin user response", response);
      if (response) {
        dispatch(setLoggedInUser(response));
        setLoading(false);
     

        console.log("check per response before setloading false", response);

    
      } else {
        throw "User does not exist";
      }
    } catch (exception) {
      localStorage.removeItem("token");

      localStorage.removeItem("refreshToken");
      toast.error(exception);
    
    }
  };
  useEffect(() => {
    getLoggedInUser();
  }, []);
  if(loading) {
    return <>Loading...</>;
  }else{
    return Component
  }

};

export default CheckAuthenticated;
