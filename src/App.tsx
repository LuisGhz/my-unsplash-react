import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { useGetPhotos } from "./hooks/useGetPhotos";
import { PhotosList } from "./components/PhotosList";

function App() {
  const { getPhotos, response, error } = useGetPhotos();

  React.useEffect(() => {
    getPhotos();
  }, []);

  const onSearch = (searchText: string) => {
    getPhotos(searchText);
  };

  return (
    <main className="container">
      <Header onSearch={onSearch} />
        {response && <PhotosList photos={response} />}
        {response && response.length === 0 && <p className="not-found-message">No photos found</p>}
        {error && <p className="fetch-error-message">{error}</p>}
    </main>
  );
}

export default App;
