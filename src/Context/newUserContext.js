import React from "react";

const NewUserContext = React.createContext();
const {
  Provider: NewUserProvider,
  Consumer: NewUserConsumber
} = NewUserContext;

export { NewUserConsumber, NewUserProvider, NewUserContext };
