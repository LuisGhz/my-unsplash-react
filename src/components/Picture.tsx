import React from "react";
import { Photo } from "../models/Photo";
import "./Picture.css";
import { useDeletePhoto } from "../hooks/useDeletePhoto";
import { AppContext, AppContextType } from "../context/AppContext";

type Picture = {
  photo: Photo;
  onError?: () => void;
};

export const Picture = ({ photo, onError }: Picture) => {
  const { setDeletedPhotoId } = React.useContext(
    AppContext
  ) as unknown as AppContextType;
  const { deletePhoto, deleteState } = useDeletePhoto();
  React.useEffect(() => {
    if (deleteState === "success") setDeletedPhotoId(photo._id);
  }, [deleteState]);

  return (
    <picture className="picture">
      <img
        className="picture__img"
        src={photo.url}
        alt={photo.label}
        onError={onError}
      />
      <div className="picture__backdrop"></div>
      <p className="picture__label">{photo.label}</p>
      <button
        className="picture__delete-btn"
        type="button"
        onClick={() => {
          deletePhoto(photo._id);
        }}
      >
        Delete
      </button>
    </picture>
  );
};
