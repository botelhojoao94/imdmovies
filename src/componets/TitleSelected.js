
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import StarImg from '../assets/images/star.svg'
import ReturnImg from '../assets/images/return.svg'
import Axios from 'axios'

export default function () {

    const [title, setTitle] = useState([])
    const currentTitle = useSelector((state) => { return state.titleReducer })

    useEffect(() => {
        sessionStorage.setItem("SearchTitleValue", '')
        sessionStorage.setItem("TypeValue", '')
    }, [])

    useEffect(() => {

        if (currentTitle.id) {
            var options = {
                method: 'GET',
                url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
                params: { r: 'json', i: `${currentTitle.id}` },
                headers: {
                    'x-rapidapi-host': `${process.env.REACT_APP_API_HOST}`,
                    'x-rapidapi-key': `${process.env.REACT_APP_API_KEY}`
                }
            };

            Axios.request(options).then(function (response) {
                setTitle(response.data)
            }).catch(function (error) {
                console.error(error);
            });

        }

    }, [currentTitle]);

    function handleReturn() {
        const firstPage = document.getElementsByClassName("first-page")
        const titleSelected = document.getElementsByClassName("title-selected")
        firstPage[0].style.display = "flex"
        titleSelected[0].style.display = "none"
    }


    return (
        <div className="title-selected">
            <img className="return-btn" src={ReturnImg} alt="return" onClick={() => {handleReturn()}}></img>
            <div className="top-info">
                <div className="basic-info">
                    <h1 className="selected-title">{title.Title}</h1>
                    <p>{title.Year} | {title.Runtime}</p>
                </div>
                <div className="rating">
                    <h2> <img className="star-rating" src={StarImg} alt="star"></img> {title.imdbRating}/10</h2>
                </div>
            </div>
            <div className="more-info">
                <div className="poster">
                    <img src={title.Poster} alt="poster"></img>
                </div>
                <div className="adicional-info">
                    <p><strong>Released: </strong>{title.Released}</p>
                    <p><strong>Country: </strong>{title.Country}</p>
                    <p><strong>Plot: </strong>{title.Plot}</p>
                    <p><strong>Genre: </strong>{title.Genre}</p>
                    <p><strong>Director: </strong>{title.Director}</p>
                    <p><strong>Writer: </strong>{title.Writer}</p>
                    <p><strong>Actors: </strong>{title.Actors}</p>
                    <p><strong>Language: </strong>{title.Language}</p>
                    <p><strong>Awards: </strong>{title.Awards}</p>
                </div>
            </div>
        </div>
    )
}