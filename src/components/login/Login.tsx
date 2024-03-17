import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.scss";
import Header from "../../pages/Header";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setIsValid(validateEmail(event.target.value));
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const urlencoded = new URLSearchParams();
    urlencoded.append("username", username);
    urlencoded.append("password", password);
    localStorage.setItem("username", username);

    try {
      const response = await axios.post("http://localhost:8089/users/login", urlencoded);
      localStorage.setItem("token", response.data.access_token);
      toast.success("Đăng nhập thành công");
      navigate("/introduction");
    } catch (error) {
      console.error(error);
      toast.error("Thất bại, có lỗi xảy ra");
    }
  };

  return (
    <div className="login">
      {/* <Header /> */}
      <div className="login_block">
        <h4>Đăng nhập</h4>
        <form onSubmit={submitForm}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={handleChangeUsername}
          />
          {(!isValid && username) && <p style={{color:'red'}}>Email không đúng định dạng</p>}
          <TextField
            label="Mật khẩu"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={handleChangePassword}
          />
          <Button disabled={!isValid} type="submit" variant="contained" color="primary" fullWidth>
            Đăng nhập
          </Button>
          <h5>
            Already have an account? <Link to={"/register"}>Register</Link>
          </h5>
        </form>
      </div>
    </div>
  );
}

export default Login;
