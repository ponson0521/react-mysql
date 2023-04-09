import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import AddProduct from './AddProduct';


const FilterableProductTable = () => {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setIsStockOnly] = useState(false);
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/get").then(res => {
            setProductList(res.data);
        });
        }, []
    );

    return (
    <div>
        <filterContext.Provider value={{filterText, setFilterText, inStockOnly, setIsStockOnly, productList, setProductList}}>
            <AddProduct />
            <br/>
            <SearchBar />
            <br/>
            <ProductTable productList={productList}/>
        </filterContext.Provider>
    </div>
    );
}
  
export const filterContext = React.createContext();
export default FilterableProductTable;
