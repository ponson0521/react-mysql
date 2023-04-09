import React, { useState, useContext } from 'react';
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
    const [changeType, setChangeType] = useState(null);
    const [change, setChange] = useState('');
    const name = product.stocked ?
    product.name :
    <span >
        {product.name}
    </span>;

    const clickDelete = () => {
        axios.delete(`http://localhost:3001/remove/${product.id}`)
        .then(res => {
            console.log(res.data);
            setProductList(prev => prev.filter(obj => {
                return obj.id !== product.id
            }));
        });
    };

    const update = () => {
        if (changeType === 'name') {
            axios.put("http://localhost:3001/update", { name:name, change: change }).then(
                res => {
                    console.log(res.data);
                    setChangeType(null);
                    window.location.reload();
                }
            )
        };
        if (changeType === 'price') {
            axios.put("http://localhost:3001/update", { name:name, price: change }).then(
                res => {
                    console.log(res.data);
                    setChangeType(null);
                    window.location.reload();
                }
            )
        };
    };
    console.log(changeType);

    return (
    <tr>
        <td className='x' onClick={clickDelete}>x</td>
        <td onClick={() => {setChangeType('name')}}>{name}</td>
        <td onClick={() => {setChangeType('price')}}>{product.price}</td>
        {changeType === null ? null : 
        <td>
            <input type='text' value={change} onChange={event => {setChange(event.target.value)}}/>
            <input type='submit' onClick={update}/>
        </td>}
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
