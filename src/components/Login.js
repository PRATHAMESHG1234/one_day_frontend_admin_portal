import React, { useState } from "react";
import { Form, Input, Button, Col } from "antd";
import loginImage from "../assets/login-c3b6c3aa.jpg";
import logoImage from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios

import "../styles/LoginForm.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFinish = async () => {
    try {
      console.log(email, password);
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="rectangle-container">
        <Col span={12} className="login-form-container">
          <div className="login-form">
            <div className="logo-container">
              <img src={logoImage} alt="Logo" />
            </div>
            <h2>Welcome Back</h2>
            <p>Please enter your details</p>
            <Form
              name="login-form"
              style={{
                marginTop: "53px",
              }}
              onFinish={onFinish}
            >
              <label>Email</label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <label>Password</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", padding: "5px" }}
                >
                  Login
                </Button>
              </Form.Item>

              <p>
                Not registered yet? <Link to="/register">Register here</Link>
              </p>
            </Form>
          </div>
        </Col>
        <Col span={12} className="login-image">
          <img src={loginImage} alt="Login" />
        </Col>
      </div>
    </div>
  );
};

export default Login;
