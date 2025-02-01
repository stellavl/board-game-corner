  import React from "react";
  import Main from "./components/common/Main.jsx";
  import Header from "./components/header/NavBar.jsx";
  import Footer from "./components/footer/Footer.jsx";
  import { BrowserRouter as Router } from 'react-router-dom';
  import 'bootstrap/dist/css/bootstrap.min.css';

  const appStyles = {
    backgroundColor: 'var(--color-soft-yellow)', 
    fontFamily: 'var(--font-primary)',
  };

  const App = () => {
    return (
    <Router>
      <div style={appStyles}>
        <Header />
        <Main />
        <Footer/>
      </div>
    </Router>
      
    );
  };

  export default App;
