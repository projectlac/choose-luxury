import React, { createContext, useEffect, useReducer } from 'react';

// third-party

import jwtDecode from 'jwt-decode';
// constant

// reducer - state management
import accountReducer from 'store/accountReducer';
import { LOGIN, LOGOUT } from 'store/actions';

// project imports
import { InitialLoginContextProps, KeyedObject } from 'types';
import { JWTContextType } from 'types/auth';
import { IRegisterRequest } from 'types/services/authentication.type';
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';
import authApi from '../../api/AuthenticationApi/AuthApi';

// constant
const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

let users = [
  {
    id: -1,
    email: 'info@codedthemes.com',
    password: '123456',
    name: 'JWT User'
  }
];

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);

  const getProfile = async () => {
    const profile = await authApi.getCurrentUser();
    return profile.data;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);

          const profile = await authApi.getCurrentUser();
          // const jwData = jwt.verify(serviceToken, JWT_SECRET);
          // const { userId } = jwData as JWTData;
          // const user = users.find((_user) => _user.id === userId);

          // layas ho so khong thanh cong
          if (!profile.data) {
            return;
          }

          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                email: profile.data.email,
                id: profile.data.id,
                name: 'Admin'
              }
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.loginUser({ email, password });

    const usersData = response.data;

    // if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
    //   const localUsers = window.localStorage.getItem('users');
    //   users = JSON.parse(localUsers!);
    // }
    // const userFound = users.find((_user) => _user.email === email);
    // if (!userFound || userFound.password !== password) {
    //   return;
    // }
    // const serviceToken = jwt.sign({ userId: userFound.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_TIME });

    setSession(usersData.access);
    const getUser = await getProfile();
    const user = {
      ...users,
      email: getUser.email,
      id: getUser.id
    };
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const register = async (data: IRegisterRequest) => {
    // todo: this flow need to be recode as it not verified
    const response = await authApi.registerUser(data);
    const usersData = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers!),
        {
          id: usersData.id,
          email: usersData.email,
          name: `${usersData.first_name} ${usersData.last_name}`
        }
      ];
    }
    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = (email: string) => console.log(email);

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile, getProfile }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
