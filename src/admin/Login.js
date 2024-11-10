import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'; 
// import { saveAs } from 'file-saver';
// import usersData from '../json/Users.json';
import "../css/styles.css";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();  // 创建 navigate 实例
  
  // 处理输入框变化事件
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // 处理Login按钮点击事件
  const handleLogin = async (e) => {
    e.preventDefault();

    // 查找是否有匹配的用户名和密码
//     const user = usersData.find(
//       (user) => user.name === formData.name && user.password === formData.password
//     );

//     if (user) {
//       setLoginStatus('success');
//       alert('Login successful!');
//       navigate('/admin/game-inquiry');  // 登录成功后跳转到 Game Inquiry 页面
//     } else {
//       setLoginStatus('fail');
//       alert('Login failed!');
//     }
    // 创建 JSON 数据
    const userData = {
      name: formData.name,
      password: formData.password,
    };
    
    await axios.post("http://localhost:8080/users/login",
               userData,
               {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
              ).then((response) => {console.log(response)
                                    const { status, response: loginResponse } = response.data;
                                    if (status === "SUCCESS") {
                                      alert(loginResponse);
                                      navigate('/admin/game-inquiry');
                                    } else if (status === "FAIL") {
                                      alert("Login failed! Please try again.");
                                      // 清空用户名和密码
                                      setFormData({
                                        name: '',
                                        password: ''
                                      });
                                    }
                                   });
  };
  
    return (
    <>
      <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </>
  );
};

export default Login;