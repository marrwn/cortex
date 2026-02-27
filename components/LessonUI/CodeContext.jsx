"use client";
import { createContext, useContext, useState } from "react";

const CodeContext = createContext();

export const CodeProvider = ({ children }) => {
  const [activeCode, setActiveCode] = useState("");
  return (
    <CodeContext.Provider value={{ activeCode, setActiveCode }}>
      {children}
    </CodeContext.Provider>
  );
};

export const useCode = () => useContext(CodeContext);
