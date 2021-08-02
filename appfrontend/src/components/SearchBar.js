const SearchBar = ({getRefByTag}) => {
    const searchTag = (e) => {
        if (e.key === 'Enter') {
            getRefByTag(e.target.value)
            e.target.value = ''
        }
    }

    return (
        <div id="search">
            <h1>Input a keyword and press enter to search:</h1>
            <input type="text" onKeyDown={searchTag}/>
        </div>
    )
}

export default SearchBar
