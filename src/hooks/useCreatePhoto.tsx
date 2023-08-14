import React from "react";
import { ErrorResponse } from "../models/ErrorResponse";

type useCreatePhotoProps = {
  onCreated: () => void;
}

export const useCreatePhoto = ({ onCreated }: useCreatePhotoProps) => {
  const [createState, setCreateState] = React.useState<'initial' | 'loading' | 'error' | 'success'>();
  const [errorResponse, setErrorResponse] = React.useState<ErrorResponse>();

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

      if (res.ok) {
        setCreateState("success");
        onCreated();
        return;
      }

      const data: ErrorResponse = await res.json();
      setErrorResponse(data);
    } catch {
      setCreateState("error");
      setErrorResponse({ message: ["Something went wrong"] });
    }
  };

  return {
    createPhoto,
    errorResponse,
    createState,
  }
};

export default useCreatePhoto;