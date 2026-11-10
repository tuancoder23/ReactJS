
function SearchBar({ search, onSearchChange }) {
    return (
        <div>
            <input type="text" value={search} onChange={(e) => 
                onSearchChange(e.target.value)} placeholder="Search books"/> 
        </div>
    );
}

export default SearchBar;