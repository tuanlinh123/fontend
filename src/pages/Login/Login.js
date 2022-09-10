import './login.css'
import React from 'react';
import Button from '../../components/Button/Button';
import axios from 'axios';

function Login() {

    const [username, setUsername] = React.useState('');
    const [password, setpassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [sucess, setsucess] = React.useState('');

    const onChangeUsername = e => {
        const value = e.target.value;
        setUsername(value)
    }
    const onChangePassword = e => {
        const value = e.target.value;
        setpassword(value)
    }
   

    const submitForm = async (e) => {
        setError("");
        setsucess("");
        e.preventDefault();
      
       
                   
       

        try {
            const res = await axios({
                url: 'http://localhost:8080/api/auth/login',
                method: 'POST',
                data: { username, password }
            });
            if (res.data.success) {
                const user = {
                    username: res.data.data.username,
                    _id: res.data.data._id,
                    
                }
                setsucess("Login successful")
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/'
            } else {
                setError(res.data.data)
            }

        } catch (err) {
            setError("loi roi");
        }
        }
    
    
    return (
        <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">
                    <h3>Sign In</h3>
                    
                </div>
                <div className="card-body">
                    <form onSubmit={submitForm}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                            </div>
                            <input value={username} onChange={onChangeUsername} type="text" className="form-control" placeholder="username" required></input>
                            
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fas fa-key"></i></span>
                            </div>
                            <input type="password" value={password} onChange={onChangePassword} className="form-control" placeholder="password" required></input>
                        </div>
                        {error ? <div style={{color:"red",textAlign:'left' }} >{error}</div> : null}
                        {sucess ? <div style={{color:"green",textAlign:'left' }} >{sucess}</div> : null}
                        <div className="form-group">
                            <Button label="Login" />
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Don't have an account?<a href="#">Sign Up</a>
                    </div>
                    <div className="d-flex justify-content-center">
                        <a href="#">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login;