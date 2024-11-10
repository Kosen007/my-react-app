import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import "../css/styles.css";

const Contact = () => {
  // 设置输入框的状态
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    text: "",
    notRobot: false
  });
  
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  
  // 处理输入框改变事件
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };
  
  // 根据输入状态来启用/禁用Submit按钮
  useEffect(() => {
    const { name, email, phone, text, notRobot } = formData;
    if (name && email && phone && text && notRobot) {
      setIsSubmitDisabled(false); // 所有字段都有内容并且复选框被选中
    } else {
      setIsSubmitDisabled(true); // 任何一个字段不符合条件时禁用按钮
    }
  }, [formData]);
  
  // 处理表单提交事件
  const handleSubmit = (e) => {
    e.preventDefault();

    // 创建 JSON 文件
    const jsonData = new Blob([JSON.stringify(formData, null, 2)], {
      type: "application/json"
    });

    // 保存 JSON 文件
    saveAs(jsonData, "contactData.json");

    // 重置表单
    setFormData({
      name: "",
      email: "",
      phone: "",
      text: "",
      notRobot: false
    });
  };
  
  
  return (
    <>
      <div className="contact-container">
      <h1>Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        {/* 左边部分 */}
        <div className="left-section">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email (required)"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]*"  // 限制只允许输入数字
          />
        </div>

        {/* 右边部分 */}
        <div className="right-section">
          <textarea
            name="text"
            placeholder="Text"
            value={formData.text}
            onChange={handleChange}
          />
          <div className="not-robot-section">
            <input
              type="checkbox"
              name="notRobot"
              checked={formData.notRobot}
              onChange={handleChange}
            />
            I am not a robot
          </div>
        </div>
        <div className="submit-container">
          <button
          type="submit"
          disabled={isSubmitDisabled}  // 根据状态禁用/启用按钮
          style={{
            marginTop: '20px',
            alignSelf: 'center', // 将按钮居中
          }}
        >
          Submit
        </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Contact;