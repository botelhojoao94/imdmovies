import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function Titles(props) {
    
    const currentTitle = useSelector((state) => { return state.titleReducer })
    const dispatch = useDispatch()

    const firstPage = document.getElementsByClassName("first-page")
    const titleSelected = document.getElementsByClassName("title-selected")

    function handleClick(e) {
        firstPage[0].style.display = "none"
        titleSelected[0].style.display = "flex"
        console.log("Title ID: " + e.target.id)
        dispatch({type: 'CHANGE_TITLE', id: e.target.id, title: currentTitle.title})
    }

    return (
        <div className="titles-card" onClick={(e) => { handleClick(e) }} id={props.id}>
            <div>
                <h5 className="card-name">{props.name}</h5>
                <p className="card-details">{props.type} {props.year}</p>
            </div>
            <img className="poster" src={props.poster} alt="poster"></img>
        </div>
    )
}