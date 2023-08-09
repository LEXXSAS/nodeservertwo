import React, { useState, useEffect, useContext } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import FadeIn from 'react-fade-in';
import { signup, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Home = () => {
    const [authUser, setAuthUser] = React.useState(null);
    let navigate = useNavigate();

    const [getuserdata, setUserdata] = useState([]);
    console.log("getuserdata:", getuserdata);

    const { udata, setUdata } = useContext(adddata);

    const {updata, setUPdata} = useContext(updatedata);

    const {dltdata, setDLTdata} = useContext(deldata);

    const getdata = async () => {
        
        const res = await fetch("/getusers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log("getdata:", data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            setDLTdata(deletedata)
            getdata();
        }

    }

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
          if (user) {
            setAuthUser(user)
          } else {
            setAuthUser(null)
            navigate('/')
          }
        })
    
        return () => {
          listen();
        }
        
      }, [])
    
    //   let name = null;
    
    //   if (authUser !== null) {
    //     name = authUser;
    //   } else {
    //     return;
    //   }

    const userSignOut = () => {
        signOut(auth).then(() => {
          console.log('вы вышли')
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('email');
        }).catch(error => console.log(error))
      }

    return (

        <>
            {
                udata ?
                    <>
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{udata.name}</strong>  added succesfully!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }
            {
                updata ?
                    <>
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{updata.name}</strong>  updated succesfully!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }

            {
                dltdata ?
                    <>
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>{dltdata.name}</strong>  deleted succesfully!
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </> : ""
            }


            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-2">
                        <Link to="/register" className="btn btn-primary">Add data</Link>
                    </div>

                    
                    
                    <Box sx={{p: 2, width: '100%'}}>
                    {getuserdata.length <= 0 ? <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 325 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{fontWeight: 'bold'}}>Loading...</TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}></TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}></TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}></TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}></TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer> : null}
                    {/* <FadeIn> */}
                    {getuserdata.length > 0 ? 
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 325 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{fontWeight: 'bold'}}>id</TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}>Username</TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}>email</TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}>Description</TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}></TableCell>
                            <TableCell align="left" style={{fontWeight: 'bold'}}></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {getuserdata.map((element, id) => (
                            <TableRow key={element.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row"> <b>{id + 1}</b></TableCell>
                            <TableCell component="th" scope="row"> {element.name}</TableCell>
                            <TableCell component="th" scope="row"> {element.email}</TableCell>
                            <TableCell component="th" scope="row"> {element.desc}</TableCell>
                            <TableCell align='right'><Link to={`view/${element.id}`}><button className="btn btn-success"><RemoveRedEyeIcon /></button></Link></TableCell>
                            <TableCell align='right'><Link to={`edit/${element.id}`}><button className="btn btn-primary"><CreateIcon /></button></Link></TableCell>
                            <TableCell align='right'><button className="btn btn-danger" onClick={() => deleteuser(element.id)}><DeleteOutlineIcon /></button></TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer> : null}
                    {/* </FadeIn> */}
                    </Box>
                    
                    

                </div>
            </div>
        </>
    )
}

export default Home
