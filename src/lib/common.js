import axios from "axios";

// common properties methods that can be used across the app
export default {
  serverUrl: "http://localhost:2000",
  addUser: "/user/add",
  setUserInfo: (userInfo) => {
    const user = JSON.stringify(userInfo);
    localStorage.setItem("credentials", user);
  },
  removeUserInfo: (setItemName) => {
    localStorage.removeItem(setItemName);
  },
  isLoggedIn: () => {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  },
  authenticateWithHeaders: (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  },
  disableSubmitButton: (formState, formErrorState, fetching) => {
    const noEmptyFormStateValues = Object.values(formState).every(value => value);
    const emptyFormErrorStateValues = Object.values(formErrorState).every(value => !value);
    return noEmptyFormStateValues && emptyFormErrorStateValues && !fetching ? false : true;
  },
  firstCharToUpperCase: (str = '') => str.split(' ').map(el => el.charAt(0).toUpperCase() + el.slice(1,)).join(' ')
};
