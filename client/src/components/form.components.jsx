import { Row, Col, Form, Button } from "react-bootstrap";
import { FaPaperPlane, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

export const ValidationMessage = ({ msg }) => {
  return (
    <>
      <Row>
        <Col sm={{ offset: 3, span: 6 }}>
          <small className="text-danger">
            <i>{msg}</i>
          </small>
        </Col>
      </Row>
    </>
  );
};

export const TextInput = ({
  label = "Email:",
  name = "email",
  type = "email",
  required = true,
  placeholder = "Enter Email",
  handleChange,
  msg = null,
}) => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">{label}</Form.Label>
        <Col sm={9}>
          <Form.Control
            size="sm"
            name={name}
            type={type}
            required
            placeholder={placeholder}
            onChange={handleChange}
          />
        </Col>
        <ValidationMessage msg={msg} />
      </Form.Group>
    </>
  );
};

export const PasswordInput = ({
  label = "Password",
  name = "password",
  pwd = "password",
  required = true,
  placeholder = "Enter Email",
  handleChange,
  msg = null,
  showHidePwd = { showHidePwd },
}) => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Form.Label className="col-sm-3">{label}</Form.Label>
        <Col sm={9}>
          <Form.Control
            size="sm"
            name="password"
            type={pwd}
            required={required}
            placeholder={placeholder}
            onChange={handleChange}
          />
        </Col>
        <Col sm={{ offset: 3, span: 6 }}>
          <span onClick={showHidePwd}>
            {pwd == "password" ? <FaEye /> : <FaEyeSlash />}
          </span>
        </Col>
        <ValidationMessage msg="" />
      </Form.Group>
    </>
  );
};

export const ButtonComponent = () => {
  return (
    <>
      <Form.Group className="row mb-3">
        <Col sm={{ span: 9, offset: 3 }}>
        <Button size="sm" variant="danger"  className="me-3" type="reset">
            <FaTrash />
            Cancel
          </Button>
          <Button size="sm" variant="success" className="me-3" type="submit">
            <FaPaperPlane />
            Submit
          </Button>
         
        </Col>
      </Form.Group>
    </>
  );
};
