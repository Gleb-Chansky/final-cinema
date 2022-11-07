import { useSelector, useDispatch } from "react-redux";
import { toggleBlur } from "../../store/actions";
import { handleInput } from "../../store/actions";
import { Loader } from "../Loader/Loader";
import { Link } from "react-router-dom";

export const Blur = () => {
  const dispatch = useDispatch();
  const isBlur = useSelector((state) => state.isBlur);
  const value = useSelector((state) => state.value);

  const isLoading = useSelector((state) => state.isLoading);
  const filmList = useSelector((state) => state.films);
  const actorList = useSelector((state) => state.actors);

  const handleClick = () => {
    dispatch(toggleBlur());
    dispatch(handleInput(""));
  };

  return (
    <>
      <div className={isBlur === false ? "blur invisible" : "blur visible"}>
        <div className="blur__wrapper">
          <div className=" container">
            <h1 className="blur__title">
              {!value ? "Often search..." : "Result:"}
            </h1>
            {isLoading === true ? (
              <Loader />
            ) : (
              <div className="blur__inner">
                <ul className="blur__list">
                  {filmList.map((el, index) => {
                    if (index < 5) {
                      return (
                        <FilmItem key={index} film={el} click={handleClick} />
                      );
                    } else {
                      return null;
                    }
                  })}
                  {actorList.map((el, index) => {
                    if (index < 5) {
                      return (
                        <ActorItem
                          key={index}
                          actor={el._id}
                          click={handleClick}
                        />
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const ActorItem = (item, click) => {
  const actor = item.actor;
  return (
    <li className="blur__item">
      <Link to={`/actor/${actor.name}`} className="blur__link" onClick={click}>
        <img
          src={`/static/${actor.name}.jpg`}
          alt="actor photo"
          className="blur__link-img"
        />
        <h1 className="blur__link-title">{actor.name}</h1>
      </Link>
    </li>
  );
};

export const FilmItem = (item, click) => {
  const film = item.film;
  return (
    <li className="blur__item">
      <Link to={`/movie/${film.title}`} className="blur__link" onClick={click}>
        <img
          src={`/static/${film.title}.jpg`}
          alt="film photo"
          className="blur__link-img"
        />
        <h1 className="blur__link-title">{film.title}</h1>
      </Link>
    </li>
  );
};
