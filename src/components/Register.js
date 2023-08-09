import React, { useContext, useState, useEffect } from 'react'
import { adddata } from './context/ContextProvider';
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate, Link } from 'react-router-dom'
import { signup, auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Register = () => {
    const [authUser, setAuthUser] = React.useState(null);

    const { udata, setUdata } = useContext(adddata);

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

    const addinpdata = async (e) => {
        e.preventDefault();

        const { name, email, desc, age } = inpval;

        if (name === "") {
            alert("name is required")
        } else if (email === "") {
            alert("email is required")
        } else if (!email.includes("@")) {
            alert("enter valid email")
        } else if(desc === "") {
            alert("desc is required")
        } else if (age === "") {
            alert("age is required")
        } else {
            const res = await fetch("/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, email, desc, age
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error");
                alert("error");
            } else {
                navigate("/home")
                setUdata(data)
                console.log("data added");
            }
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

    return (
        <div className="container">
            <Link to='/home'>home</Link>

            <form className="mt-4" onSubmit={addinpdata}>
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
export default Register;
