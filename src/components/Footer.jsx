import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="logo-box" style={{cursor:"pointer"}}>QuickEats</div>
          </div>

          <div className="footer-grid">
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li>Terms and Conditions</li>
                <li>Privacy Center</li>
                <li>Disclaimer</li>
                <li>Caution Notice</li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>QuickEats Food</h3>
              <ul>
                <li>Menu</li>
                <li>Order Lookup</li>
                <li>Gift Card</li>
                <li>Nutrition & Allergen</li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Support</h3>
              <ul>
                <li>Get Help</li>
                <li>Contact Us</li>
                <li>QuickEats Feedback</li>
                <li>Privacy Center</li>
              </ul>
            </div>
          </div>

          <div className="footer-actions">
            <div className="find-store">
              <span className="location-icon">📍</span> 
              <a href="#">Find A QuickEats</a>
            </div>
            <div className="app-badges">
              <Link to={"https://play.google.com/store/"}>
                <img src="https://images.ctfassets.net/wtodlh47qxpt/6BdZsyjLn64c06uCIE73d1/fb530f5d5231533b049463f6c7e8a2b1/google_play.svg?h=90&w=266&fm=webp&fit=fill" 
                  alt="Google Play" className="app-btn" />
              </Link>
              <Link to={"https://www.apple.com/app-store/"}>
                <img src="https://images.ctfassets.net/wtodlh47qxpt/em3mcMuAdXWlgucSJiTbS/d3ae7e51ed101d829e459355e255c47f/apple.svg?h=90&w=266&fm=webp&fit=fill" 
                  alt="App Store" className="app-btn" />
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div style={{width:"80%",display:"flex", justifyContent:"center",color:"white"}}>
            <p style={{paddingLeft:"280px"}}>Copyright © QuickEats Corporation 2026 All rights reserved</p>
          </div>
          <div className="social-links" style={{width:"10%"}}>
            <Link to={"https://www.instagram.com/"}>
              <img src="https://images.ctfassets.net/wtodlh47qxpt/4ZHyPA2EeaoP3aqtNDriBA/463462a9c27b0aa585e12b21ce3766e0/Social_Insta_White.svg?h=60&w=60&fm=webp&fit=fill" 
                alt="Instagram Icon" style={{width:"40px"}} />
            </Link>
            <Link to={"https://www.facebook.com/"}>
              <img src="https://images.ctfassets.net/wtodlh47qxpt/dKiu2meLcfz2DNwsg7nZw/7194830b1ba6f25b158a23d6b2c4752c/Social_Facebook_White.svg?h=60&w=60&fm=webp&fit=fill" 
                alt="Facebook Icon" style={{width:"40px"}} />
            </Link>
            <Link to={"https://twitter.com/"}>
              <img src="https://images.ctfassets.net/wtodlh47qxpt/78z9x0WwdkdXwGVK726EKX/6599ca34ec88e2a6f46d7d94ed85a8ad/Social_Twitter_White.svg?h=60&w=60&fm=webp&fit=fill" 
                alt="Twitter Icon" style={{width:"40px"}} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;