import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import gamePlanSvc from "./game_plans/game_plan.service";
import { Button, Col, Row, Container, Modal } from "react-bootstrap";
import ModalForm from "../components/modal-form";
import { FaCheck, FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const [show, setShow] = useState(false);
  const loggedInUser = useSelector((root) => {
    console.log("in use selector in userp rofile page",root.User.loggedInUser);
    return root.User.loggedInUser
  })
  const [showUpdate, setShowUpdate] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showAsNewPlan, setShowAsNewPlan] = useState(false);
  const [modalData, setModalData] = useState({ id: "",title:"",current_id:"",status:"",start_time:"", completed_time:"", steps:[{step_title:"",order_number:""}] });
  const [gamePlans, setGamePlans] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const getAllGamePlans = async () => {
    try {
      let gamePlansFetched = await gamePlanSvc.getAllGamePlans();
      console.log("response upp", gamePlans);
      if (gamePlansFetched) {
        setGamePlans(gamePlansFetched);
        setLoading(false);
      }
    } catch (exception) {
      console.log("user profile page", exception);
    }
  };

  const handleShow = () => {
    setShow(true);
  };
  const handleShowUpdate = () => {
    setShowUpdate(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseAsNewPlan = () => {
    setShowAsNewPlan(false);
  };
  const handleCloseShowUpdate = () => {
    setShowUpdate(false);
  }
   const handleUpdateShow = (event, gamePlanIndex) => {
    console.log("game plan index", gamePlanIndex);
    setShowUpdate(true);
    let newModalData = { ...modalData };
    newModalData.current_id = gamePlans[gamePlanIndex]._id;
    newModalData.title = gamePlans[gamePlanIndex].title;
    newModalData.status = gamePlans[gamePlanIndex].status;
    newModalData.steps = gamePlans[gamePlanIndex].steps
      newModalData.start_time = gamePlans[gamePlanIndex].start_time;

      newModalData.completed_time = gamePlans[gamePlanIndex].completed_time;
      //this itself is stored in id field
    newModalData.id = gamePlans[gamePlanIndex].parent_game_plan?._id   
    setModalData(newModalData);
  }

  console.log("update set modal data", modalData)
  const handleMarkComplete = async (event, gamePlanIndex) => {
    console.log("game plan mark as complete", gamePlans[gamePlanIndex]);

    try {
      let gamePlanCreated = await gamePlanSvc.postGamePlan(
        gamePlans[gamePlanIndex]
      );
      console.log("response upp", gamePlanCreated);
      if (gamePlanCreated) {
        console.log(gamePlanCreated);
        setCompleted(true);
        toast.success("game plan marked as completed");
        // setCompleted(false);

        // setGamePlans(gamePlanCreated);
        // setLoading(false);
      }
    } catch (exception) {
      console.log("user profile page", exception);
    }
  };
  const handleStartAsNewGamePlan = (event, index, gamePlanIndex) => {
    console.log("test indes", index);
    console.log("test gamePlans", gamePlans[index]);

    setShowAsNewPlan(true);
    let newModalData = { ...modalData };
    newModalData.title = gamePlans[gamePlanIndex].steps[index]["step_title"];
    newModalData.id = gamePlans[gamePlanIndex]._id;
    setModalData(newModalData);
  };
    
  // let gamePlanMapped = gamePlans.map((gamePlan,gamePlanIndex)=>{
  //   if(gamePlan.status==="untouched"){
  //     return(
  //       <> <h1>{gamePlan.title}</h1> </>
  //     )
  //     }
  // })
  let gamePlanMappedCompleted = gamePlans.map((gamePlan,gamePlanIndex)=>{
    if(gamePlan.status==="completed"){
      return (
        <div className="card mb-4" key={gamePlan._id}>
          <Row className="my-4">
            <Col sm={7}>
              <b
                style={{
                  fontWeight: "900",
                  fontSize: "1.5rem",
                  fontFamily: "Helvetica",
                }}
              >
                {" "}
                {gamePlan.title}
              </b>
            </Col>

            <Col>
              <Button
                className="me-2"
                variant="warning"
                onClick={(event) => handleUpdateShow(event, gamePlanIndex)}
              >
                Update <FaEdit />
              </Button>
              {gamePlan.status === "completed" ? (
                <Button variant="success">
                  Completed <FaCheck />
                </Button>
              ) : (
                <Button
                  variant="dark"
                  onClick={(event) => handleMarkComplete(event, gamePlanIndex)}
                >
                  Mark as Completed
                </Button>
              )}
            </Col>
          </Row>
          <hr />
          {gamePlan.steps.map((step, index) => (
            <Row sm={{ offset: 1, span: 11 }} className="mb-4" key={step._id}>
              <Col sm={7}>
                <div>
                  {step.order_number} {step.step_title}
                </div>
              </Col>
              <Col sm={4}>
                <Button
                  variant="primary"
                  onClick={(event) =>
                    handleStartAsNewGamePlan(event, index, gamePlanIndex)
                  }
                >
                  Start as a new Game Plan
                </Button>
              </Col>
            </Row>
          ))}
        </div>
      );
    }
  })
   let gamePlanMappedUntouched = gamePlans.map((gamePlan, gamePlanIndex) => {
     if (gamePlan.status === "untouched") {
       return (
         <div className="card mb-4" key={gamePlan._id}>
           <Row className="my-4">
             <Col sm={7}>
               <b
                 style={{
                   fontWeight: "900",
                   fontSize: "1.5rem",
                   fontFamily: "Helvetica",
                 }}
               >
                 {" "}
                 {gamePlan.title}
               </b>
             </Col>

             <Col>
               <Button
                 className="me-2"
                 variant="warning"
                 onClick={(event) => handleUpdateShow(event, gamePlanIndex)}
               >
                 Update <FaEdit />
               </Button>
               {gamePlan.status === "completed" ? (
                 <Button variant="success">
                   Completed <FaCheck />
                 </Button>
               ) : (
                 <Button
                   variant="dark"
                   onClick={(event) => handleMarkComplete(event, gamePlanIndex)}
                 >
                   Mark as Completed
                 </Button>
               )}
             </Col>
           </Row>
           <hr />
           {gamePlan.steps.map((step, index) => (
             <Row sm={{ offset: 1, span: 11 }} className="mb-4" key={step._id}>
               <Col sm={7}>
                 <div>
                   {step.order_number} {step.step_title}
                 </div>
               </Col>
               <Col sm={4}>
                 <Button
                   variant="primary"
                   onClick={(event) =>
                     handleStartAsNewGamePlan(event, index, gamePlanIndex)
                   }
                 >
                   Start as a new Game Plan
                 </Button>
               </Col>
             </Row>
           ))}
         </div>
       );
     }
   });
    let gamePlanMappedActive = gamePlans.map((gamePlan, gamePlanIndex) => {
      if (gamePlan.status === "active") {
        return (
          <div className="card mb-4" key={gamePlan._id}>
            <Row className="my-4">
              <Col sm={7}>
                <li style={{ listStyle: "none" }} key={gamePlan._id}>
                  <b style={{fontWeight:"900", fontSize:"1.5rem", fontFamily:"Helvetica"}}> {gamePlan.title}</b>
                </li>
              </Col>

              <Col>
                <Button
                  className="me-2"
                  variant="warning"
                  onClick={(event) => handleUpdateShow(event, gamePlanIndex)}
                >
                  Update <FaEdit />
                </Button>
                {gamePlan.status === "completed" ? (
                  <Button variant="success">
                    Completed <FaCheck />
                  </Button>
                ) : (
                  <Button
                    variant="dark"
                    onClick={(event) =>
                      handleMarkComplete(event, gamePlanIndex)
                    }
                  >
                    Mark as Completed
                  </Button>
                )}
              </Col>
            </Row>
            <hr />
            {gamePlan.steps.map((step, index) => (
              <Row sm={{ offset: 1, span: 11 }} className="mb-4" key={step._id}>
                <Col sm={7}>
                  <div>
                    {step.order_number} {step.step_title}
                  </div>
                </Col>
                <Col sm={4}>
                  <Button
                    variant="primary"
                    onClick={(event) =>
                      handleStartAsNewGamePlan(event, index, gamePlanIndex)
                    }
                  >
                    Start as a new Game Plan
                  </Button>
                </Col>
              </Row>
            ))}
          </div>
        );
      }
    });
  console.log("game plan completed or not", completed);
  console.log("");
  console.log("setting game plan to create modal data id and title", modalData);
  useEffect(() => {
    getAllGamePlans();
    setCompleted(false);
  }, [completed]);
  if (loading) {
    return <>Loading</>;
  } else {
    return (
      <>
        <Button className="mb-4" variant="primary" onClick={handleShow}>
          Add Brand New Game Plan{" "}
        </Button>
        <Button className="mb-4 mx-3" onClick={() => navigate("/chat")}>
          Chat
        </Button>
        <Modal show={showAsNewPlan} onHide={handleCloseAsNewPlan}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <ModalForm title="New Game Plan" modalData={modalData}></ModalForm>
          </Modal.Body>
        </Modal>
        <Modal show={showUpdate} onHide={handleCloseShowUpdate}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <ModalForm title="New Game Plan" modalData={modalData}></ModalForm>
          </Modal.Body>
        </Modal>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <ModalForm
              title="New 
            Game Plan"
            ></ModalForm>
          </Modal.Body>
        </Modal>
        <div class="m-4">
          <ul class="nav nav-tabs" id="myTab">
            <li class="nav-item">
              <a href="#active" class="nav-link active" data-bs-toggle="tab">
                Active
              </a>
            </li>
            <li class="nav-item">
              <a href="#untouched" class="nav-link" data-bs-toggle="tab">
                Untouched
              </a>
            </li>
            <li class="nav-item">
              <a href="#completed" class="nav-link" data-bs-toggle="tab">
                Completed
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade show active" id="active">
              {gamePlanMappedActive}
            </div>
            <div class="tab-pane fade" id="untouched">
              {gamePlanMappedUntouched}
            </div>
            <div class="tab-pane fade" id="completed">
              {gamePlanMappedCompleted}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default UserProfilePage;
