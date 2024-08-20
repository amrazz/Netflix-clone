import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  
  const navigate = useNavigate();
  const {id} = useParams()
  const [apiData, setApiData] = useState({
    name : "",
    key : "",
    published_at : "",
    typeof : ""
  });

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${id}/videos`,
    params: {language: 'en-US'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1N2IyZTAzN2E2ZGZmYzIwOGUxZjMyNGE1NzkxMDY3ZiIsIm5iZiI6MTcyNDAzNzcwMS40NjkxMzksInN1YiI6IjY2YzJiOTBjNGE2ZWNjYzRiNDZlMzM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1QrYnBbMnMt2TBnhe56NV6z_sHycG15immo39rx4Btg'
    }
  };
  useEffect(() => {
    axios
  .request(options)
  .then(function (response) {
    setApiData(response.data.results[0]);
  })
  .catch(function (error) {
    console.error(error);
  });
  }, []);


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => {navigate(-2)}} />      
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} width='90%' height='90%'
       frameborder="0" title='trailer' allowFullScreen></iframe>
       <div className="player-info">
       <p> {apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
       </div>
    </div>
  )
}

export default Player
