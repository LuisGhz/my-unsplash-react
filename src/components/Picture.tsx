import { Photo } from "../models/Photo";
import './Picture.css';

type Picture = {
  photo: Photo;
};

export const Picture = ({ photo }: Picture) => {
  return (
    <picture className="picture">
      <img className="picture__img" src={photo.url} alt={photo.label} />
      <div className="picture__backdrop"></div>
      <p className="picture__label">{photo.label}</p>
      <button className="picture__delete-btn" type="button">Delete</button>
    </picture>
  );
};
