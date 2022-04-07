import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import "./App.css";
import app from "./firebase.init";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState(""); //email string store kore
  const [password, setPassword] = useState("");
  // email set
  const handleEmailBlur = (event) => {
    setEmail(event.target.value);
  };

  //set password
  const handlePasswordBlur = (event) => {
    setPassword(event.target.value);
  };

  //get submit value
  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    //get user data
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });

    event.preventDefault();
  };

  return (
    <div>
      <div className="registration w-50 mx-auto mt-5">
        <h2 className="text-primary">Please Register !!! </h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handleEmailBlur}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePasswordBlur}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
