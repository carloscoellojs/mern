import userReducer, {
  loginUser,
  loginUserError,
  registerUser,
  registerUserError,
  fetchUser,
  fetchUserError,
  logUserOut,
  loginRegisterValuesReset
} from './userReducer';

describe('userReducer', () => {
  const initialState = {
    isUserAuthenticated: false,
    login: { attempt: 0 },
    register: { attempt: 0 },
    member: {}
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it('should handle loginUser', () => {
    const action = loginUser({ user: 'test' });
    const state = userReducer(initialState, action);
    expect(state.isUserAuthenticated).toBe(true);
    expect(state.login.user).toBe('test');
    expect(state.login.attempt).toBe(1);
  });

  it('should handle loginUserError', () => {
    const action = loginUserError({ error: 'fail' });
    const state = userReducer({ ...initialState, isUserAuthenticated: true }, action);
    expect(state.isUserAuthenticated).toBe(false);
    expect(state.login.error).toBe('fail');
    expect(state.login.attempt).toBe(1);
  });

  it('should handle registerUser', () => {
    const action = registerUser({ user: 'new' });
    const state = userReducer(initialState, action);
    expect(state.register.user).toBe('new');
    expect(state.register.attempt).toBe(1);
  });

  it('should handle registerUserError', () => {
    const action = registerUserError({ error: 'fail' });
    const state = userReducer(initialState, action);
    expect(state.register.error).toBe('fail');
    expect(state.register.attempt).toBe(1);
  });

  it('should handle fetchUser', () => {
    const action = fetchUser({ id: 1, name: 'John' });
    const state = userReducer(initialState, action);
    expect(state.member).toEqual({ id: 1, name: 'John' });
  });

  it('should handle fetchUserError', () => {
    const action = fetchUserError();
    const state = userReducer(initialState, action);
    expect(state.member.success).toBe(false);
    expect(state.member.message).toMatch(/not fetched/i);
  });

  it('should handle logUserOut', () => {
    const prevState = {
      isUserAuthenticated: true,
      login: { attempt: 2 },
      register: { attempt: 2 },
      member: { id: 1 }
    };
    const action = logUserOut();
    const state = userReducer(prevState, action);
    expect(state.isUserAuthenticated).toBe(false);
    expect(state.login).toEqual({ attempt: 0 });
    expect(state.register).toEqual({ attempt: 0 });
    expect(state.member).toEqual({});
  });

  it('should handle loginRegisterValuesReset', () => {
    const prevState = {
      ...initialState,
      login: { attempt: 3 },
      register: { attempt: 4 }
    };
    const action = loginRegisterValuesReset();
    const state = userReducer(prevState, action);
    expect(state.login).toEqual({ attempt: 0 });
    expect(state.register).toEqual({ attempt: 0 });
  });
});
