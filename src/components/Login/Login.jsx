import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// using our component for building inputs
import { Input } from "../Input/Input";
// using our label component for building our labels
import { Label } from "../Label/Label";
// importing loginUserAction action for dispatching it on the component
import {
  loginUserAction,
  resetLoginRegisterValues
} from "../../actions/userActions";
// using our alert message component for displaying messages
import { AlertMessage } from "../Alert/AlertMessage";
// using our common js object for using properties methods
import common from "../../lib/common";
import { Form } from "../Form/Form";
import {
  INITIAL_LOGIN_FORM_ERRORS_STATE,
  INITIAL_LOGIN_FORM_STATE,
  INPUT_EMAIL_ERROR_MESSAGE,
  INPUT_PASSWORD_ERROR_MESSAGE,
  REGEX_VALID_EMAIL,
  REGEX_VALID_PASSWORD
} from "../../lib/constants";
import { PageHeader } from "../PageHeader/PageHeader";
import { selectAll } from "../../lib/selectors";
import { Button } from "../Button/Button";

// component representing login page
const Login = () => {
  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN_FORM_STATE);
  const [loginFormErrors, setLoginFormErrors] = useState(
    INITIAL_LOGIN_FORM_ERRORS_STATE
  );
  const [fetching, setFetching] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const { login, isUserAuthenticated } = useSelector(selectAll);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // lifecylce method typically used to make requests and setState
  useEffect(() => {
    const isLoggedIn = common.isLoggedIn();
    if (isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, []);

  useEffect(() => {
    if(fetching){
      if(isUserAuthenticated){
        loginSuccessful();
      }
      if(!isUserAuthenticated){
        setFetching(false);
        setShowAlertMessage(true);
        setTimeout(() => {
          setShowAlertMessage(false);
        }, 2000)
      }
    }
  }, [login.attempt]);

  const loginSuccessful = () => {
    setFetching(false);
    setShowAlertMessage(true);
    setTimeout(() => {
      setLoginForm(INITIAL_LOGIN_FORM_STATE);
      setLoginFormErrors(INITIAL_LOGIN_FORM_ERRORS_STATE);
      setShowAlertMessage(false);
      dispatch(resetLoginRegisterValues());
      navigate("/dashboard", { replace: true });
    }, 2000)
  };

  // on a specific input change please verify and update form errors and state input value
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        let emailError =
          value.length && !REGEX_VALID_EMAIL.test(value)
            ? INPUT_EMAIL_ERROR_MESSAGE
            : "";
        setLoginForm({ ...loginForm, [name]: value });
        setLoginFormErrors({ ...loginFormErrors, emailError });
        break;
      case "password":
        let passwordError =
          value.length && !REGEX_VALID_PASSWORD.test(value)
            ? INPUT_PASSWORD_ERROR_MESSAGE
            : "";
        setLoginForm({ ...loginForm, [name]: value });
        setLoginFormErrors({ ...loginFormErrors, passwordError });
        break;
      default:
        break;
    }
  };

  // this method submits the form input values to the redux action method fetchUser
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginForm;
    setFetching(true);
    dispatch(loginUserAction(email, password));
  };

  return (
    <div className="login-container">
      <div className="my-5">
        <PageHeader>
          <h2>Login to your account</h2>
        </PageHeader>
      </div>
      <AlertMessage success={login.success} message={login.message} showAlert={showAlertMessage} />
      <Form onSubmit={handleFormSubmit}>
        <div className="form-field-group">
          <div className="form-field-label-container">
            <Label name="email:" />
          </div>
          <div className="form-field-input-container">
            <Input
              type="email"
              className="input-field"
              name="email"
              value={loginForm.email}
              errorMessage={loginFormErrors.emailError}
              onChange={handleInputChange}
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
              value={loginForm.password}
              errorMessage={loginFormErrors.passwordError}
              onChange={handleInputChange}
              placeholder="type in your password"
            />
          </div>
        </div>
        <div className="flex flex-row">
          <Button 
              type='submit'
              className="button-submit"
              aria-disabled={common.disableSubmitButton(
                loginForm,
                loginFormErrors,
                fetching
              ) || isUserAuthenticated }
              disabled={common.disableSubmitButton(
                loginForm,
                loginFormErrors,
                fetching
              ) || isUserAuthenticated }>
          {fetching ? "Authenticating..." : "Login"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
