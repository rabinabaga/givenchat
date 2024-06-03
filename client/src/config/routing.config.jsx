import {
  BrowserRouter,
  Routes,
  Route,
  useSearchParams,
} from "react-router-dom";
import HomePage from "../pages/homepage";
import MasterLayout from "../pages/layout/master-layout";
import AdminLayout from "../pages/layout/admin-layout";
import Error404 from "../pages/error-404";
import Todos from "../pages/todos";
import LoginPage from "../pages/auth/login-page";
import RegisterPage from "../pages/auth/register-page";
import { ToastContainer } from "react-toastify";
import ActivateUserPage from "../pages/auth/activate-user.page";
import AdminPage from "../pages/admin/admin.page";
import UserProfileLayout from "../pages/layout/user-profile-layout";
import UserProfilePage from "../pages/user_profile.page";
import CheckPermission from "./check-permission.config";
import CheckAuthenticated from "./check-authenticated.config";
import { useSelector } from "react-redux";
import {ChatPage} from "../pages/chat-page";
import ChatLayout from "../pages/layout/chat-layout";

const RoutingComponent = () => {
  
  // let profile_username = localStorage.getItem("user").username;
  // console.log(localStorage.getItem("user"));
  // const dispatch = useDispatch();
  // dispatch(setLoggedInUser(response.result.user))
//   const profile_username = useSelector((root) => {
//     console.log("in use selector in userp rofile page", root.User.loggedInUser);
//     return root.User.loggedInUser?.username;
//   });
  return (
    
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route
            path="/:profile_username"
            element={<CheckAuthenticated Component={<><UserProfileLayout/></>} />}
          >
            <Route index element={<UserProfilePage />}></Route>
          </Route>
          <Route
            path="/chat"
            element={<CheckAuthenticated Component={<><ChatLayout/></>} />}
          >
            <Route index element={<ChatPage />}></Route>
          </Route>
          <Route path="/" element={<MasterLayout></MasterLayout>}>
            <Route index element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route
              path="/activate/:token"
              element={<ActivateUserPage />}
            ></Route>
            <Route path="/todos" element={<Todos />}></Route>
            <Route path="*" element={<Error404 />}></Route>
          </Route>
          {/* <Route path="/admin" element={<CheckPermission role="admin" Component={<AdminLayout/>}/>}> */}
          {/* <Route path="admin" element={<CheckPermission role="admin" Component={<AdminLayout/>}/>}>
                        <Route index element={<AdminPage/>}></Route>
                    </Route> */}
          {/* <Route path="/admin" element={<h1>admin page</h1>}> */}

          {/* </Route> */}

          {/* <Route path="/user/:profile_username" element={<UserProfileLayout/>}>
                        <Route index element={<UserProfilePage/>}></Route>
                    </Route>
                     */}
          {/* <Route path="/:profile_username" element={<UserProfileLayout/>}>
                        <Route index element={<UserProfilePage/>}></Route>
                    </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default RoutingComponent;
