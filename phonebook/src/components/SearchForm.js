import React from 'react'

const SearchForm = ({newSearch, handleNewSearch}) => {
    return (
        <div>
            <h2>Search</h2>
            <form>
                filter: shown with <input value={newSearch} onChange={handleNewSearch}></input>
            </form>
        </div>
    )
}


export default SearchForm