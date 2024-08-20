import React from "react";
import NavBar from "../../components/Navbar/navBar";
import Hero from "../../assets/hero.jpg"; 
import Hero_title from "../../assets/hero-title.png";
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import "./Home.css";
import Titlecards from "../../components/TitleCards/Titlecards";
import Footer from "../../components/Footer/Footer";


const Home = () => {
  return (
    <div className="home">
      <NavBar />
      <div className="hero">
      <img src={'https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg'} alt="" className="hero-img" />
      <div className="hero-caption">
          <img src={Hero_title} alt="" className="hero-title" />
          <p>
            A listless Wade Wilson toils away in civilian life with his days as
            the morally flexible mercenary, Deadpool, behind him. But when his
            homeworld faces an existential threat, Wade must reluctantly suit-up
            again with an even more reluctant Wolverine.
          </p>
          <div className="hero-btns">
          <button className="btn"><img src={play_icon} alt="" />Play</button>
          <button className="btn dark-btn"><img src={info_icon} alt="" />More Info</button>
          </div>
      <Titlecards />
        </div>
      </div>
      <div className="more-cards">
      <Titlecards title={"Blockbuster movies"} category={"top_rated"} />
      <Titlecards title={"Only on Netflix"} category={"popular"} />
      <Titlecards title={"Upcoming Movies"} category={"upcoming"} />
      <Titlecards title={"Top pics for you"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
