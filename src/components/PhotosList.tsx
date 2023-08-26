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
  const [photosWithErrors, setPhotosWithErrors] = React.useState<string[]>([]);
  const [totalPhotosLoaded, setTotalPhotosLoaded] = React.useState<number>(0);

  React.useEffect(() => {
    changeColumnsOnResize();
    window.addEventListener("resize", changeColumnsOnResize);

    return () => window.removeEventListener("resize", changeColumnsOnResize);
  }, []);

  React.useEffect(() => {
    if (photos.length === 0) return;
    handleLoadedPhotos();
  }, [photos, numberOfColumns]);

  React.useEffect(() => {
    if (photosWithErrors.length === 0) return;
    if ((totalPhotosLoaded + photosWithErrors.length) === photos.length) {
      handleLoadedPhotos();
    }
  }, [totalPhotosLoaded, photosWithErrors.length]);

  const changeColumnsOnResize = () => {
    if (window.innerWidth < 600) {
      setNumberOfColumns(1);
    } else if (window.innerWidth < 900) {
      setNumberOfColumns(2);
    } else {
      setNumberOfColumns(3);
    }
  };

  const handleLoadedPhotos = () => {
    let tempPhotos = photos.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    tempPhotos = tempPhotos.filter((photo) => {
      return !photosWithErrors.includes(photo._id);
    });

    const photosColumns = tempPhotos.reduce<Photo[][]>((acc, photo, idx) => {
      const columnIdx = idx % numberOfColumns;
      acc[columnIdx] = [...(acc[columnIdx] || []), photo];
      return acc;
    }, []);

    setPhotosColumns(photosColumns);
  }

  const removeNotLoadedPhoto = (id: string) => {
    setPhotosWithErrors(prev => [...prev, id])
  };

  const registerLoaded = () => {
    setTotalPhotosLoaded(prev => prev + 1);
  }

  return (
    <main className="photos-list">
      <div>
        {photosColumns &&
          photosColumns.length > 0 &&
          photosColumns[0].map((photo, idx) => {
            return (
              <Picture
                photo={photo}
                key={idx}
                onError={() => removeNotLoadedPhoto(photo._id)}
                onLoaded={() => registerLoaded()}
              />
            );
          })}
      </div>
      <div>
        {photosColumns &&
          photosColumns[1]?.length > 0 &&
          photosColumns[1].map((photo, idx) => {
            return (
              <Picture
                photo={photo}
                key={idx}
                onError={() => removeNotLoadedPhoto(photo._id)}
                onLoaded={() => registerLoaded()}
                />
                );
              })}
      </div>
      <div>
        {photosColumns &&
          photosColumns[2]?.length > 0 &&
          photosColumns[2].map((photo, idx) => {
            return (
              <Picture
                photo={photo}
                key={idx}
                onError={() => removeNotLoadedPhoto(photo._id)}
                onLoaded={() => registerLoaded()}
              />
            );
          })}
      </div>
    </main>
  );
};
