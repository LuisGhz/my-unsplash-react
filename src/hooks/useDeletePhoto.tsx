import React from "react";

export const useDeletePhoto = () => {
  const [deleteState, setDeleteState] = React.useState("initial");
  const [errorResponse, setErrorResponse] = React.useState<string>();
  const deletePhoto = async (id: string) => {
    setDeleteState("loading");
    try {
      const res = await fetch(`http://localhost:3000/?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        setDeleteState("error");
        setErrorResponse(data);
        return;
      }
      setDeleteState("success");
    } catch {
      setDeleteState("error");
      setErrorResponse("Something went wrong");
    }
  };
  return {
    deletePhoto,
    errorResponse,
    deleteState,
  };
};
