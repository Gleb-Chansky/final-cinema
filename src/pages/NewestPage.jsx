import { useState, useEffect } from "react";
import { Loader } from "../components/Loader/Loader";
import { FilmList } from "../components/FilmList";

export const NewestPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState([]);

  const fetchFilms = async () => {
    setIsLoading(true);
    const res = await fetch("/getnewest");
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
    fetchFilms();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <FilmList result={result} param={"Newest"} />
      )}
    </>
  );
};
