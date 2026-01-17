import React, { createContext, FC, ReactNode, useContext, useState } from "react";
import { IUserContext } from "./types";
import initialState from "./initialState";

interface Props {
  children: ReactNode;
}

const UserContext = createContext<IUserContext | any>(null);

const ContextProvider: FC<Props> = ({ children }) => {
  const [globalState, setGlobalState] = useState(initialState);

  const addGlobalStateProp = (props: typeof initialState) =>
    setGlobalState({ ...globalState, ...props });

  const resetState = () => setGlobalState(initialState);

  return (
    <UserContext.Provider
      value={{ state: globalState, setState: addGlobalStateProp, resetState }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useGlobalContext = () => useContext<IUserContext>(UserContext);

export { ContextProvider, useGlobalContext };
