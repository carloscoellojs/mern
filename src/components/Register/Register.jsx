import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// using our component for building inputs
import { Input } from "../Input/Input";
// using our label component for building our labels
import { Label } from "../Label/Label";
// using our stateles component for building alert messages
import { AlertMessage } from "../Alert/AlertMessage";
// connecting react with redux so they can communicate
import { useSelector, useDispatch } from "react-redux";
// using our registerUser method for dispatching action
import { registerUserAction } from "../../actions/userActions";
// using our common js object for accessing properties and methods
import common from "../../lib/common";
import {
  INITIAL_REGISTER_FORM_ERRORS_STATE,
  INITIAL_REGISTER_FORM_STATE,
  INPUT_EMAIL_ERROR_MESSAGE,
  INPUT_NAME_ERROR_MESSAGE,
  INPUT_PASSWORD_ERROR_MESSAGE,
  REGEX_VALID_EMAIL,
  REGEX_VALID_PASSWORD
} from "../../lib/constants";
import { Form } from "../Form/Form";
import { PageHeader } from "../PageHeader/PageHeader";
import { selectRegister } from "../../lib/selectors";
import { Button } from "../Button/Button";

// component that represents our register page
const Register = () => {
  const register = useSelector(selectRegister);
  const [registerForm, setRegisterForm] = useState(INITIAL_REGISTER_FORM_STATE);
  const [registerFormErrors, setRegisterFormErrors] = useState(INITIAL_REGISTER_FORM_ERRORS_STATE);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fetching, setFetching] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  useEffect(() => {
    const isLoggedIn = common.isLoggedIn();
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  useEffect(() => {
    if(fetching){
      if(register.success){
        registrationSuccess();
      }
      if(!register.success){
        setFetching(false);
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
        }, 4000)
      }
    }
  }, [register.attempt]);

  // updating state, redirecting
  const registrationSuccess = () => {
    setFetching(false);
    setShowAlertMessage(true);
    setTimeout(() => {
      setRegisterForm(INITIAL_REGISTER_FORM_STATE);
      setRegisterFormErrors(INITIAL_REGISTER_FORM_ERRORS_STATE);
      setShowAlertMessage(false);
      navigate("/login");
    }, 2000)
  };

  // on a specific input change please verify and update form errors and state input value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        let nameError = value.length && value.length < 5 ? INPUT_NAME_ERROR_MESSAGE : "";
        setRegisterForm({ ...registerForm, [name]: value });
        setRegisterFormErrors({ ...registerFormErrors, nameError });
        break;
      case "email":
        let emailError =
          value.length && !REGEX_VALID_EMAIL.test(value)
            ? INPUT_EMAIL_ERROR_MESSAGE
            : "";
        setRegisterForm({ ...registerForm, [name]: value });
        setRegisterFormErrors({ ...registerFormErrors, emailError });
        break;
      case "password":
        let passwordError =
          value.length && !REGEX_VALID_PASSWORD.test(value)
            ? INPUT_PASSWORD_ERROR_MESSAGE
            : "";
        setRegisterForm({ ...registerForm, [name]: value });
        setRegisterFormErrors({ ...registerFormErrors, passwordError });
        break;
      default:
        break;
    }
  };

  // this method submits the form input values to the redux action method fetchUser
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = registerForm;
    setFetching(true);
    dispatch(registerUserAction(name, email, password));
  };

  return (
    <div className="register-container">
      <div className="my-5">
        <PageHeader>
          <h2>Create an account</h2>
        </PageHeader>
      </div>
      <AlertMessage success={register.success} message={register.message} showAlert={showAlertMessage} />
      <Form className="needs-validation" onSubmit={handleFormSubmit}>
        <div className="form-field-group">
          <div className="form-field-label-container">
            <Label name="name:" />
          </div>
          <div className="form-field-input-container">
            <Input
              type="text"
              className="input-field"
              name="name"
              onChange={handleInputChange}
              errorMessage={registerFormErrors.nameError}
              value={registerForm.name}
              placeholder="type in your name"
            />
          </div>
        </div>
        <div className="form-field-group">
          <div className="form-field-label-container">
            <Label name="email:" />
          </div>
          <div className="form-field-input-container">
            <Input
              type="email"
              className="input-field"
              name="email"
              onChange={handleInputChange}
              errorMessage={registerFormErrors.emailError}
              value={registerForm.email}
              placeholder="type in your email"
            />
          </div>
        </div>
        <div className="form-field-group">
          <div className="form-field-label-container">
            <Label name="password:" />
          </div>
          <div className="form-field-input-container">
            <Input
              type="password"
              className="input-field"
              name="password"
              onChange={handleInputChange}
              errorMessage={registerFormErrors.passwordError}
              value={register.password}
              placeholder="create a password"
            />
          </div>
        </div>
        <div className="flex flex-row my-5">
        <Button
          type='submit' 
          className="button-submit"
          aria-disabled={common.disableSubmitButton(
            registerForm,
            registerFormErrors,
            fetching
            )}
          disabled={common.disableSubmitButton(
            registerForm,
            registerFormErrors,
            fetching
            )}
         >
          {fetching ? "Registering..." : "Register"}
        </Button>
        </div>
      </Form>
    </div>
  );
};

export default Register;
