import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

let totalPageShowed = 5
let startPage = 1
let finishPage = startPage + totalPageShowed - 1
let pagesArray = []


export default function Pagination(props) {

    const dispatch = useDispatch()

    const totalPages = useSelector((state) => { return state.totalPagesReducer })
    const currentPage = useSelector((state) => { return state.currentPageReducer })

    const [pageInterval, setPageInterval] = useState([1])

    useEffect(() => {
        pagesArray = []
        for (let i = 1; i <= totalPages; i++) {
            pagesArray.push(i)
        }
        setPageInterval(pagesArray)
        paginate()
    }, [totalPages])

    const backwardBtn = useRef()
    const forwardBtn = useRef()

    function paginate() {
        let contents = []
        if (totalPageShowed > totalPages) {
            for (let i = startPage; i <= totalPages; i++) {
                contents.push(i)
            }
        } else {
            for (let i = startPage; i <= finishPage; i++) {
                contents.push(i)
            }
        }
        setPageInterval(contents)
    }

    function backward() {
        if (currentPage >= 2) {
            dispatch({ type: 'DECREMENT' })
            if (startPage > 1) {
                startPage--
                finishPage--
            }
            if (currentPage === 1)
                backwardBtn.current.style.display = "none"
            if (currentPage < totalPages)
                forwardBtn.current.style.display = "flex"
        }
        paginate()
    }

    function forward() {
        if (currentPage < totalPages) {
            dispatch({ type: 'INCREMENT' })
            if (finishPage < totalPages) {
                startPage++
                finishPage++
            }
            if (currentPage > 1)
                backwardBtn.current.style.display = "flex"
            if (currentPage === totalPages)
                forwardBtn.current.style.display = "none"
        }
        paginate()
    }

    function changePage(e) {
        dispatch({ type: 'PAGE', currentPage: Number(e.target.id) })
        if (currentPage > 1)
            backwardBtn.current.style.display = "flex"
        else
            backwardBtn.current.style.display = "none"
        if (currentPage < totalPages)
            forwardBtn.current.style.display = "flex"
        else
            forwardBtn.current.style.display = "none"
        paginate()
    }

    useEffect(() => {
        paginate()
        backwardBtn.current.style.display = "none"
    }, [])


    return (
        <div className="pagination-bar">
            <div ref={backwardBtn} className="page-button" onClick={() => { backward() }}> &#60; </div>
            {pageInterval.map((page, key) => {
                if (page === currentPage) {
                    return (
                        <div className="page-button selected-page-button" key={key} id={page} onClick={(e) => { changePage(e) }}> {page} </div>
                    )
                }
                else {
                    return (
                        <div className="page-button" key={key} id={page} onClick={(e) => { changePage(e) }}> {page} </div>
                    )
                }
            })}
            <div ref={forwardBtn} className="page-button" onClick={() => { forward() }}> &#62; </div>
        </div>
    )
}