import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader/Loader";

export const ActorPage = () => {
  const { name } = useParams();
  const [actor, setActor] = useState([]);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchActor = async () => {
    setIsLoading(true);
    const res = await fetch(`/actor/${name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: name,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      const actorList = data[0].actors;
      const actor = actorList.find((el) => el.name === name);
      setResult(data);
      setActor(actor);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };
  useEffect(() => {
    fetchActor();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <section className="actor container">
          <h1 className="actor__title">{name}</h1>
          <div className="actor__wrapper">
            <div className="actor__data">
              <img src={actor.img} alt="actor photo" className="actor__img" />
              <p className="actor__text">Born : {actor.born}</p>
              <p className="actor__text">Activity : {actor.activity}</p>
            </div>
            <div className="actor__filmography">
              <h1 className="actor__filmography-title">Filmography :</h1>
              <ul className="actor__filmography-list">
                {result.map((film, index) => {
                  return <FilmLink film={film} key={index} />;
                })}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export const FilmLink = ({ film }) => {
  return (
    <li className="actor__filmography-item">
      <Link to={`/movie/${film.title}`} className="actor__filmography-link">
        <img src={film.image} alt="movie image" className="actor__item-img" />
        <div className="actor__item-wrapper">
          <h1 className="actor__item-title">{film.title}</h1>
          <span
            className={
              film.rating < 7.0
                ? "actor__item-rating red"
                : "actor__item-rating green"
            }
          >
            {film.rating}
          </span>
        </div>
      </Link>
    </li>
  );
};
