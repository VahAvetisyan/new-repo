


import "./Footer.css"
function Footer() {
  return (
    <>
      <footer className="footer-distributed">
        <div className="footer-left">
          <h3>
            Cinema<span>ASD</span>
          </h3>

          <p className="footer-links">
            <a href="">Home</a>|<a href="#">About</a>|<a href="#">Contact</a>|
            <a href="#">Blog</a>
          </p>

          <p className="footer-company-name">
            Copyright © 2021 <strong>SagarDeveloper</strong> All rights reserved
          </p>
        </div>

        <div className="footer-center">
          <div>
            <i className="fa fa-map-marker"></i>
            <p>
              <span>Ghaziabad</span>
              Delhi
            </p>
          </div>

          <div>
            <i className="fa fa-phone"></i>
            <p>+1 744959754258</p>
          </div>
          <div>
            <i className="fa fa-envelope"></i>
            <p>
              <a href="kraken@onionmail.org">kraken@onionmail.org</a>
            </p>
          </div>
        </div>
        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            <strong>Sagar Developer</strong> is a Youtube channel where you can
            find more creative CSS Animations and Effects along with HTML,
            JavaScript and Projects using C/C++.
          </p>

          <div className="icons"> 
            <a href="#">
              <span>Facebook</span>
            </a>
            <a href="#">
              <span>Twitter</span>
            </a>
            <a href="#">
              <span>Google+</span>
            </a>
            <a href="#">
              <span>Github</span>
            </a>
            <a href="#">
              <span>Dribbble</span>
            </a>
            <a href="#">
              <span>CodePen</span>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer