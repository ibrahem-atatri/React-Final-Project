import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
  // for log in
  const [showAuthInformation, setShowAuthInformation] = useState(false);

  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [userName, setUserName] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const getUserData = () => {
    if (userToken != null) {
      const decoded = jwtDecode(userToken);
      setUserName(decoded.userName);
    }
  };

  useEffect(() => {
    getUserData();
  }, [userToken]);
  return (
    <userContext.Provider
      value={{
        setUserName,
        setUserToken,
        userName,
        userToken,
        setShowAuthInformation,
        showAuthInformation,
        categoryId,
        setCategoryId,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
