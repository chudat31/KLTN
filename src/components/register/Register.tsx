import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { TextField, Button, Link, Box, Typography } from "@mui/material";
import Header from "../../pages/Header";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (input: any) => {
    const pattern =
      /^(\+\d{1,3})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})$/;
    return pattern.test(input);
  };

  const handleChangeUsername = (event: any) => {
    setUsername(event.target.value);
    setIsValid(validateEmail(event.target.value));
  };
  const handleChangePassword = (event: any) => setPassword(event.target.value);
  const handleChangePhone = (event: any) => {
    setPhoneNumber(event.target.value);
    if (!validatePhoneNumber(event.target.value)) {
      setErrorPhoneNumber("Số điện thoại không đúng định dạng");
    } else {
      setErrorPhoneNumber("");
    }
  };

  const signup = async () => {
    if (phoneNumber.length !== 10 || !validatePhoneNumber(phoneNumber)) {
      toast.error("Vui lòng nhập số điện thoại hợp lệ");
      return;
    }

    try {
      await axios.post("http://localhost:8089/users", {
        username,
        password,
        phone_number: phoneNumber,
      });
      await axios.post("http://localhost:8089/users/role/addtouser", {
        username: username,
        roleName: "user",
      });
      toast.success("Đăng ký thành công");
      navigate("/login");
    } catch (e) {
      toast.error("Đăng ký thất bại");
    }
  };

  return (
    <>
      {/* <Header /> */}
      <Box
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 12,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Đăng ký tài khoản mới
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={username}
          onChange={handleChangeUsername}
          margin="normal"
          sx={{ mb: 2 }}
        />
        {!isValid && username && (
          <p style={{ color: "red" }}>Email không đúng định dạng</p>
        )}
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={handleChangePassword}
          margin="normal"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={handleChangePhone}
          margin="normal"
          error={!!errorPhoneNumber}
          helperText={errorPhoneNumber}
          sx={{ mb: 3 }}
        />
        <Typography variant="body1" sx={{ textAlign: "center", mb: 2 }}>
          Bạn đã có tài khoản?{" "}
          <Link
            style={{ textDecoration: "none" }}
            component={RouterLink}
            to="/login"
          >
            Đăng nhập
          </Link>
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={signup}
          sx={{ mt: 1, mb: 2 }}
          disabled={!isValid}
        >
          Đăng ký
        </Button>
      </Box>
    </>
  );
}

export default Register;
