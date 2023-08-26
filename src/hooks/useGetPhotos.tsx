import React from 'react';
import { Photo } from "../models/Photo";

export const useGetPhotos = () => {
  const [response, setResponse] = React.useState<Photo[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const getPhotos = async (searchText: string = "") => {
    setLoading(true);
    let url = "http://localhost:3000/";

    if (searchText.trim() !== "") {
      url = `${url}?query=${searchText}`;
    }
    let response;
    try {
      response = await fetch(url);

      if (!response.ok) throw Error();

      setResponse(await response.json());
      setLoading(false);
    } catch {
      setError("Error fetching data");
      setLoading(false);
    }
  };

  return {
    response,
    loading,
    error,
    getPhotos,
  }
};
