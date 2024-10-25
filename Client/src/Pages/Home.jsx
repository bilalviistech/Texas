import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import Sidebar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import { useSelector } from 'react-redux'

const Home = () => {

    const token = useSelector(state => state.user.token)
    const [myData, setMyData] = useState({})
    const [myProducts, setMyProucts] = useState([])

    useEffect(() => {
        const fetchMyData = async(e) => {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: 'https://yourappdemo.com/texassource/api/user/get-my-data',
                headers: { 
                  'Authorization': `Bearer ${token}`
                }
            };
              
            axios.request(config)
            .then((response) => {
                if(response.data.success === true){
                    setMyData(response.data.data)
                    setMyProucts(response.data.myProducts)
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        fetchMyData()
    }, [])
    console.log(myProducts.length)

    return (
        <div id="wrapper">
            <Sidebar />
            <div id="content-wrapper" class="d-flex flex-column">
                <Nav />
                <div class="container-fluid">
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800" style={{fontWeight:800}}>Dashboard</h1>
                    </div>
                    <div class="row">
                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xm font-weight-bold text-primary text-uppercase mb-1">
                                                Welcome</div>
                                                {
                                                    !myData._id ? (
                                                        <div class="loadingg"></div>
                                                    ) : (
                                                        <div class="h4 mb-0 font-weight-bold text-gray-800">
                                                            {myData.name}
                                                        </div>
                                                    )
                                                }
                                            
                                                
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa fa-users fa-2x text-gray-600"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 mb-4">
                            <div class="card border-left-secondary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xm font-weight-bold text-secondary text-uppercase mb-1">
                                                Number Of Your Products Listing</div>
                                                {
                                                    myProducts.length <= 0 ? (
                                                        <div class="loadingg"></div>
                                                    ) : (
                                                        <div class="h4 mb-0 font-weight-bold text-gray-800">
                                                            {myProducts.length}
                                                        </div>
                                                    )
                                                }
                                            
                                        </div>
                                        <div class="col-auto">
                                            <i class="fas fa-th-list fa-2x text-gray-600"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <div className="container-fluid">
                    <h1 style={{ textAlign: "start", fontWeight: 700 }}>All Users List</h1>
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
                                userData.docs.length > 0 && (
                                    userData.docs.map((e, i) => {
                                        return (
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{e.name}</td>
                                                <td>{e.email}</td>
                                                <td>{e.city}</td>
                                                <td>{e.InstallmentVerify}</td>
                                            </tr>
                                        )
                                    })
                                )
                            }


                        </tbody>

                    </table>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {[...Array(userData.totalPages)].map((_, index) => (
                            <p
                                key={index}
                                style={{
                                    background: page === index + 1 ? "#4e73df" : "transparent",
                                    padding: "10px 20px",
                                    cursor: "pointer",
                                    color: page === index + 1 ? "#fff" : "#000",
                                    borderRadius:"5px"
                                }}
                                onClick={() => setPage(index + 1)}
                            >
                                {index + 1}
                            </p>
                        ))}
                    </div>
                </div> */}
                <Footer />
            </div>
        </div>
    )
}

export default Home