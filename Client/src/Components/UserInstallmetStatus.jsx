import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'
import Footer from './Footer'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserInstallmetStatus = () => {

    const token = useSelector(state => state.user.token)
    const [pendingUser, setPendingUser] = useState({ docs: [] })
    const [updatedStatus, setUpdatedStatus] = useState('')
    // const [category, setCategory] = useState('')
    // const [verifyStatus, setVerifyStatus] = useState('')

    useEffect(() => {
        const FetchPendingStatus = async () => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'http://localhost:3027/buynbook/api/GetUserVerifyPending?page=1',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };

            axios.request(config)
                .then((response) => {
                    setPendingUser(response.data.data)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        FetchPendingStatus()
    }, [updatedStatus])

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

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const verifyStatus = e.target.getAttribute('data-status');
        const verifierId = e.target.getAttribute('data-id');



        let data = JSON.stringify({
            "ID": verifierId,
            "status": verifyStatus
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3027/buynbook/api/UserAcpOrReject',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: data
        };

        try {
            const res = await axios.request(config);
            // console.log('response', res.data);
            if (res.data.success === true) {
                SuccessNotify(res.data.message)
                setUpdatedStatus('updated')
                // setTimeout(() => {
                //     window.location.reload()
                // }, 3000);
            } else {
                ErrorNotify(res.data.message)
                setUpdatedStatus('updated')
            }
            return res.data;
        } catch (error) {
            ErrorNotify(error.message)
        }
    }

    return (
        <>
            <ToastContainer />
            <div id="wrapper">
                <Sidebar />
                <div id="content-wrapper" class="d-flex flex-column">
                    <Nav />
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-11 mx-auto shadow-lg p-3">
                                <h5 className='text-center mx-auto text-info'>USER INSTALLMENT PENDING STATUS</h5>
                                <table class="table table-striped table-dark">
                                    <thead style={{textAlign:"center"}}>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">City</th>
                                            <th scope="col">Installment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{textAlign:"center"}}>
                                        {
                                            pendingUser.docs.length > 0 ? (
                                                pendingUser.docs.map((e, i) => {
                                                    return (
                                                        <tr>
                                                            <th scope="row">{i + 1}</th>
                                                            <td>{e.name}</td>
                                                            <td>{e.email}</td>
                                                            <td>{e.city}</td>
                                                            <td>{e.InstallmentVerify}</td>
                                                            <td >
                                                                <div className='d-flex'>
                                                                    <p className='text-info' style={{ cursor: "pointer" }} data-status='Accepted' data-id={e._id} onClick={handlerSubmit}>
                                                                        ACCEPTED
                                                                    </p>

                                                                    <p className='text-danger' style={{ cursor: "pointer" }} data-status='Rejected' data-id={e._id} onClick={handlerSubmit}>
                                                                        REJECTED
                                                                    </p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            ) : (
                                                    <p style={{color:"white",paddingTop:"5px"}}>No Any Pending Status.</p>
                                            )
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default UserInstallmetStatus