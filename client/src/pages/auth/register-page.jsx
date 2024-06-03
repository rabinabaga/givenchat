import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Heading4 } from "../../components/heading.component";
import { useForm } from "react-hook-form";
import {  toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import {
  ButtonComponent,
  TextInput,
  ValidationMessage,
  PasswordInput,
} from "../../components/form.components";
import * as Yup from "yup";

import { NavLink } from "react-router-dom";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import authSvc from "./auth.service";

const RegisterPage = () => {
  console.log("register page");
  const navigate = useNavigate();
  const registerSchema = Yup.object({
    name: Yup.string().required().min(2).max(50),
    email: Yup.string().email().required(),

    phone: Yup.string(),

    address: Yup.object({
      shippingAddress: Yup.string().required(),
      billingAddress: Yup.string().required(),
    }),

    // role: Yup.string()
    //   .matches(/admin|regular_user/)
    //   .required(),
  });



  let [credentials, setCredentials] = useState();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const handleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      let ext = file.name.split(".").pop();
      let allowed = ["jpg", "jpeg", "png", "webp", "svg"];
      if (allowed.includes(ext.toLowerCase())) {
        //valid handle
        setValue("image", file);
      } else {
        setError("image", {
          message: "Invalid file format",
        });
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      let apiData = await authSvc.register(data);
      toast.success("Your account has been registered, please check your email to activate your account.", {theme:"colored"})
      console.log("apiData", { apiData });
      navigate("/")
    } catch (exception) {
      //interceptor bata throw gareko yaha aauncha
      // console.log("exception of axios instance",exception);
      if (exception?.msg) {
        console.log("exception",exception);
        toast.error(exception.msg);
        (Object.keys(exception.msg)
        ).map((field)=>{
           setError(field,{message: exception.msg[field]
          })})
      }
    }
  };




  const handleChange = (e) => {
    let { name, value } = e.target;
    console.log({ name, value });
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <>
      <Container className="bg-body-secondary my-3">
        <Row className="py-3">
          <Col>
            <Heading4
              data={"Register Page"}
              classname={"text-center"}
            ></Heading4>
          </Col>
        </Row>
        <hr />
        <Row className="py-3">
          <Col sm={{ offset: 2, span: 8 }}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Name:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    {...register("name", { required: true })}
                    type="text"
                    placeholder="Enter your name"
                    // onChange={handleChange}
                  />
                </Col>
                <ValidationMessage
                  msg={errors["name"] ? "Name is required" : ""}
                />
              </Form.Group>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Email:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="Enter your email"
                    // onChange={handleChange}
                  />
                </Col>
                <ValidationMessage
                  msg={errors["name"] ? "Email is required" : ""}
                />
              </Form.Group>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Phone:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    {...register("phone", { required: true })}
                    type="number"
                    placeholder="Enter your phone number"
                    // onChange={handleChange}
                  />
                </Col>
                <ValidationMessage
                  msg={errors["phone"] ? errors["phone"].message : ""}
                />
              </Form.Group>
              {/* 
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    {...register("password", { required: true })}
                    size="sm"
                    type={pwd}
                    placeholder="Enter your password"
                  />
                </Col>
                <Col sm={{ offset: 3, span: 6 }}>
                  <span onClick={showHidePwd}>
                    {pwd == "password" ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </Col>
                <ValidationMessage
                  msg={errors["password"] ? "Password is required" : ""}
                />
              </Form.Group> */}
              {/* 
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Re-type Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    {...register("confirmpassword", { required: true })}
                    size="sm"
                    type={retypePwd}
                    placeholder="Enter your password again"
                  />
                </Col>
                <Col sm={{ offset: 3, span: 6 }}>
                  <span onClick={showHideRetypePwd}>
                    {retypePwd == "password" ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </Col>
                <ValidationMessage
                  msg={
                    errors["confirmpassword"]
                      ? "Confirming password is required"
                      : ""
                  }
                />
              </Form.Group> */}

              {/* <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Role:</Form.Label>
                <Col sm={9}>
                  <Form.Select
                    {...register("role", { required: true })}
                    size="sm"
                  >
                    <option value="">--Select any one--</option>
                    <option value="seller">Seller</option>
                    <option value="customer">Customer</option>

                    <option value="admin">Admin</option>
                  </Form.Select>
                </Col>
                <ValidationMessage
                  msg={errors["role"] ? "Role is required" : ""}
                />
              </Form.Group> */}

              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Address(Billing):</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as={"textarea"}
                    size="sm"
                    {...register("address.billingAddress", { required: true })}
                    placeholder="Enter Billing Address"
                    // onChange={handleChange}
                    rows={5}
                    style={{ resize: "none" }}
                  />
                </Col>
                <ValidationMessage
                  msg={
                    errors["address.billingAddress"]
                      ? "Billing Address is required"
                      : ""
                  }
                />
              </Form.Group>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">Address(Shipping):</Form.Label>
                <Col sm={9}>
                  <Form.Control
                    as={"textarea"}
                    size="sm"
                    {...register("address.shippingAddress", { required: true })}
                    placeholder="Enter Shipping Address"
                    // onChange={handleChange}
                    rows={5}
                    style={{ resize: "none" }}
                  />
                </Col>
                <ValidationMessage
                  msg={
                    errors["address.shippingAddress"]
                      ? "Shipping Address is required"
                      : ""
                  }
                />
              </Form.Group>
              <Form.Group className="row mb-3">
                <Form.Label className="col-sm-3">
                  Profile Image{" "}
                  <small>
                    <i>
                      <sub>(Only image type)</sub>
                    </i>
                  </small>
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    size="sm"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImage}
                  ></Form.Control>
                </Col>
                <ValidationMessage
                  msg={errors["image"] ? errors["image"].message : ""}
                />
              </Form.Group>

              <ButtonComponent />
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterPage;
