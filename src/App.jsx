
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import Registerpage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AcountPage'
import SinglePlacePage from './pages/SinglePlacePage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'

axios.defaults.baseURL = 'https://airbnbapi1.onrender.com/';
axios.defaults.withCredentials = true;

function App() {
  
  return (
    <UserContextProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Layout/>}>
       <Route index element={<IndexPage/>}/>     
       <Route path='/login' element={<LoginPage/>}/>
       <Route path='/register' element={<Registerpage/>}/>   
       <Route path='/account/:subpage?' element={<AccountPage/>}/> 
       <Route path='/account/:subpage/:action' element={<AccountPage/>}/>       
       <Route path='/place/:id' element={<SinglePlacePage/>}/>
       <Route path='/account/bookings/' element={<BookingsPage/>}/> 
       <Route path='/account/bookings/:id' element={<BookingPage/>}/>  
    </Route>
    </Routes>
    </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
