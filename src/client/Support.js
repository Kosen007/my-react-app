import React, { useState } from 'react';
import supportData from "../json/Support.json";
import "../css/styles.css"; 

const Support = () => {
  // 定义一个数组状态来记录每个问题是否展开
  const [openQuestions, setOpenQuestions] = useState(Array(supportData.length).fill(false));
  
  // 切换指定问题的展开/折叠状态
  const toggleAnswer = (index) => {
    const updatedQuestions = [...openQuestions];
    updatedQuestions[index] = !updatedQuestions[index];
    setOpenQuestions(updatedQuestions);
  };
  
  return (
    <div className="support-container">
      {supportData.map((item, index) => (
        <div key={index} className="question-block">
          <div className="question" onClick={() => toggleAnswer(index)}>
            <span>{item.question}</span>
            <span className={`arrow ${openQuestions[index] ? "open" : ""}`}>
              ▼
            </span>
          </div>
          {openQuestions[index] && (
            <div className="answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Support;