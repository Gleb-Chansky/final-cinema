import { useState, useEffect } from "react";
import { Loader } from "../components/Loader/Loader";
import { ActorList } from "../components/ActorList";

export const ActorsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [result, setResult] = useState([]);

  const fetchFilms = async () => {
    setIsLoading(true);
    const res = await fetch("/getactors");
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
        <ActorList result={result} param={"Actors"} />
      )}
    </>
  );
};
