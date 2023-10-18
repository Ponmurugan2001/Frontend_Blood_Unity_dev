import React, { useState } from 'react';
import { Navbar, Brand } from './Components';
import { Blog, Feature, Footer, Whatblood, Header } from './containers';
import SlidingCards from './containers/cards/Cards.jsx';
import './Landing.css';


  const Landing = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setCursorPosition({ x: clientX, y: clientY });
    };
  
    return (
      <div className='App' onMouseMove={handleMouseMove}>
        <div className='gradient_bg'>
          <Navbar />
          <Header />
        </div>
        <Brand />
        <Whatblood />
        <Blog />
        <Feature />
        <SlidingCards />
        <Footer />
        <div
          className="neon-glow"
          style={{ left: cursorPosition.x, top: cursorPosition.y }}
        ></div>
      </div>
    );
  };
  
  export default Landing;
  

