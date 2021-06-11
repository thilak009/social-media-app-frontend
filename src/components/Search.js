import React from 'react'
import {IoArrowBackSharp} from 'react-icons/io5';
import { useHistory } from 'react-router-dom';


function Search() {
    const history = useHistory()
    return (
        <div>
            <div className="search-container">
                <span style={{fontSize:"25px",cursor:"pointer",color:"#fd6868"}} onClick={()=>history.goBack()}>
                    <IoArrowBackSharp/>
                </span>
                <form>
                    <input type="text" placeholder="enter username"/>
                </form>
            </div>
        </div>
    )
}

export default Search
