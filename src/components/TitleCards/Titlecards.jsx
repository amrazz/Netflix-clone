import React, { useEffect, useRef, useState } from 'react';
import cards_data from '../../assets/cards/Cards_data';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Titlecards.css'
  
function Titlecards(props) {
  const [apiData, setApiData] = useState([])
  const cardRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2IyZTAzN2E2ZGZmYzIwOGUxZjMyNGE1NzkxMDY3ZiIsIm5iZiI6MTcyNDAzNzcwMS40NjkxMzksInN1YiI6IjY2YzJiOTBjNGE2ZWNjYzRiNDZlMzM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1QrYnBbMnMt2TBnhe56NV6z_sHycG15immo39rx4Btg'
    }
  };
  


  function handleWheel(event){
    event.preventDefault();
    const scrollAmount = event.deltaY * 3;
    cardRef.current.scrollLeft += scrollAmount;
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try{
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${props.category ? props.category : "now_playing"}?`, options
        );
        setApiData(response.data.results);
      }catch (error){
        console.error("Error while fetching data", error);
      }
    }
    fetchMovies();
    cardRef.current.addEventListener('wheel', handleWheel);
  },[]);


  return (
    <div className='card-title'>
      <h2>{props.title ? props.title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardRef}>
        {apiData.map((item, index) =>{
           return <Link to={`/player/${item.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + item.backdrop_path} alt="" className='item-image'/>
            <p>{item.original_title}</p>
            </ Link>
        })}
      </div>
      
    </div>
  )
}

export default Titlecards
