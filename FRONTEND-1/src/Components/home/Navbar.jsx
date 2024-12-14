import {} from "react";
import logo from "../../assets/logo.png"

const Navbar = () => {

  const navbarStyle = {
    backgroundColor: '#333',
    padding: '15px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  };

  const logo = {
    width: '50px', 
    
    marginRight: '10px', 
    borderRadius: '8px'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    marginLeft: '20px',
    transition: 'color 0.3s ease',
  };

  const buttonStyle = {
    padding: '8px 15px',
    borderRadius: '5px',
    border: '2px solid #4caf50',
    color: 'white',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  };

  const handleHover = (event) => {
    event.target.style.backgroundColor = '#4caf50';
  };

  const handleHoverOut = (event) => {
    event.target.style.backgroundColor = 'transparent';
  };

  return (
    <nav style={navbarStyle}>
      <div className="navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="logo">
          <a href="/"/>
          <img src= {logo} alt="logo" style={{ height: '40px' }} /> 
        </div>
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            <a href="/" style={linkStyle}>Home</a>
          </li>
          <li>
            <a href="#about" style={linkStyle}>About</a>
          </li>
          <li>
            <a href="#model" style={linkStyle}>Model</a>
          </li>
          <li>
            <a href="#photographer" style={linkStyle}>Photographer</a>
          </li>
          <li>
            <a href="/register" style={{ ...linkStyle, ...buttonStyle }} onMouseOver={handleHover} onMouseOut={handleHoverOut}>Sign Up</a>
          </li>
          <li>
            <a href="/login" style={{ ...linkStyle, ...buttonStyle }} onMouseOver={handleHover} onMouseOut={handleHoverOut}>Login</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;