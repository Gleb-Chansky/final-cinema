import { Link } from "react-router-dom";
export const ActorList = ({ result, param }) => {
  return (
    <div className="container">
      <h1 className="content__page-title">{param}</h1>
      <ul className="content__page-list">
        {result.map((data) => {
          return <ActorItem actor={data} key={data._id} />;
        })}
      </ul>
    </div>
  );
};

export const ActorItem = ({ actor }) => {
  return (
    <li className="content__item">
      <Link to={`/actor/${actor.name}`}>
        <img
          src={`${actor.img}`}
          alt="movie image"
          className="content__item-img"
        />
        <div className="content__item-description">
          <h1 className="content__description-title">{actor.name}</h1>
          <div className="content__description-wrapper">
            <ul className="content__description-actors-list">
              <p className="content__description-text">Born:</p>
              <li className="content__description-text">{actor.born}</li>
            </ul>
            <ul className="content__description-data-list">
              <li className="content__description-text">
                Activity: {actor.activity}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </li>
  );
};
