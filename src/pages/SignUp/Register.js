import "./Register.css";
import React from "react";
import Button from "../../components/Button/Button";
import axios from "axios";
function Register() {
  const [username, setUsername] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [confirmpassword, setconfirmpassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setsuccess] = React.useState("");
  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const onChangePassword = (e) => {
    const value = e.target.value;
    setpassword(value);
  };
  const onChangeConfirmPassword = (e) => {
    const value = e.target.value;
    setconfirmpassword(value);
  };
  const submitForm = async (e) => {
    setError("");
    setsuccess("");
    e.preventDefault();
    console.log(username);
    console.log(password);
    console.log(confirmpassword);
    if (password !== confirmpassword) {
      setError("Check password or confirmpassword");
    } else {
      try {
        const res = await axios({
          url: "http://localhost:8080/api/auth/signup",
          method: "POST",
          data: { username, password },
        });
        if (res.data.success) {
          setsuccess("sign up success")
          const user = {
            username: res.data.data.username,
            _id: res.data.data._id,
          };
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          setError(res.data.data);
        }
      } catch (err) {
        console.log(err);
        setError("loi roi");
      }
    }
  };

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
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={onChangeUsername}
                  className="form-control"
                  placeholder="username"
                  required
                ></input>
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                type="password"
                  className="form-control"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="password"
                  required
                ></input>
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                type="password"
                  className="form-control"
                  value={confirmpassword}
                  onChange={onChangeConfirmPassword}
                  placeholder="confirm password"
                  required
                ></input>
              </div>
              {error ? <div style={{color:"red",textAlign:'left' }} >{error}</div> : null}
              {success ? <div style={{color:"green",textAlign:'left' }} >{success}</div> : null}
              <div className="form-group">
                <Button label="Signup" />
              </div>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              You have an account?<a href="#">Sign in</a>
            </div>
            <div className="d-flex justify-content-center">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Register;
