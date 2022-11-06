import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "../components/Loader/Loader";
import { FilmList } from "../components/FilmList";

export const GenresPage = () => {
  const { genre } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState([]);

  const fetchGenres = async () => {
    setIsLoading(true);
    const res = await fetch(`/genres/${genre}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: genre,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setResult(data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <FilmList result={result} param={genre} />
      )}
    </>
  );
};
