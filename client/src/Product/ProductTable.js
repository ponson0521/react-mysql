import React, { useContext } from 'react';
import axios from 'axios';
import { filterContext } from './FilterableProductTable';
import "./ProductTable.css"

const ProductCategoryRow = ({category}) => {
    return (
    <tr>
        <th colSpan="2" style={{color: "blue"}}>
            <hr/>
            {category}
            <hr/>
        </th>
    </tr>
    );
}

const ProductRow = ({product}) => {
    const {setProductList} = useContext(filterContext);
    const name = product.stocked ?
    product.name :
    <span >
        {product.name}
    </span>;

    const handleClick = () => {
        axios.delete(`http://localhost:3001/remove/${product.id}`)
        .then(res => {
            console.log(res.data);
            setProductList(prev => prev.filter(obj => {
                return obj.id !== product.id
            }));
        });
    };

    return (
    <tr>
        <td>{name}</td>
        <td>{product.price}</td>
        <button onClick={handleClick}>x</button>
    </tr>
    );
}
  
const ProductTable = ({productList}) => {
    const {filterText, inStockOnly} = useContext(filterContext)
    const rows = [];
    const lastCategory = new Set([]);
    console.log(productList);
    
    productList.forEach((product) => {
        if (product.name.indexOf(filterText) === -1) {
            return;
            }
            if (inStockOnly && !product.stocked) {
            return;
            }
            if (!(lastCategory.has(product.category))) {
                rows.push(
                    <ProductCategoryRow
                    category={product.category}
                    key={product.category} />
                );
            }
            rows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
            );
            lastCategory.add(product.category);
        });
    
    return (
    <table>
        <thead>
        </thead>
        <tbody>{rows}</tbody>
    </table>
    );
}

export default ProductTable;
