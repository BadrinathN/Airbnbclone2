import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try {
           const data = await axios.post('/login',{email,password});
           setUser(data);
           alert("Login Succesful.");
           setRedirect(true);
        } catch (error) {
            alert("Login failed.");
        }
    }

    if(redirect){
        return (<Navigate to={'/'} />)
    }

    return(
        <div className="login-container">
            <h1>LOGIN</h1>
            <form onSubmit={handleLoginSubmit}>
                <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                <button>Login</button>                
            </form>
            <div >
            <div className="signin">
            Don't have an account yet? <Link to={'/register'}> Register now</Link>
            </div>
            </div>
            
        </div>
    )
}