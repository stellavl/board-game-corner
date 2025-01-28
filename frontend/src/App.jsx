  import React from "react";
  import Home from "./pages/Home.jsx";
  import Header from "./components/Header.jsx";
  import Footer from "./components/Footer.jsx";
  import 'bootstrap/dist/css/bootstrap.min.css';

  const appStyles = {
    backgroundColor: 'var(--color-soft-yellow)', 
    fontFamily: 'var(--font-primary)',
  };

  const App = () => {
    return (
      <div style={appStyles}>
          <Header />
            <Home />
          <Footer/>
      </div>
    );
  };

  export default App;
