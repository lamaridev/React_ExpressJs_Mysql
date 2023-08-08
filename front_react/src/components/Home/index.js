import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Home() {

     const [values,setValues] = useState({
        email : "",
        password : ""
     })
     const [msg,setmsg]= useState('')
     const nav = useNavigate()
     const handlesubmit=(e)=>
     {
        e.preventDefault();
        axios.defaults.withCredentials=true;
        axios.post('http://localhost:8000/login',values)
        .then(result=>
            {
             if(result.data.status ==='password correcte')
             {
                setmsg('Login succesfuly')

                setTimeout(()=>
                {
                    nav('/welcome')
                },2500)
             }
             else
             {
                console.log(result)
                if(result.data.status==='password false')
                {
                 setmsg('echec de connexion')
                }
             }
            })
        .catch(err=>
            {
            console.log(err)
            })

        
     }

    return (
        <div className='d-flex justify-content-center mt-4 '>
        <form onSubmit={handlesubmit} className='w-50 '>
            <div className="form-outline" >
                <label className="form-label d-flex justify-content-center" htmlFor="Email">Email</label>
                <input onChange={e=>setValues({...values,email:e.target.value})}type="email" id="Email" className="form-control" />
            </div>
            <div className="form-outline " >
                <label className="form-label d-flex justify-content-center" htmlFor="password">Password</label>
                <input onChange={e=>setValues({...values,password:e.target.value})} type="password" id="Password" className="form-control" />
            </div>
            <div className='mt-2 d-flex justify-content-center'>
            <button type="submit" className="btn btn-primary ">Log in</button>
            </div>
            <div className='mt-2 d-flex justify-content-center'>
              <Link to="/signup" className='text-decoration-none'><p>Create account</p></Link>
            </div>
            {msg}
        </form>
       
    </div>
    
      )

}

export default Home