import React from "react";
import "./PhotosList.css";
import { Photo } from "../models/Photo";

type PhotosListProps = {
  photos: Photo[];
};

export const PhotosList = ({ photos }: PhotosListProps) => {
  const [photosColumns, setPhotosColumns] = React.useState<Photo[][]>([]);

  React.useEffect(() => {
    if (photos.length === 0) return;
    const COLUMNS = 3;

    const photosColumns = photos.reduce<Photo[][]>((acc, photo, idx) => {
      const columnIdx = idx % COLUMNS;
      acc[columnIdx] = [...(acc[columnIdx] || []), photo];
      return acc;
    }, []);

    setPhotosColumns(photosColumns);
  }, []);

  React.useEffect(() => {
    console.log(photosColumns);
  }, [photosColumns]);

  return (
    <main className="main">
      <div className="column">
        {photosColumns &&
          photosColumns.length > 0 &&
          photosColumns[0].map((photo, idx) => {
            return (
              <picture className="picture" key={idx}>
                <img className="picture__img" src={photo.url} alt={photo.label} />
                <p>{photo.label}</p>
              </picture>
            );
          })}
      </div>
      <div>
        {photosColumns &&
          photosColumns[1]?.length > 0 &&
          photosColumns[1].map((photo, idx) => {
            return (
              <picture className="picture" key={idx}>
                <img className="picture__img" src={photo.url} alt={photo.label} />
                <p>{photo.label}</p>
              </picture>
            );
          })}
      </div>
      <div>
        {photosColumns &&
          photosColumns[2]?.length > 0 &&
          photosColumns[2].map((photo, idx) => {
            return (
              <picture className="picture" key={idx}>
                <img className="picture__img" src={photo.url} alt={photo.label} />
                <p>{photo.label}</p>
              </picture>
            );
          })}
      </div>
    </main>
  );
};
