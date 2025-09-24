import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// using our component for building inputs
import { Input } from "../../components/Input/Input";
// using our label component for building our labels
import { Label } from "../../components/Label/Label";
// using our stateles component for building alert messages
import { AlertMessage } from "../../components/Alert/AlertMessage";
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
import { Form } from "../../components/Form/Form";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { selectRegister } from "../../lib/selectors";
import { Button } from "../../components/Button/Button";

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
      }
      setTimeout(() => {
          setShowAlertMessage(false);
        }, 2000)
    }
  }, [register.attempt]);

  // updating state, redirecting
  const registrationSuccess = () => {
    setFetching(false);
    setShowAlertMessage(true);
    setRegisterForm(INITIAL_REGISTER_FORM_STATE);
    setRegisterFormErrors(INITIAL_REGISTER_FORM_ERRORS_STATE);
    setTimeout(() => {
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
    <div className="min-h-screen flex items-start justify-center bg-white">
      <div className="register-container w-full max-w-md">
        <div className="my-5 text-center">
          <PageHeader>
            <h2 className="text-2xl">Create an account</h2>
          </PageHeader>
        </div>
        <AlertMessage success={register.success} message={register.message} showAlert={showAlertMessage} />
        <Form className="needs-validation" onSubmit={handleFormSubmit}>
          <div className="form-field-group-base">
            <div className="form-field-label-container">
              <Label name="name:" htmlFor="register-name" className="label-base" />
            </div>
            <div className="form-field-input-container">
              <Input
                type="text"
                className="input-base"
                name="name"
                id="register-name"
                onChange={handleInputChange}
                errorMessage={registerFormErrors.nameError}
                value={registerForm.name}
                placeholder="type in your name"
              />
            </div>
          </div>
          <div className="form-field-group-base">
            <div className="form-field-label-container">
              <Label name="email:" htmlFor="register-email" className="label-base" />
            </div>
            <div className="form-field-input-container">
              <Input
                type="email"
                className="input-base"
                name="email"
                id="register-email"
                onChange={handleInputChange}
                errorMessage={registerFormErrors.emailError}
                value={registerForm.email}
                placeholder="type in your email"
              />
            </div>
          </div>
          <div className="form-field-group-base">
            <div className="form-field-label-container">
              <Label name="password:" htmlFor="register-password" className="label-base" />
            </div>
            <div className="form-field-input-container">
              <Input
                type="password"
                className="input-base"
                name="password"
                id="register-password"
                onChange={handleInputChange}
                errorMessage={registerFormErrors.passwordError}
                value={registerForm.password}
                placeholder="create a password"
              />
            </div>
          </div>
          <div className="flex flex-row my-5">
            <Button
              type='submit'
              className={`btn-base ${fetching ? 'btn-indigo text-[color:var(--color-charcoal)]' : 'btn-dark'}`}
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
    </div>
  );
};

export default Register;
