import React,{memo, useEffect} from 'react';

// react-routerx
import { Outlet } from 'react-router-dom';

import Loader from './components/Loader'; 
// headers

import Header from './components/partials/header/header';
// footers
import  Footer  from './components/partials/footer/footer';

// scss
import './assets/landing-modules/scss/landing-pages.scss';
import "./assets/scss/hope-ui.scss"
import "./assets/scss/custom.scss"
import "./e-commerce.css"
//import "./assets/scss/customizer.scss"

import whatsappIcon from './assets/images/whatsappIcon.png';

const App = memo((props) => {
  useEffect(() => {
      document.body.classList.add('landing-pages');
  
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
  
      const handleScroll = () => {
        const drawerCanvas = document.querySelector('.drawer-canvas');
        const backButton = document.querySelector('.back-to-top');
  
        if (window.scrollY > 200) {
          drawerCanvas.classList.add('show-button');
          backButton.style.opacity = '1';
          backButton.style.pointerEvents = 'auto';
        } else {
          drawerCanvas.classList.remove('show-button');
          backButton.style.opacity = '0';
          backButton.style.pointerEvents = 'none';
        }
      };
  
      const backButton = document.querySelector('.back-to-top');
      backButton.addEventListener('click', scrollToTop);
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        document.body.classList.remove('landing-pages');
        backButton.removeEventListener('click', scrollToTop);
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  

  return (
    <>
     <Loader />
      <main className="main-content">
        <div className="position-relative">
          <Header />
        </div>
        <Outlet />
      </main>
       <Footer />
        <div className="chatbot" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <div className="animated no-animation ccw-no-hover-an">
          <a target="_blank" href="https://web.whatsapp.com/send?phone=2348100531161 &amp;text=" rel="noreferrer" >
            <img className="analytics" id="style-9" style={{ height: '50px', width: '50px' }}  src={whatsappIcon} alt="WhatsApp chat" />
          </a>
        </div>
      </div>
      <div className="drawer-canvas">
        <a href="#main-container" className="back-to-top hidden-sm"
          data-shape="circle"
          data-alignment="left"
          title="Go to top" aria-label="Go to top"
          style={{ opacity: '0', pointerEvents: 'none' }}>
          <svg className="icon" width="15" height="15" viewBox="0 0 20 20">
            <path d="M10,0L9.4,0.6L0.8,9.1l1.2,1.2l7.1-7.1V20h1.7V3.3l7.1,7.1l1.2-1.2l-8.5-8.5L10,0z"/>
          </svg>	
        </a>
      </div>

    </>
  )
})


export default App