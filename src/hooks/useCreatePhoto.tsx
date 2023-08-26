import React from "react";
import { ErrorResponse } from "../models/ErrorResponse";
import { Photo } from "../models/Photo";

export const useCreatePhoto = () => {
  const [createState, setCreateState] = React.useState<'initial' | 'loading' | 'error' | 'success'>();
  const [errorResponse, setErrorResponse] = React.useState<ErrorResponse>();
  const [newPhoto, setNewPhoto] = React.useState<Photo>();

  const createPhoto = async (label: string, url: string) => {
    try {
      const res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          label,
          url,
        }),
      });

      if (!res.ok) {
        const data: ErrorResponse = await res.json();
        setErrorResponse(data);
        return;
      }
      const data: Photo = await res.json();
      setNewPhoto(data);
      setCreateState("success");
    } catch {
      setCreateState("error");
      setErrorResponse({ message: ["Something went wrong"] });
    }
  };

  return {
    createPhoto,
    errorResponse,
    newPhoto,
    createState,
  }
};

export default useCreatePhoto;