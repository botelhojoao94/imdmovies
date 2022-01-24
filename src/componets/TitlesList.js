import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Titles from './Titles'
import Pagination from './Pagination';
import Axios from 'axios'

export default function TitlesList() {

    const [titles, setTitles] = useState([])

    const dispatch = useDispatch()
    const currentPage = useSelector((state) => { return state.currentPageReducer })
    const currentTitle = useSelector((state) => { return state.titleReducer })
    const totalPages = useSelector((state) => { return state.totalPagesReducer })



    useEffect(() => {

        if (Object.keys(currentTitle).length != 0) {
            var options = {
                method: 'GET',
                url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
                params: { s: `${currentTitle.title}`, r: 'json', page: `${currentPage}`, type: `${currentTitle.typeTitle || ''}` },
                headers: {
                    'x-rapidapi-host': `${process.env.REACT_APP_API_HOST}`,
                    'x-rapidapi-key': `${process.env.REACT_APP_API_KEY}`
                }
            };

            Axios.request(options).then(function (response) {
                if (response.data.Response === "True") {
                    setTitles(response.data.Search)
                    dispatch({ type: 'TOTAL_PAGES', totalPages: (Math.ceil(response.data.totalResults / 10)) })
                }
            }).catch(function (error) {
                console.error(error);
            });
        }

    }, [currentTitle, currentPage])

    return (
        <div className="first-page">
            <div className="titles-list">
                {titles.map((title, key) => {
                    return (
                        <Titles key={key} name={title.Title} year={title.Year} poster={title.Poster} type={title.Type} id={title.imdbID} />
                    )
                })}
            </div>
            <Pagination />
        </div>
    )
}