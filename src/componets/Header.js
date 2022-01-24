import React from 'react'
import Magnifier from '../assets/images/magnifier.svg'
import { useDispatch } from 'react-redux'

export default function Header() {

    const dispatch = useDispatch()

    function handleSearchValue(e) {
        sessionStorage.setItem("SearchTitleValue", e.target.value)
    }

    function handleTypeValue(e) {
        sessionStorage.setItem("TypeValue", e.target.value)
    }

    function handleCatchTitle() {
        if (sessionStorage.getItem("SearchTitleValue") != '') {
            const firstPage = document.getElementsByClassName("first-page")
            const titleSelected = document.getElementsByClassName("title-selected")
            firstPage[0].style.display = "flex"
            titleSelected[0].style.display = "none"
            dispatch({ type: 'PAGE', currentPage: 1 })
            dispatch({ type: 'CHANGE_TITLE', title: sessionStorage.getItem("SearchTitleValue"), typeTitle: sessionStorage.getItem("TypeValue"), id: '' })
        }
    }

    return (
        <header>
            <div className="logo">
                IMDMovies
            </div>
            <div className="search-bar">

                <select className="dropdown-header-option" onChange={(e) => { handleTypeValue(e) }}>
                    <option value="">All</option>
                    <option value="movie">Movies</option>
                    <option value="series">Series</option>
                </select>

                <input className="search-area" type="text" placeholder="Search Title" onChange={(e) => { handleSearchValue(e) }}></input>

                <img className="magnifier" src={Magnifier} alt="magnifier" onClick={() => { handleCatchTitle() }}></img>

            </div>
        </header>
    )
}