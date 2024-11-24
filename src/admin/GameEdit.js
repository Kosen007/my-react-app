import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
// import gamesData from '../json/Games.json'; 
import { saveAs } from 'file-saver';
import "../css/styles.css";
import axios from "axios";
import AWS from 'aws-sdk';

const GameEdit = () => {
  
  const { id } = useParams(); // 获取游戏id
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // 初始化 isEditing 状态
  const [fileName, setFileName] = useState(''); // 用于显示文件名
  const [selectedFile, setSelectedFile] = useState(null); // 保存选中的文件
  const [previewUrl, setPreviewUrl] = useState(''); // 图片预览URL
  const [updatedGame, setUpdatedGame] = useState({
    name: '',
    detail: '',
    salesVolume: '',
    score: '',
    picture: ''
  });
  
  useEffect(() => {
    if(id) {// 有 id 表示是编辑模式
      setIsEditing(true);
      // 根据id查找对应的游戏
      // 使用 axios 从后端获取游戏数据
      axios.get(`http://localhost:8080/games/get/game/${id}`)
        .then((response) => {
          if (response.data.status === "SUCCESS") {
            const gameData = response.data.response;
            setUpdatedGame({
              name: gameData.name,
              detail: gameData.detail,
              salesVolume: gameData.salesVolume,
              score: gameData.score,
              picture: gameData.picture
            });
            setPreviewUrl(gameData.picture); // 设置已有图片的预览URL
          } else {
            console.error("Failed to fetch game data:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching game data:", error);
        });
    } else {
      setIsEditing(false);
    }

  }, [id]);
  
  // 处理输入变化
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedGame({ ...updatedGame, [name]: value });
  };

  // 配置 AWS S3 客户端
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
  });
  const s3 = new AWS.S3();
  
  // 图片选择变化
  const handleImageChange = (e) => {
//     setUpdatedGame({ ...updatedGame, picture: e.target.value});
    
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
// //       setFileName(file.name); // 显示文件名
// //       setSelectedFile(file); // 保存文件用于上传
      
// //       setUpdatedGame({ ...updatedGame, picture: `/images/${file.name}`});
// //       setUpdatedGame({ ...updatedGame, picture: `images/${file.name}`});
//       setUpdatedGame({ ...updatedGame, picture: `https://image.api.playstation.com/vulcan/img/rnd/202010/2217/LsaRVLF2IU2L1FNtu9d3MKLq.jpg`});

      
//       console.log(updatedGame);     
      //生成图片预览URL
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
      setSelectedFile(file); // 保存文件用于上传
//       setUpdatedGame({ ...updatedGame, picture: preview});
    } else {
      alert("Please select an image file");
      e.target.value = null; // 清除文件选择
      setPreviewUrl(null); // 清除预览图
    }
  };
  
  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let s3Url = updatedGame.picture;
console.log("Bucket Name:", process.env.REACT_APP_S3_BUCKET_NAME);
console.log("Access Key ID:", process.env.REACT_APP_AWS_ACCESS_KEY_ID);
console.log("Secret Access Key:", process.env.REACT_APP_AWS_SECRET_ACCESS_KEY);
console.log("Region:", process.env.REACT_APP_AWS_REGION);
    if (selectedFile) {
      // 设置 S3 上传参数
      const params = {
        Bucket: process.env.REACT_APP_S3_BUCKET_NAME, // S3 存储桶名称
        Key: `images/${selectedFile.name}`, // 保存到 S3 的文件路径
        Body: selectedFile,
        ContentType: selectedFile.type,
      };

      // 上传文件到 S3
      try {
        const uploadResult = await s3.upload(params).promise();
        s3Url = uploadResult.Location; // 获取 S3 中文件的 URL
      } catch (error) {
        console.error("Error uploading image to S3:", error);
        alert("Image upload failed");
        return;
      }
    }

    // 更新图片 URL 到 updatedGame.picture
    const updatedGameData = { ...updatedGame, picture: s3Url };
    const formData = new FormData();
    for (const key in updatedGameData) {
      formData.append(key, updatedGameData[key]);
    }

    if (isEditing) {
      // 编辑模式
      axios.put(`http://localhost:8080/games/updategame/${id}`, formData)
        .then(() => {
          console.log("Game updated successfully");
          navigate('/admin/game-inquiry');
        })
        .catch((error) => {
          console.error("Failed to update game:", error);
        });
    } else {
      // 添加模式
      axios.post("http://localhost:8080/games/newgame", formData)
        .then(() => {
          console.log("Game added successfully");
          navigate('/admin/game-inquiry');
        })
        .catch((error) => {
          console.error("Failed to add game:", error);
        });
    }
  };
  
    return (
    <>
      <div>
        <h1>{isEditing ? 'Edit Game' : 'Add Game'}</h1>
        <form onSubmit={handleSubmit}>
          <div>
            {(previewUrl || (isEditing && updatedGame.picture)) && (
              <img
                src={previewUrl || updatedGame.picture}
                alt={updatedGame.name}
                style={{ width: "200px", height: "auto" }}
              />
            )}
            <input
              type="file"
              accept="image/*" // 限制只能选择图片文件
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={updatedGame.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Detail:</label>
            <textarea
              name="detail"
              value={updatedGame.detail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Sales Volume:</label>
            <input
              type="number"
              name="salesVolume"
              value={updatedGame.salesVolume}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Score:</label>
            <input
              type="number"
              name="score"
              value={updatedGame.score}
              onChange={handleChange}
              step="0.1"
              min="0"
              max="10"
            />
          </div>
          <button type="submit">{isEditing ? 'Update' : 'Add'} Game</button>
        </form>
      </div>
    </>
  );
};

export default GameEdit;