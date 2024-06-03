import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Heading4 } from "../../components/heading.component";
import {
  ButtonComponent,
  PasswordInput,
  TextInput,
  ValidationMessage,
} from "../../components/form.components";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authSvc from "./auth.service";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../reducers/user.reducer";

const LoginPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let [credentials, setCredentials] = useState();
  let [pwd, setPwd] = useState("password");
  console.log(credentials);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handle submit");
    try {
      console.log("credentials", credentials);
      // let response = await axios.post('/api/v1/auth/login',{name:"rabina baga", password:"qwertyiop"});
      let response = await authSvc.login(credentials);

      if (response) {
        let username = response.result.user.username;
        localStorage.setItem("access_token", response.result.accessToken);
        // localStorage.setItem('refreshtoken', response.data.refreshToken);
        // console.log("access token",response.data.accessToken);
        // localStorage.setItem('refreshtoken', response.data.refreshToken);
        // localStorage.setItem('user', JSON.stringify(response.result.user));
        dispatch(setLoggedInUser(response.result.user));
        // console.log(response.result.user.role);
        toast.success("login successful");

        navigate("/" + username);
      }
    } catch (exception) {
      console.log("exception", exception);
      navigate("/");
      toast.error(exception);
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const showHidePwd = (e) => {
    pwd = pwd === "password" ? "text" : "password";
    setPwd(pwd);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (token && user) {
      user = JSON.parse(user);
      toast.info("You are already logged in");
      navigate("/" + user.role);
    }
  }, []);

  return (
    <>
      <Container className="bg-body-secondary my-3">
        <Row className="py-3">
          <Col>
            <Heading4 data={"Login Page"} classname={"text-center"}></Heading4>
          </Col>
        </Row>
        <hr />
        <Row className="py-3">
          <Col sm={{ offset: 2, span: 8 }}>
            <Form onSubmit={handleSubmit}>
              <TextInput
                label="Email:"
                name="email"
                type="email"
                required="true"
                placeholder="Enter your email"
                handleChange={handleChange}
                msg=""
              />
              <PasswordInput
                label="Password"
                name="password"
                pwd={pwd}
                required={true}
                placeholder="Enter password"
                handleChange={handleChange}
                showHidePwd={showHidePwd}
                msg=""
              />

              <ButtonComponent />
            </Form>
          </Col>
        </Row>
        <Row>
          <Col sm={{ offset: 3, span: 6 }}>
            {" "}
            Or &nbsp;
            <NavLink to={"/register"}>Create a new account !</NavLink>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginPage;
