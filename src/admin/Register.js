import React, { useState } from "react";
// import { saveAs } from "file-saver";
import "../css/styles.css";
import axios from "axios";

const Register = () => {

  // 表单状态
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: ""
  });
  
  // 表单提交处理
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 检查密码是否匹配
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // 创建 JSON 数据
    const userData = {
      name: formData.name,
      password: formData.password,
    };

    // 保存 JSON 文件
//     const jsonData = new Blob([JSON.stringify(userData, null, 2)], {
//       type: "application/json"
//     });

    //saveAs(jsonData, "User.json");
    await axios.post("http://localhost:8080/users/new",
               userData,
               {
                headers: {
                  'Content-Type': 'application/json'
                }
              }
              ).then((response) => {console.log(response)
                                     const {data} = response
                                     const {response:registerResponse} = data
    alert(registerResponse)});

    // 重置表单
    setFormData({
      name: "",
      password: "",
      confirmPassword: ""
    });
  };
  
  // 输入框改变处理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  return (
    <>
      <div className="register-container">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
};

export default Register;