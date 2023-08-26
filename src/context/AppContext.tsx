import { createContext, useState } from "react";
import { Photo } from "../models/Photo";

type AppContextProps = {
  children: React.ReactNode;
};

export type AppContextType = {
  labelToSearch: string;
  setLabelToSearch: (value: string) => void;
  addedPhoto: Photo | undefined;
  setAddedPhoto: (value: Photo) => void;
};

export const AppContext = createContext({});

export const AppProvider = ({ children }: AppContextProps) => {
  const [labelToSearch, setLabelToSearch] = useState<string>("");
  const [addedPhoto, setAddedPhoto] = useState<Photo>();

  return (
    <AppContext.Provider
      value={{ labelToSearch, setLabelToSearch, addedPhoto, setAddedPhoto }}
    >
      {children}
    </AppContext.Provider>
  );
};
