import React from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from '../Home'
import SinUp from '../SignUp'
import ErrPage from '../ErrorPage'
import Welcome from '../Welcome'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/signup' element={<SinUp/>}></Route>
          <Route path='/welcome' element={<Welcome/>}></Route>
          <Route path='/*' element={<ErrPage/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App