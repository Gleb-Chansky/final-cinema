import { Link } from "react-router-dom";
import { toggleBurgerMenu } from "../../store/actions";
import { useDispatch } from "react-redux";
export const LinkList = () => {
  const dispatch = useDispatch();
  const redirectPage = () => {
    dispatch(toggleBurgerMenu(false));
  };
  return (
    <>
      <Link
        to="/films"
        className="header__navigation-link"
        onClick={redirectPage}
      >
        Films
      </Link>
      <Link
        to="/cartoons"
        className="header__navigation-link"
        onClick={redirectPage}
      >
        Cartoons
      </Link>
      <Link
        to="/top"
        className="header__navigation-link"
        onClick={redirectPage}
      >
        Top
      </Link>
      <Link
        to="/newest"
        className="header__navigation-link"
        onClick={redirectPage}
      >
        Newest
      </Link>
      <Link
        to="/actors"
        className="header__navigation-link"
        onClick={redirectPage}
      >
        Actors
      </Link>
    </>
  );
};
