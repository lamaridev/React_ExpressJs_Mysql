import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SinUp() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState(""); // Use useState to handle the error message
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/signup', values)
      .then(result => {
        if (result.data.status === "success") {
            setMsg("Inscription succefuly")
           setTimeout(()=>
           {
            navigate('/');
           },2500)
        } else {
          if (result.data.error === "Email already exists") {
            setMsg("Email already exists"); // Update the error message state
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className='d-flex justify-content-center mt-4 '>
      <form onSubmit={handleSubmit} className='w-50'>
      <div className="form-outline " >
            <label className="form-label d-flex justify-content-center" htmlFor="Name">Name</label>
            <input onChange={e=>setValues({...values,name:e.target.value})} type="text" id="Name" className="form-control" />
           
        </div>
        <div className="form-outline" >
            <label className="form-label d-flex justify-content-center" htmlFor="Email">Email</label>
            <input onChange={e=>setValues({...values,email:e.target.value})} type="email" id="Email" className="form-control" />
        </div>
        <div className="form-outline " >
            <label className="form-label d-flex justify-content-center" htmlFor="password">Password</label>
            <input onChange={e=>setValues({...values,password:e.target.value})} type="password" id="Password" className="form-control" />
        </div>
        <div className='mt-2 d-flex justify-content-center'>
          <button type="submit" className="btn btn-primary">Sign up</button>
        </div>
        <div className='mt-2 d-flex justify-content-center'>
          <Link to="/" className='text-decoration-none'><p>i have account</p></Link>
        </div>
        <div>
        <p>{msg}</p> 
      </div>
      </form>
      
    </div>
  );
}

export default SinUp;
