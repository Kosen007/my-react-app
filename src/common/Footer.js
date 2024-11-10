import React, {useState, useEffect} from "react";
// import content from "../json/Summary.json";
import "../css/styles.css";
import axios from "axios";

const Footer = () => {
  const [gameUpdates, setGameUpdates] = useState(""); // 用于存储游戏动态内容
  
  useEffect(() => {
    // 发起 GET 请求以获取游戏动态
    axios.get("http://localhost:8080/games/getsummary")
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setGameUpdates(response.data.response.update); // 设置游戏动态内容
        } else {
          console.error("Failed to fetch game updates:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching game updates:", error);
      });
  }, []);
  
  return (
    <>
{/* 游戏动态情报 */}
      <div className="game-updates-banner">
        <h2>Game Updates</h2>
      </div>

      <div className="updates-section">
        {/* 游戏动态 */}
        <div className="updates-text">
          <p>{gameUpdates}</p>
        </div>

        {/* 中隔线 */}
        <div className="divider"></div>

        {/* Social links */}
        <div className="social-section">
          <h2>Social</h2>
          <div className="social-links">
            <a href="#" className="social-link">
              <img src="/images/ps-store-icon.jpg" alt="PS Store" />
            </a>
            <a href="#" className="social-link">
              <img src="/images/ps-plus-icon.png" alt="PS Plus" />
            </a>
            <a href="#" className="social-link">
              <img src="/images/xbox-icon.png" alt="Xbox" />
            </a>
            <a href="#" className="social-link">
              <img src="/images/nintendo-icon.jpg" alt="Nintendo" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
