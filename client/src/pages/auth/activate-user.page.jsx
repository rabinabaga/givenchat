import { useEffect, useState } from "react";
import Heading4 from "../../components/heading.component";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import authSvc from "./auth.service";
import {
  PasswordInput,
  ButtonComponent,
} from "../../components/form.components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ActivateUserPage = () => {
  let param = useParams();
  let navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [pwd, setPwd] = useState("password");
  let [retypePwd, setretypePwd] = useState("password");

  let {
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      Yup.object({
        password: Yup.string().matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain one small letter, one capital letter, one number and one special character"
        ),
        confirmpassword: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Password do not match"
        ),
      })
    ),
  });

  const verifyToken = async () => {
    //api call
    try {
      let verificationData = await authSvc.tokenVerify(param.token);
      setLoading(false);
    } catch (exception) {
      toast.warn("token couldnot be verified");
      navigate("/");
    }
  };
  const showHidePwd = (e) => {
    pwd = pwd === "password" ? "text" : "password";
    setPwd(pwd);
  };

  const showHideRetypePwd = (e) => {
    retypePwd = retypePwd === "password" ? "text" : "password";
    setretypePwd(pwd);
  };
  const onSubmit = async(data) => {
    console.log("data",data);
    try{
      let response = await authSvc.passwordSet(param.token, {
        "password":"admin1234",
        "confirmPassword": "admin1234"
    });
      console.log("response recieived on on submit",response);
      toast.success("Password set successfully");
      navigate("/login");
    }catch(exception){
      toast.warn("error while setting password")
    }
   
  }

  useEffect(() => {
    //api axios
    verifyToken();
  }, []);


  return (
    <>
      <Container className="my-5 bg-light">
        <Row className="p-3">
          <Col>
            {loading ? (
              <Heading4 data={"loading...."} />
            ) : (
              <>
                <Heading4 data={"Set Password"} classname={"text-center"} />

                <hr />
                <Row className="p-3">
                  <Col sm={{ offset: 3, span: 6 }}>
                    

                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <PasswordInput
                        label="Password"
                        name="password"
                        pwd={pwd}
                        required={true}
                        placeholder="Enter Password"
                        handleChange={(e) => {
                          console.log(e.target.value);
                          setValue("password", e.target.value);
                        }}
                        msg={errors?.password?.message}
                        showHidePwd={showHidePwd}
                      ></PasswordInput>
                      <PasswordInput
                        label="Re-Password"
                        name="confirmpassword"
                        pwd={retypePwd}
                        required={true}
                        placeholder="Re-Enter Password"
                        handleChange={(e) => {
                          setValue("confirmpassword", e.target.value);
                        }}
                        msg={errors?.confirmpassword?.message}
                        showHidePwd={showHideRetypePwd}
                      ></PasswordInput>
                      <ButtonComponent />
                    </Form>
                  </Col>
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ActivateUserPage;
