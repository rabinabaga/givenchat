import { Button, useAccordionButton } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import socket from "../../config/socket.config";

const UserProfileLayout = () => {




  const loggedInUser = useSelector((root) => {
    console.log("in use selector in userp rofile page",root.User.loggedInUser);
    return root.User.loggedInUser
  })
    console.log("usr profie layout");
    return (<>
    <>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <NavLink className="navbar-brand ps-3" href="index.html">
          Start Bootstrap
        </NavLink>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
          id="sidebarToggle"
        >
          <i
            className="fas fa-bars"
            onClick={(e) => {
              e.preventDefault();
              document.body.classList.toggle("sb-sidenav-toggled");
            }}
          ></i>
        </button>
        <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search for..."
              aria-describedby="btnNavbarSearch"
            />
            <button
              className="btn btn-primary"
              id="btnNavbarSearch"
              type="button"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
          <li className="nav-item dropdown">
            <NavLink
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </NavLink>
            <ul
              className="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown"
            >
              <li>
                <NavLink className="dropdown-item" href="#!">
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink className="dropdown-item" href="#!">
                  Activity Log
                </NavLink>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <NavLink className="dropdown-item" href="#!">
                  Logout
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Core</div>
                <NavLink className="nav-link" href="index.html">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt"></i>
                  </div>
                  {loggedInUser?.name}
                 
                </NavLink>
                <div className="sb-sidenav-menu-heading">Interface</div>
                <NavLink
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts"
                  aria-expanded="false"
                  aria-controls="collapseLayouts"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  Layouts
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </NavLink>
                <div
                  className="collapse"
                  id="collapseLayouts"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <NavLink className="nav-link" href="layout-static.html">
                      Giventure,
                    </NavLink>
                    <NavLink
                      className="nav-link"
                      href="layout-sidenav-light.html"
                    >
                      Light Sidenav
                    </NavLink>
                  </nav>
                </div>
                <NavLink
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsePages"
                  aria-expanded="false"
                  aria-controls="collapsePages"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-book-open"></i>
                  </div>
                  Pages
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                  </div>
                </NavLink>
                <div
                  className="collapse"
                  id="collapsePages"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav
                    className="sb-sidenav-menu-nested nav accordion"
                    id="sidenavAccordionPages"
                  >
                    <NavLink
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesCollapseAuth"
                      aria-expanded="false"
                      aria-controls="pagesCollapseAuth"
                    >
                      Authentication
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </NavLink>
                    <div
                      className="collapse"
                      id="pagesCollapseAuth"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <NavLink className="nav-link" to="login.html">
                          Login
                        </NavLink>
                        <NavLink className="nav-link" href="register.html">
                          Register
                        </NavLink>
                        <NavLink className="nav-link" href="password.html">
                          Forgot Password
                        </NavLink>
                      </nav>
                    </div>
                    <NavLink
                      className="nav-link collapsed"
                      href="#"
                      data-bs-toggle="collapse"
                      data-bs-target="#pagesCollapseError"
                      aria-expanded="false"
                      aria-controls="pagesCollapseError"
                    >
                      Error
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </NavLink>
                    <div
                      className="collapse"
                      id="pagesCollapseError"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <NavLink className="nav-link" href="401.html">
                          401 Page
                        </NavLink>
                        <NavLink className="nav-link" href="404.html">
                          404 Page
                        </NavLink>
                        <NavLink className="nav-link" href="500.html">
                          500 Page
                        </NavLink>
                      </nav>
                    </div>
                  </nav>
                </div>
                <div className="sb-sidenav-menu-heading">Addons</div>
                <NavLink className="nav-link" href="charts.html">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-chart-area"></i>
                  </div>
                  Charts
                </NavLink>
                <NavLink className="nav-link" href="tables.html">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-table"></i>
                  </div>
                  Tables
                </NavLink>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              Start Bootstrap
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <main>
          <Button onClick={()=>{

socket.on("connect", (data) => {
  console.log("this is connection data",data);
})

socket.on("notify", (arg) => {
  console.log("insdie notiy listener");
  console.log(arg); // world
});

socket.emit("newmessage","I am sending you a message from cient, Mr.Server")
}}>SocketTest</Button>
            <div className="container-fluid px-4">
              <h1 className="mt-4">Your supported Adventures</h1>
              <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item">
                  <NavLink href="index.html">Dashboard</NavLink>
                </li>
                <li className="breadcrumb-item active">Your supported Adventures</li>
              </ol>
              {/* <div className="card mb-4">
                <div className="card-body">
              
                </div>
              </div> */}
              <div style={{ height: "100%" }}>
              <Outlet/>
              </div>
              <div className="card mb-4">
                <div className="card-body">
                  When scrolling, the navigation stays at the top of the page.
                  This is the end of the Giventure, Supported Adventure demo.
                </div>
              </div>
            </div>
          </main>
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">
                  Copyright &copy; Your Website 2023
                </div>
                <div>
                  <NavLink href="#">Privacy Policy</NavLink>
                  &middot;
                  <NavLink href="#">Terms &amp; Conditions</NavLink>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
   
    </>
  );
     

    </>)
}

export default UserProfileLayout;