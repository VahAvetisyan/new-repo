

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./Footer.css"
function Footer() {
  return (
    <>
      <footer className="footer-distributed">
        <div className="footer-left">
          
            <img
              style={{ height: "60px" }}
              src="https://i.imgur.com/u7D9vYW.png"
              alt=""
            />
          

          <p className="footer-links">
            <a href="">Home</a>|<a href="#">About</a>|<a href="#">Contact</a>|
            <a href="#">Blog</a>
          </p>

          <p className="footer-company-name">
            Copyright © 2023 <strong>Cinema ASD</strong> All rights reserved
          </p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>Armenia</span>
              Yerevan
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+010 101010</p>
          </div>
          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="mailto:cinemaasd@onionmail.org">
                cinemaasd@onionmail.org
              </a>
            </p>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            <strong>Aca React first group</strong>
          </p>

          <div className="icons">
            <a href="#">
              <FacebookIcon />
            </a>
            <a href="#">
              <TwitterIcon />
            </a>
            <a href="#">
              <TelegramIcon />
            </a>
            <a href="https://github.com/VahAvetisyan/new-repo/tree/master">
              <GitHubIcon />
            </a>

            <a href="">
              <LinkedInIcon />
            </a>
            <a href="">
              <InstagramIcon />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer