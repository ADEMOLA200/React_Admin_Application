import axios from 'axios';
import React, {SyntheticEvent, useState} from 'react';
import {Redirect} from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import ImageUpload from "../../components/ImageUpload";

const ProductCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0)
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('http://localhost:8000/api/products', {
            title,
            description,
            image,
            price
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to="/products"/>;
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Title</label>
                    <input className="form-control"
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label>Description</label>
                    <textarea className="form-control"
                              onChange={e => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label>Image</label>
                    <div className="input-group">
                        <input className="form-control"
                               value={image}
                               onChange={e => setImage(e.target.value)}
                        />
                        <ImageUpload uploaded={setImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label>Price</label>
                    <input type="number" className="form-control"
                           onChange={e => {
                            // convert e.target.vale to int the use the setState
                            // console.log(e.target.value)
                            const intValue = parseInt(e.target.value, 10);
                            setPrice(intValue);
                            console.log(setPrice)
                           }}
                          
                    />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductCreate;
