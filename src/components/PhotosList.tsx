import React from "react";
import "./PhotosList.css";
import { Photo } from "../models/Photo";
import { Picture } from "./Picture";

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
  }, [photos]);

  return (
    <main className="photos-list">
      <div>
        {photosColumns &&
          photosColumns.length > 0 &&
          photosColumns[0].map((photo, idx) => {
            return <Picture photo={photo} key={idx} />;
          })}
      </div>
      <div>
        {photosColumns &&
          photosColumns[1]?.length > 0 &&
          photosColumns[1].map((photo, idx) => {
            return <Picture photo={photo} key={idx} />;
          })}
      </div>
      <div>
        {photosColumns &&
          photosColumns[2]?.length > 0 &&
          photosColumns[2].map((photo, idx) => {
            return <Picture photo={photo} key={idx} />;
          })}
      </div>
    </main>
  );
};
