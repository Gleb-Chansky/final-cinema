import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Slider } from "../components/Slider/Slider";
import { Loader } from "../components/Loader/Loader";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [comedy, setComedy] = useState([]);
  const [genres, setGenres] = useState([]);
  const [crime, setCrime] = useState([]);
  const [family, setFamily] = useState([]);
  const [documental, setDocumental] = useState([]);

  const fetchSliders = async () => {
    setIsLoading(true);
    const res = await fetch("/sliders");
    if (res.ok) {
      const data = await res.json();
      setComedy(data[0]);
      setCrime(data[1]);
      setFamily(data[2]);
      setDocumental(data[3]);
      setGenres(data[4]);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <Loader />
      ) : (
        <>
          <section className="container">
            <h1 className="content__title">Comedy</h1>
            <Slider genre={comedy} />
            <div className="genres container">
              <h1 className="content__title">Genres</h1>
              <ul className="genres__list">
                {genres.map((el, index) => {
                  return (
                    <li className="genres__list-item" key={index}>
                      <Link to={`/genres/${el}`} className="genres__link">
                        {el}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <h1 className="content__title">Crime</h1>
            <Slider genre={crime} />
            <h1 className="content__title">Family</h1>
            <Slider genre={family} />
            <h1 className="content__title">Documental</h1>
            <Slider genre={documental} />
          </section>
        </>
      )}
    </>
  );
};
