import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isUserAuthenticated: false,
    login: {
      attempt: 0
    },
    register: {
      attempt: 0
    },
    member: {}
  },
  reducers: {
    loginUser: (state, action) => {
      state.isUserAuthenticated = true;
      state.login = { ...action.payload, attempt: state.login.attempt + 1 };
    },
    loginUserError: (state, action) => {
      state.isUserAuthenticated = false;
      state.login = { ...action.payload, attempt: state.login.attempt + 1 };
    },
    registerUser: (state, action) => {
      state.register = { ...action.payload, attempt: state.register.attempt + 1 };
    },
    registerUserError: (state, action) => {
      state.register = { ...action.payload, attempt: state.register.attempt + 1 };
    },
    fetchUser: (state, action) => {
      state.member = action.payload;
    },
    fetchUserError: (state) => {
      state.member = {
        success: false,
        message:
          "Your account info was not fetched. Log Out and Log back in please"
      };
    },
    logUserOut: (state) => {
      state.isUserAuthenticated = false;
      state.login = { attempt: 0 };
      state.register = { attempt: 0 };
      state.member = {};
    },
    loginRegisterValuesReset: (state) => {
      state.login = { attempt: 0 };
      state.register = { attempt: 0 };
    }
  }
});

export const {
  loginUser,
  loginUserError,
  registerUser,
  registerUserError,
  fetchUser,
  fetchUserError,
  logUserOut,
  loginRegisterValuesReset
} = userSlice.actions;

export default userSlice.reducer;
