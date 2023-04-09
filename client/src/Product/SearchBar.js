import React, {useContext} from 'react';
import { filterContext } from './FilterableProductTable';

const SearchBar = () => {
    const {filterText, setFilterText, inStockOnly, setIsStockOnly} = useContext(filterContext)
    return (
    <form>
        <h1>Filter</h1>
        <input type="text" placeholder="Search..." value={filterText} onChange={event => {setFilterText(event.target.value)}} />
        <p>
        <input type="checkbox" checked={inStockOnly} onChange={() => {setIsStockOnly(prev => !prev)}} />
        {' '}
        Only show products in stock
        </p>
    </form>
    );
}

export default SearchBar;
