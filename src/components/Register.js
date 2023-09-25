import React, { useState } from "react";
import { Form, Input, Button, Col } from "antd";
import registrationImage from "../assets/login-c3b6c3aa.jpg";
import logoImage from "../assets/logo.png";
import "../styles/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const Registration = () => {
  // Define a formData state object to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      console.log(formData);

      const response = await axios.post("/api/register", formData);

      console.log("Registration successful:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="login-container">
      <div className="rectangle-container">
        <Col span={12} className="login-form-container">
          <div className="login-form">
            <div className="logo-container">
              <img src={logoImage} alt="Logo" />
            </div>
            <h2>Welcome to Our Platform</h2>
            <p>Please fill out the registration form</p>
            <Form
              name="registration-form"
              style={{ marginTop: "53px" }}
              onFinish={onFinish}
            >
              <label>Name</label>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Item>

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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Form.Item>

              <label>Phone</label>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please enter your phone number",
                  },
                ]}
              >
                <Input
                  placeholder="Enter your phone number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%", padding: "5px" }}
                >
                  Register
                </Button>
              </Form.Item>
              <p>
                Already registered? <Link to="/login">Login here</Link>
              </p>
            </Form>
          </div>
        </Col>
        <Col span={12} className="registration-image">
          <img src={registrationImage} alt="Registration" />
        </Col>
      </div>
    </div>
  );
};

export default Registration;
