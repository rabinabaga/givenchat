import { useEffect } from "react";
import SimpleSlider from "../components/react-slick";
import "./homepage.modules.css"
import {useDispatch, useSelector} from "react-redux"
import { hello } from "../reducers/user.reducer";


const HomePage = () => {
  const dispatch = useDispatch();

  const user = useSelector((root) => {
    return root.User;
    //return root.User.loggedInUser
    //loggedInUser.name
  })

  console.log(user);
  useEffect(()=>{
    dispatch(hello("hello there"))
  },[])

  return (
    <>
      <SimpleSlider/>
   
    </>
  );
};

export default HomePage;
