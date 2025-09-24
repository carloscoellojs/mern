import {
  loginUserAction,
  logUserOutAction,
  registerUserAction,
  fetchUserAction,
  resetLoginRegisterValues
} from './userActions';
import {
  loginUser,
  loginUserError,
  registerUser,
  registerUserError,
  fetchUser,
  fetchUserError,
  logUserOut,
  loginRegisterValuesReset
} from '../reducers/user/userReducer';

import axios from 'axios';
import common from '../lib/common';
import { decode } from 'jwt-js-decode';

jest.mock('axios');
jest.mock('../lib/common');
jest.mock('jwt-js-decode', () => ({ decode: jest.fn() }));

const dispatch = jest.fn();

describe('userActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('loginUserAction dispatches loginUser on success', async () => {
    axios.post.mockResolvedValue({ data: { token: 'tok', foo: 'bar' }, status: 200 });
    decode.mockReturnValue({ payload: { id: '123' } });
    await loginUserAction('a@b.com', 'pass')(dispatch);
    expect(localStorage.getItem('token')).toBe('tok');
    expect(localStorage.getItem('id')).toBe('123');
    expect(common.authenticateWithHeaders).toHaveBeenCalledWith('tok');
    expect(dispatch).toHaveBeenCalledWith(loginUser(expect.objectContaining({ token: 'tok', status: 200 })));
  });

  it('loginUserAction dispatches loginUserError on error', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'fail' }, status: 401 } });
    await loginUserAction('a@b.com', 'bad')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(loginUserError(expect.objectContaining({ error: 'fail', status: 401 })));
  });

  it('logUserOutAction removes token and dispatches logUserOut', () => {
    localStorage.setItem('token', 'tok');
    logUserOutAction()(dispatch);
    expect(localStorage.getItem('token')).toBe(null);
    expect(common.authenticateWithHeaders).toHaveBeenCalledWith(false);
    expect(dispatch).toHaveBeenCalledWith(logUserOut());
  });

  it('registerUserAction dispatches registerUser on success', async () => {
    axios.post.mockResolvedValue({ data: { foo: 'bar' }, status: 201 });
    await registerUserAction('name', 'a@b.com', 'pass')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(registerUser(expect.objectContaining({ foo: 'bar', status: 201 })));
  });

  it('registerUserAction dispatches registerUserError on error', async () => {
    axios.post.mockRejectedValue({ response: { data: { error: 'fail' }, status: 400 } });
    await registerUserAction('name', 'bad', 'pass')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(registerUserError(expect.objectContaining({ error: 'fail', status: 400 })));
  });

  it('fetchUserAction dispatches fetchUser on success', async () => {
    axios.get.mockResolvedValue({ data: { id: 1, name: 'John' } });
    await fetchUserAction('1')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(fetchUser({ id: 1, name: 'John' }));
  });

  it('fetchUserAction dispatches fetchUserError on error', async () => {
    axios.get.mockRejectedValue({ response: { data: { error: 'fail' } } });
    await fetchUserAction('bad')(dispatch);
    expect(dispatch).toHaveBeenCalledWith(fetchUserError({ error: 'fail' }));
  });

  it('resetLoginRegisterValues dispatches loginRegisterValuesReset', () => {
    resetLoginRegisterValues()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(loginRegisterValuesReset());
  });
});
