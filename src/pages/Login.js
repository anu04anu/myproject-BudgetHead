import React,{useState} from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../img/iet-logo.png';

function Login({setUser}) {

    const navigate = useNavigate();
    const [loginUser, setloginUser] = useState('director');
    const [loginUserPassword, setloginUserPassword] = useState('director');
    const [errorMessages, setErrorMessages] = useState('');
    const password = ['director','pip','accountant' ];

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(loginUser,'navigate');
        if(loginUser=='director') {
            if(e.target.pass.value==password[0]) {
                setErrorMessages('');
                setUser(loginUser);
                navigate('/');
            }
            else {
                setErrorMessages('* wrong password');
            }
        }
        else if (loginUser=='accountant') {
            if(e.target.pass.value==password[2]) {
                setErrorMessages('');
                setUser(loginUser);
                navigate('/');
            }
            else {
                setErrorMessages('* wrong password');
            }
        }
        else if (loginUser==='pip') {
                if(e.target.pass.value==password[1]) {
                    setErrorMessages('');
                    setUser(loginUser);
                    navigate('/');
                }
                else {
                    setErrorMessages('* wrong password');
                }
        }
    }
    console.log(errorMessages);
    const renderErrorMessage = () =>(
      <div className="login-error">{errorMessages}</div>
    );

    return (
    <div className='login-main-container'>
    <div className='login-container'>
        <div className='login-container-interior'>
            <img src={Logo} className='logo' alt='logo'/>
        </div>
        <div className='login-body'>
            <form onSubmit={handleLogin} className='login-form'>
                <div className="login-header">
                     BudgetHead Manager
                </div>
                <div className='login-form-input'>
                    <label htmlFor="login-select" className='login-label'> 
                    Login as : </label>
                    <select name="selectedUser" id="login-select" value={loginUser}
                        onChange={(e)=>{setloginUser(e.target.value); 
                                setloginUserPassword(e.target.value); setErrorMessages(''); }} className='login-form-select'>
                        <option value="director">Director</option>
                        <option value="pip">Prof. Incharge of Purchase</option>
                        <option value="accountant">Accountant</option>  
                    </select>
                </div>
                <div className='login-form-input' >
                    <label htmlFor='login-password' className='login-label'> Password :</label>
                    <input type="password" id="login-password" name="pass" required className='login-form-password'
                        value={loginUserPassword} onChange={(e)=>{setloginUserPassword(e.target.value);}}/>
                </div>
                {renderErrorMessage()}
                <button type='submit' className='login-button'>Login</button>
            </form>
        
        </div>
    </div>
    </div>
  )
}

export default Login
          

/*
<select name="selectedUser" id="login-select" value={loginUser}
    onChange={(e)=>{setloginUser(e.target.value); setErrorMessages(''); }} className='login-form-select'>
<option value="Director">Director</option>
<option value="PIP">Prof. Incharge of Purchase</option>
<option value="Accountant">Accountant</option>  
</select>
*/