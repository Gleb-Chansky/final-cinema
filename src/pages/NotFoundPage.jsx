import image from "../img/notFound.png";
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div class="content">
      <div class="content__wrapper">
        <h1 className="content__title">Page not found</h1>
        <img src={image} alt="image" />
        <Link to="/" className="content__link">
          Back to main page
        </Link>
      </div>
    </div>
  );
};
