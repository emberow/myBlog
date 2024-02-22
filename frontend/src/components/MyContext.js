import { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  let userName = "123";

  const setUserName = (name) => {
    userName = name;
  }
  
  return (
    <DataContext.Provider value={{userName, setUserName}}>
      {children}
    </DataContext.Provider>
  );
};