// import "./landing-page.modules.css";
import { useState, useEffect } from "react";
import { Container, Form, FormControl, Button, Image } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import "./landing.page.scss"

const HeaderComponent = ({ title }) => {
  // const dispatch = useDispatch();
  // dispatch(setLoggedInUser(response.result.user))
  const loggedInUser = useSelector((root) => {
    console.log("in use selector in userp rofile page",root.User.loggedInUser);
    return root.User.loggedInUser
  })
  // let loggedInUser = localStorage.getItem("user")?? null;
  let token = localStorage.getItem("token")?? null;
  const navigate = useNavigate();
  
  console.log("loggedin user",loggedInUser);
  console.log("logged in token", token);
  //TODO: Redux Implement
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid className="logo-opaline">
          <Navbar.Brand href="#home">
            <Image
              className="logo"
              src="https://opalinetech.com.au/wp-content/themes/feel-the-luxury/assets/images/logos/opaline-active-logo.svg"
              style={{ width: "150px" }}
              alt="logo-opaline"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav >
              <NavLink className={"nav-link"} to="/">
                Home
              </NavLink>
              <NavLink className={"nav-link"} to="/todos">
                Todos
              </NavLink>
              {loggedInUser?<>
                <NavLink className={"nav-link"} to={'/'+loggedInUser.username}>
                {loggedInUser["name"]}
              </NavLink>
              <NavLink className={"nav-link"} to="/logout">
               <button style={{backgroundColor:"#832ACC", border:"none"}} onClick={(e)=>{e.preventDefault();localStorage.clear();
                navigate("/")}}>Logout</button>
              </NavLink>
                </>:
                <>
                <NavLink className={"nav-link"} to="/login">
                Login
              </NavLink>
              <NavLink className={"nav-link"} to="/register">
                Register
              </NavLink></>
              }
            </Nav>
          </Navbar.Collapse>
          <Form className="d-flex">
            <FormControl className="me-2" placeholder="Search" />
            <Button className="btn-outline" variant="dark" type="submit">
              <FaSearch />
            </Button>
          </Form>
        </Container>
      </Navbar>

      {/* <Container>
    <Row>
        <Col></Col>
    </Row>
</Container> */}
    </>
  );
};
export default HeaderComponent;
