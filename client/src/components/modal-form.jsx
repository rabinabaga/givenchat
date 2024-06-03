import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import gamePlanSvc from "../pages/game_plans/game_plan.service";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
 
const  ModalForm = ({title,modalData={ id: "",game_plan_title:"",current_id:"", title: "",start_time:"", completed_time:"",status:"", steps:[{step_title:"",order_number:""}] }}) => {

  console.log("modal data in modal form", modalData);
  const [formInputs, setFormInputs] = useState({
    title: modalData.title,
    parent_game_plan:modalData.id,
    _id:modalData.current_id,
    status:modalData.status,
    steps: modalData.steps,
      start_time: modalData.start_time,
        completed_time: modalData.completed_time,
  
  });
  useEffect(()=>{
    formInputs.title = modalData.title;
    formInputs.id  = modalData.id;
  },[]);

  const handleAddInput = () => {
    setFormInputs({
      ...formInputs,
      steps: [...formInputs.steps, { step_title: "", order_number: "" }],
    });
  };

  const handleChange = (event, index) => {
    let { name, value } = event.target;

    let currentIndex = formInputs.steps.length - 1;
    let shallowFormInputs = { ...formInputs };
    shallowFormInputs.steps[currentIndex][name] = value;

    setFormInputs({ ...shallowFormInputs });
  };
  const handleTitleChange = (e)=>{
    let {name, value} = e.target;
    
    let shallowFormInputs = {...formInputs,title:value};
    setFormInputs(shallowFormInputs);
    console.log("handle title change",formInputs);

  }
  
  const handleStatusChange = (e)=>{
    let {name, value} = e.target;
    
    let shallowFormInputs = {...formInputs,status:value};
    setFormInputs(shallowFormInputs);
    console.log("handle status change",formInputs);

  }
  const handleStartTimeChange = (e) => {
    let { name, value } = e.target;

    let currentDate = new Date();
    let radioValue;
    if(value=="now"){
      radioValue = currentDate.toLocaleTimeString();
      console.log("am_pm value", radioValue); // 12:48:20 PM
    }else if(value=="remove"){
      radioValue=""
    }
  

    let shallowFormInputs = { ...formInputs, start_time: radioValue };
    setFormInputs(shallowFormInputs);
    console.log("handle start time change", formInputs);
  }
    const handleCompletedTimeChange = (e) => {
      let { name, value } = e.target;

      let currentDate = new Date();
      value = currentDate.toLocaleTimeString();
      console.log("am_pm value", value); // 12:48:20 PM

      let shallowFormInputs = { ...formInputs, completed_time: value };
      setFormInputs(shallowFormInputs);
      console.log("handle comp time change", formInputs);
    };


  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };
console.log("forminputs before handle save", formInputs);
  const handleSave = async () => {
  
    try {
      let gamePlanCreated = await gamePlanSvc.postGamePlan(formInputs);
      console.log("response upp", gamePlanCreated);
      if (gamePlanCreated) {
        console.log(gamePlanCreated);
       toast.success("game plan successfully saved")
        
        // setGamePlans(gamePlanCreated);
        // setLoading(false);
      }
    } catch (exception) {
      console.log("user profile page", exception);
    }
  };

  return (
    <>
      <h4>{title}</h4>
      <Container sm={{ offset: 2, span: 8 }}>
        <Form>
          <Form.Group>
            <Row>
              <Col sm={4}>
                <Form.Label>Your Game Title:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Control
                  name="title"
                  value={formInputs.title}
                  onChange={(event) => handleTitleChange(event)}
                  type="text"
                ></Form.Control>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col sm={4}>
                <Form.Label>Start Time:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Check
                  label="Now"
                  name="start_time"
                  type="radio"
                  value="now"
                  id={`inline-radio-1`}
                  onChange={(event) => {
                    handleStartTimeChange(event);
                  }}
                />
                <p>{formInputs.start_time}</p>
                <Form.Check
                  label="Remove"
                  name="start_time"
                  type="radio"
                  value="remove"
                  id={`inline-radio-1`}
                  onChange={(event) => {
                    handleStartTimeChange(event);
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col sm={4}>
                <Form.Label>Completed Time:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Check
                  label="Now"
                  name="completed_time"
                  type="radio"
                  value={formInputs.completed_time}
                  id={`inline-radio-2`}
                  onChange={(event) => {
                    handleCompletedTimeChange(event);
                  }}
                />
                <Form.Check
                  label="Remove"
                  name="completed_time"
                  type="radio"
                  value={formInputs.completed_time}
                  id={`inline-radio-2`}
                  onChange={(event) => {
                    let { name, value } = e.target;

                    let shallowFormInputs = {
                      ...formInputs,
                      completed_time: "",
                    };
                    setFormInputs(shallowFormInputs);
                  }}
                />
                <p>{formInputs.completed_time}</p>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row>
              <Col sm={4}>
                <Form.Label>Status:</Form.Label>
              </Col>
              <Col sm={8}>
                <Form.Select
                  name="status"
                  onChange={(event) => handleStatusChange(event)}
                >
                  <option value={formInputs.status}>{formInputs.status}</option>

                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          {formInputs.steps.map((item, index) => {
            return (
              <div key={index}>
                <hr />
                <Form.Group>
                  <Row>
                    <Col sm={4}>
                      <Form.Label>Order Number:</Form.Label>
                    </Col>
                    <Col sm={3}>
                      <Form.Control
                        name="order_number"
                        value={item.order_number}
                        onChange={(event) => handleChange(event, index)}
                        type="number"
                      ></Form.Control>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4}>
                      <Form.Label>Step Title:</Form.Label>
                    </Col>
                    <Col sm={6}>
                      <Form.Control
                        name="step_title"
                        value={item.step_title}
                        onChange={(event) => handleChange(event, index)}
                        type="text"
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
                {formInputs.steps.length > 1 && (
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteInput(index)}
                  >
                    Delete this step
                  </Button>
                )}
                {index === formInputs.steps.length - 1 && (
                  <Button variant="success" onClick={() => handleAddInput()}>
                    Add Step
                  </Button>
                )}
                <hr />
              </div>
            );
          })}
        </Form>

        <div className="body"> {JSON.stringify(formInputs.steps)} </div>

        <div className="body"> {JSON.stringify(formInputs.id)} </div>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Container>
    </>
  );
}

export default ModalForm;
