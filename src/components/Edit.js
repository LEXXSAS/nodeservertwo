import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

   const {updata, setUPdata} = useContext(updatedata)

    const navigate = useNavigate();

    const [inpval, setINP] = useState({
        name: "",
        email: "",
        desc: "",
        age: ""
    })

    const setdata = (e) => {
        const { name, value } = e.target;
        setINP((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`/induser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setINP(data[0])
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const { name, email, desc, age } = inpval;

        const res2 = await fetch(`/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name, email, desc, age
            })
        });

        const data2 = await res2.json();
        console.log("data2", data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            navigate("/home")
            setUPdata(data2);
        }

    }

    return (
        <div className="container">
            <Link to='/'>home2</Link>
            <form className="mt-4" onSubmit={updateuser}>
            <Box 
                sx={{
                    display: 'grid',
                    gap: 2,
                    maxWidth: '26em'
                }}
                >
                <TextField variant='outlined' label="Enter name" type="text" value={inpval.name} onChange={setdata} name="name"  id="exampleInputEmail1" aria-describedby="emailHelp" />
                <TextField variant='outlined' label="Enter email" type="email" value={inpval.email} onChange={setdata} name="email"  id="exampleInputPassword1" />
                <TextField label="Enter age" variant='outlined' type="text" value={inpval.age} onChange={setdata} name="age" id="exampleInputPassword1" />
                <TextField multiline rows={4} label="Enter description" variant='outlined' name="desc" value={inpval.desc} onChange={setdata} />
                <Button variant="contained" type="submit" className="btn btn-primary">Submit</Button>
            </Box>
            </form>
        </div>
    )
}

export default Edit;
