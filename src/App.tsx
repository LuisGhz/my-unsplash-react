import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { useGetPhotos } from "./hooks/useGetPhotos";
import { PhotosList } from "./components/PhotosList";
import { AppContext, AppContextType } from "./context/AppContext";
import { Photo } from "./models/Photo";

function App() {
  const [photosList, setPhotosList] = React.useState<Photo[]>([]);
  const { getPhotos, response, error } = useGetPhotos();
  const { labelToSearch, addedPhoto } = React.useContext(
    AppContext
  ) as unknown as AppContextType;

  React.useEffect(() => {
    getPhotos(labelToSearch);
  }, [labelToSearch]);

  React.useEffect(() => {
    if (response) setPhotosList(response);
  }, [response]);

  React.useEffect(() => {
    if (addedPhoto) setPhotosList((prev) => [addedPhoto, ...prev]);
  }, [addedPhoto]);

  return (
    <main className="container">
      <Header />
      {photosList && photosList.length > 0 && (
        <PhotosList photos={photosList} />
      )}
      {photosList && photosList.length === 0 && (
        <p className="not-found-message">No photos found</p>
      )}
      {error && <p className="fetch-error-message">{error}</p>}
    </main>
  );
}

export default App;
