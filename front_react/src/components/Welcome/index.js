import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Welcome() {

  const [auth,setaut]=useState(false);

  useEffect(()=>
  {
    axios.get('http://localhost:8000/welcome').then(res=>
      {
         console.log(res)
      })
      .catch(err=>
        {
         console.log(err)
        })

  },[])
  return (
    <div>
      <h1>Welcome</h1>
      <button type='submit' className='btn bg-danger' >log out</button>
    </div>
  )
}

export default Welcome