import React, { useState } from 'react'
import Nav from '../Components/Nav'
import Sidebar from '../Components/Sidebar'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEvents = () => {

    const [eventTitle, setEventTitle] = useState('')
    const [eventDescp, setEventDescp] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventImage, setEventImage] = useState(null);
    const [loading, setLoading] = useState(false)
    const token = useSelector(state => state.user.token)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        let data = new FormData();
        data.append('EventName', eventTitle);
        data.append('EventDescp', eventDescp);
        data.append('EventDate', eventDate);
        data.append('EventImage', eventImage);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://yourappdemo.com/NewsApp/Server/users/add-event',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
            data: data
        };

        try {
            const res = await axios.request(config);

            if (res.data.success === true) {
                SuccessNotify(res.data.message)
                setLoading(false)
                setTimeout(() => {
                    window.location.reload()
                }, 3000);
            } else {
                ErrorNotify(res.data.message)
                setLoading(false)
            }
            return res.data;
        } catch (error) {
            ErrorNotify(error.message)
            setLoading(false)
        }
    }

    return (
        <>
            <div class="loaderr" style={{position:"absolute",top:'50%',left:'50%', display: (loading === false ? 'none' : "block")}}></div>
            <ToastContainer />
            <div id="wrapper" style={{opacity: (loading === false ? 1 : 0.4)}}>
                <Sidebar />
                <div id="content-wrapper" class="d-flex flex-column">
                    <Nav />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-11 mx-auto shadow-lg p-3">
                                <h5 className='text-center mx-auto text-info'>ADD NEW EVENTS</h5>
                                <div className="row">
                                    <div className="col-6 mx-auto ">
                                        <form onSubmit={handleSubmit}>

                                            <div className="mb-3 ">
                                                <label htmlFor="region">Add a event title :</label>
                                                <input type='text' className='form-control' required onChange={(e) => setEventTitle(e.target.value)} placeholder='Enter a title'/>

                                            </div>

                                            <div className="mb-3 ">
                                                <label htmlFor="region">Add a event description :</label>
                                                <input type='text' className='form-control' required onChange={(e) => setEventDescp(e.target.value)} placeholder='Enter a description'/>

                                            </div>

                                            <div className="mb-3 ">
                                                <label htmlFor="region">Add a event date :</label>
                                                <input type='date' className='form-control' required onChange={(e) => setEventDate(e.target.value)} />

                                            </div>

                                            <div className="mb-3 ">
                                                <label htmlFor="region">Add a event image :</label>
                                                <input type='file' className='form-control' required onChange={(e) => setEventImage(e.target.files[0])} />

                                            </div>

                                            <div className="form-group mt-3">
                                                <input type="submit" name='addmusic' className='btn btn-info' />
                                            </div>
                                        </form>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEvents
