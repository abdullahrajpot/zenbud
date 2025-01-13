import React from 'react'
import { useContext } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react'


const AuthContext = createContext();
const initialState= { isAuthenticated:false};



const reducer= (state  ,{ type }) => {
  switch (type) {

  case 'LOGIN':
    return { ...state, isAuthenticated: true }
    case 'LOGOUT':
      return {...state,  isAuthenticated: false }

  default:
    return state
  }
}


export default function AuthContextProvider({children}){

    const [state, dispatch] = useReducer(reducer, initialState)
    return (
      <AuthContext.Provider value={{...state, dispatch}}>
{children}     
 </AuthContext.Provider>
    )
  }

 export const useAuthContext=()=>{
    return useContext(AuthContext)
  }