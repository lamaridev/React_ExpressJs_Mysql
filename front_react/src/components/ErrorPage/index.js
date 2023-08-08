import React from 'react'
import {Link} from 'react-router-dom'

function ErrPage() {
  return (

    <div class="d-flex align-items-center justify-content-center vh-100">
    <div class="text-center row">
        <div class=" col-md-6">
            <img src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg" alt="" className="img-fluid"/>
        </div>
        <div class=" col-md-6 mt-5">
            <p class="fs-3"> <span class="text-danger">Opps!</span> Page not found.</p>
            <p class="lead">
                The page you’re looking for doesn’t exist.
            </p>
            <Link to="/">
             <button class="btn btn-primary">Go Home</button>
            </Link>
        </div>

    </div>
</div>


  )
}

export default ErrPage