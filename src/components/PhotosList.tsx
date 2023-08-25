import React from "react";
import "./PhotosList.css";
import { Photo } from "../models/Photo";
import { Picture } from "./Picture";

type PhotosListProps = {
  photos: Photo[];
};

export const PhotosList = ({ photos }: PhotosListProps) => {
  const [photosColumns, setPhotosColumns] = React.useState<Photo[][]>([]);
  const [numberOfColumns, setNumberOfColumns] = React.useState<number>(3);

  const changeColumnsOnResize = () => {
    if (window.innerWidth < 600) {
      setNumberOfColumns(1);
    } else if (window.innerWidth < 900) {
      setNumberOfColumns(2);
    } else {
      setNumberOfColumns(3);
    }
  };

  React.useEffect(() => {
    window.addEventListener("resize", changeColumnsOnResize);

    return () => window.removeEventListener("resize", changeColumnsOnResize);
  }, []);

  React.useEffect(() => {
    if (photos.length === 0) return;

    const photosColumns = photos.reduce<Photo[][]>((acc, photo, idx) => {
      const columnIdx = idx % numberOfColumns;
      acc[columnIdx] = [...(acc[columnIdx] || []), photo];
      return acc;
    }, []);

    setPhotosColumns(photosColumns);
  }, [photos, numberOfColumns]);

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
