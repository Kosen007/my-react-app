import "./css/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common/Header";
import Home from "./client/Home";
import Games from "./client/Games";
import Support from "./client/Support";
import Contact from "./client/Contact";
import Footer from "./common/Footer";
import Login from "./admin/Login";
import Register from "./admin/Register";
import GameInquiry from "./admin/GameInquiry";
import GameEdit from "./admin/GameEdit";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/support" element={<Support />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/game-inquiry" element={<GameInquiry />} />
        <Route path="/admin/game-edit/:id" element={<GameEdit />} />
        <Route path="/admin/game-add" element={<GameEdit />} />
      </Routes>
      <Footer />
    </Router>
  );
}
