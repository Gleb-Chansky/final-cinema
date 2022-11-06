import InstagramLogo from "../../img/instagram-logo.webp";
import TelegramLogo from "../../img/telegram-logo.webp";
import TwitterLogo from "../../img/twitter-logo.webp";
import YoutubeLogo from "../../img/youtube-logo.webp";

export const Footer = () => {
  return (
    <footer class="footer">
      <div class="container">
        <hr />
        <div class="footer__wrapper">
          <div class="footer__copy">&copy; 2022 Brand All Rights Reserved.</div>
          <ul class="footer__link-list">
            <li class="footer__link">
              <a href="https://twitter.com/">
                <img
                  class="footer__link-img"
                  src={TwitterLogo}
                  alt="twitter logo"
                />
              </a>
            </li>
            <li class="footer__link">
              <a href="https://www.instagram.com/">
                <img
                  class="footer__link-img"
                  src={InstagramLogo}
                  alt="instgram logo"
                />
              </a>
            </li>
            <li class="footer__link">
              <a href="https://telegram.org/">
                <img
                  class="footer__link-img"
                  src={TelegramLogo}
                  alt="telegram logo"
                />
              </a>
            </li>
            <li class="footer__link">
              <a href="https://www.youtube.com/">
                <img
                  class="footer__link-img"
                  src={YoutubeLogo}
                  alt="youtube logo"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
