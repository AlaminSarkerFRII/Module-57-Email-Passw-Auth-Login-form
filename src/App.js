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
  const [error, setError] = useState();
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
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    //password validation ..

    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      setError("password should contain at least one special character"); //jodi special chart. eta na hoy
      return;
    }
    setValidated(true);

    setError(""); // jodi error na thake

    //get user data
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
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
          <p className="text-danger">{error}</p>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
