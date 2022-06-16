import { createContext, useContext } from "react";
const AppContext = createContext();

export const useCustomContext = () => {
  return useContext(AppContext);
};

export function CustomContextProvider({ value, children }) {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
