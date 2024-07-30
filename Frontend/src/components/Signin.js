import React, { useState } from 'react';
import axios from 'axios';
import './Signin.css';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [id, setID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', {id, password});
      if (response.data.success) {
        console.log('로그인 성공');
        navigate('/home');
      } else {
        setError('로그인 실패: ' + response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError('로그인 실패: ' + error.response.data.message);
      } 
    }  
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="container">
      <div className="login-logo">EVECOT 로그인</div>
      <div className="login-box">
        <div className="input-container">
          <div className="input-box">
            <input 
              type="text" 
              placeholder="ID" 
              className="input-field" 
              value={id}
              onChange={(e) => setID(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="input-box">
            <input 
              type="password" 
              placeholder="PASSWORD" 
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="login-button-container">
          <button className="login-button" onClick={handleLogin}>로그인</button>
        </div>
        <div className="find-links">
          <div className="find-id">아이디 찾기</div>
          <div className="find-password">비밀번호 찾기</div>
        </div>
        <div className="signup-container">
          <div className="signup-text">아직 계정이 없다면, 계정을 생성하세요.</div>
          <div className="signup-link">
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
