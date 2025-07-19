import React, { useEffect, useRef, useState } from "react";
import cards_data from "../../assets/cards/Cards_data";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Titlecards.css";

function Titlecards({ category, title }) {
  const [apiData, setApiData] = useState([]);
  const cardRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: import.meta.env.VITE_AUTHORIZATION,
    },
  };

  function handleWheel(event) {
    event.preventDefault();
    const scrollAmount = event.deltaY * 3;
    cardRef.current.scrollLeft += scrollAmount;
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${
            category ? category : "now_playing"
          }?`,
          options
        );
        setApiData(response.data.results);
      } catch (error) {
        console.error("Error while fetching data", error);
      }
    };
    fetchMovies();
    cardRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="card-title">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData.map((item, index) => {
          return (
            <Link to={`/player/${item.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + item.backdrop_path}
                alt=""
                className="item-image"
              />
              <p>{item.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Titlecards;
