import React, { useState } from 'react';
import Nav from './Nav'
import Sidebar from './Sidebar'
import Footer from './Footer'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const AddProduct = () => {

    const token = useSelector(state => state.user.token)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [productImages, setProductImages] = useState([])
    const [loading, setLoading] = useState(false)

    const SuccessStyle = {
        background: 'green',
        color: 'white',
        fontSize: '16px',
        borderRadius: '8px',
    };
    const SuccessProgressStyle = {
        background: 'green',
    };

    const SuccessNotify = (message) => toast(message, {
        toastStyle: SuccessStyle,
        progressBar: true,
        progressStyle: SuccessProgressStyle,
        progressClassName: 'toast-progress'
    });

    const ErrorStyle = {
        background: 'green',
        color: 'white',
        fontSize: '16px',
        borderRadius: '8px',
    };
    const ErrorProgressStyle = {
        background: 'red',
    };

    const ErrorNotify = (message) => toast(message, {
        toastStyle: ErrorStyle,
        progressBar: true,
        progressStyle: ErrorProgressStyle,
        progressClassName: 'toast-progress'
    });

    const hanlderFile = (e) => {
        setProductImages(e.target.files)
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        let data = new FormData();
        data.append('productTitle', title);
        data.append('productDescp', description);

        for (let i = 0; i < productImages.length; i++) {
            data.append('images', productImages[i]);
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://yourappdemo.com/texassource/api/user/add-product',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                response.data.success === true ? setTimeout(() => {
                    setLoading(false)
                    SuccessNotify(response.data.message)
                }, 500) : 
                setTimeout(() => {
                    setLoading(false)
                    ErrorNotify(response.data.message)
                }, 500)
                
            })
            .catch((error) => {
                setLoading(false)
                ErrorNotify(error.message)
                console.log(error);
            });
    }

    useEffect(() => {

    }, [])
    console.log('this is files array',productImages)

    return (
        <>
            <div class="loaderr" style={{ position: "absolute", top: '50%', left: '50%', display: (loading === false ? 'none' : "block") }}></div>
            <ToastContainer />

            <div id="wrapper" style={{ opacity: (loading === false ? 1 : 0.4) }}>
                <Sidebar />
                <div id="content-wrapper" class="d-flex flex-column">
                    <Nav />
                    <div className="container-fluid ">
                        <div className="row">
                            <h5 className='text-center mx-auto text-info p-3' style={{textDecoration:"underline",fontWeight:700,letterSpacing:"1px"}}>ADD PRODUCTS</h5>
                        </div>
                        <form onSubmit={handlerSubmit}>
                            <div class="form-group">
                                <label for="exampleFormControlInput1" style={{fontSize:'18px'}}>Product Title</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter product title" onChange={(e) => setTitle(e.target.value)} required/>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1" style={{fontSize:'18px'}}>Product Description</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter product description" onChange={(e) => setDescription(e.target.value)} required/>
                            </div>

                            <div class="form-group">
                                <label for="exampleFormControlFile1" style={{fontSize:'18px'}}>Upload Product Images
                                    <span style={{color:"red",fontSize:'16px'}}> <sub>*(upload upto 5 images)</sub></span>
                                </label>
                                <input type="file" class="form-control-file" id="exampleFormControlFile1" onChange={hanlderFile} multiple/>
                            </div>
                            <div class="form-group text-center">
                                <button type="submit" class="btn btn-success" disabled={loading ?? 'disabled'}>Add Product</button>
                            </div>
                        </form>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default AddProduct