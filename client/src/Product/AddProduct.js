import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stocked, setStocked] = useState(false);
    
    const postProduct = () => {
        if (name === '' || category === '' || price === '') {
            alert('Please do not leave blank')
        }
        else {
            axios.post("http://localhost:3001/create", {
                name: name,
                category: category,
                price: price,
                stocked: stocked,
                }).then(res => {
                    console.log(res.data);
                });
        }
    };

    return (
        <form onSubmit={postProduct}>
            <h1>INSERT</h1>
            <label>Name:</label>
            <input type="text" onChange={event =>{setName(event.target.value)}}/>
            <label>Category:</label>
            <select onChange={event => {setCategory(event.target.value)}}>
                <option>Please select category</option>
                <option value="Sporting Goods">Sporting Goods</option>
                <option value="Foods">Foods</option>
                <option value="Electronics">Electronics</option>
            </select>
            <label>Price:</label>
            <input type="text" onChange={event =>{setPrice(event.target.value)}}/>
            <label>Stocked:</label>
            <input type="checkbox" checked={stocked} onChange={() => {setStocked(prev => !prev)}}/>
            <input type="submit" value="送出"/>
        </form>
    );
}

export default AddProduct;
