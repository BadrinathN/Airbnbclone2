import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


export default function Registerpage(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function registerUser(ev){
        ev.preventDefault();
        try {
            await axios.post('/register',{
                name,
                email,
                password,
            });       
            alert('Registration successful.Now you can login');
        } catch (e) {
            alert('Registration failed. Please try again later.');
        }
        
    }
    return (
        <div className="login-container">
            <h1>REGISTER</h1>
            <form onSubmit={registerUser}>
                <input type="text" placeholder='name' value={name} onChange={ev => setName(ev.target.value)}/>
                <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                <button>register</button>                
            </form>
            <div >
            <div className="signin">
            All ready a member? <Link to={'/login'}> Login </Link>
            </div>
            </div>
            
        </div>
    )
}