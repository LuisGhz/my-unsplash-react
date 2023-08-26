import { Photo } from "../models/Photo";
import './Picture.css';

type Picture = {
  photo: Photo;
  onError?: () => void;
};

export const Picture = ({ photo, onError }: Picture) => {
  return (
    <picture className="picture">
      <img className="picture__img" src={photo.url} alt={photo.label} onError={onError} />
      <div className="picture__backdrop"></div>
      <p className="picture__label">{photo.label}</p>
      <button className="picture__delete-btn" type="button">Delete</button>
    </picture>
  );
};
