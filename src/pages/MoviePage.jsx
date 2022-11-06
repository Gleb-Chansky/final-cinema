import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../components/Loader/Loader";
import { useWindowDimensions } from "../components/WidthHook";

export const MoviePage = () => {
  const { name } = useParams();
  const { width } = useWindowDimensions();
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchMovie = async () => {
    setIsLoading(true);
    const res = await fetch(`/movie/${name}`, {
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
      setMovie(data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <div className="movie container">
          <div className="movie__wrapper">
            {width < 900 ? <h1 className="movie__title">{name}</h1> : <></>}
            {movie.map((el, index) => {
              return (
                <div className="movie__item" key={index}>
                  <div className="movie__img-wrapper">
                    <img
                      src={`${el.image}`}
                      alt="movie image"
                      className="movie__img"
                    />
                    <div className="movie__img-inner">
                      <span
                        className={
                          el.rating < 7.0
                            ? "movie__rating red"
                            : "movie__rating green"
                        }
                      >
                        {el.rating}
                      </span>
                      <ul className="movie__genre-list">
                        {el.genres.map((genre, index) => {
                          return (
                            <li>
                              <Link
                                to={`/genres/${genre}`}
                                key={index}
                                className="movie__genre-link"
                              >
                                {genre}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="movie__description">
                    <h1 className="movie__description-title">{name}</h1>
                    <p className="movie__description-text">{el.description}</p>
                    <ul className="movie__actor-list">
                      <ActorLink actors={el.actors} key={el._id} />
                    </ul>
                    <div className="movie__description-wrapper">
                      <div>
                        <p className="movie__wrapper-title">Directors :</p>
                        {el.directors.map((director, index) => {
                          return (
                            <p className="movie__description-text" key={index}>
                              {director}
                            </p>
                          );
                        })}
                        <p className="movie__wrapper-title">Writers :</p>
                        {el.writers.map((writer, index) => {
                          return (
                            <p className="movie__description-text" key={index}>
                              {writer}
                            </p>
                          );
                        })}
                        <p className="movie__wrapper-title">
                          Release date: {el.release}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export const ActorLink = ({ actors }) => {
  return (
    <>
      {actors.map((actor, index) => {
        return (
          <Link to={`/actor/${actor.name}`} className="movie__actor-link">
            <li className="movie__actor-item">
              <img
                src={`${actor.img}`}
                alt="actor photo"
                className="movie__actor-img"
              />
            </li>
            <div className="movie__actor-title">{actor.name}</div>
          </Link>
        );
      })}
    </>
  );
};
