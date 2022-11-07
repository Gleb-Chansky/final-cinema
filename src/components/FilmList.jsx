import { Link } from "react-router-dom";

export const FilmList = ({ result, param }) => {
  return (
    <div className="container">
      <h1 className="content__page-title">{param}</h1>
      <ul className="content__page-list">
        {result.map((data) => {
          return <Item data={data} key={data._id} />;
        })}
      </ul>
    </div>
  );
};

export const Item = ({ data }) => {
  return (
    <li className="content__item">
      <Link to={`/movie/${data.title}`}>
        <img
          src={`/static/${data.title}.jpg`}
          alt="movie image"
          className="content__item-img"
        />
        <div className="content__item-description">
          <h1 className="content__description-title">{data.title}</h1>
          <div className="content__description-wrapper">
            <ul className="content__description-actors-list">
              <p className="content__description-text">Writer:</p>
              {data.writers.map((writer, index) => {
                if (index === 0) {
                  return (
                    <li className="content__description-text" key={index}>
                      {writer}
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
            <ul className="content__description-data-list">
              <li className="content__description-text">Year: {data.year}</li>
              <li className="content__description-text">
                Rating: {data.rating}
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </li>
  );
};
