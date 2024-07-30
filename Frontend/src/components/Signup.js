import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError('비밀번호가 다릅니다.');
      return;
    }

    try {
      const response = await axios.post('/users', { id, nickname, password });
      if (response.data.success) {
        setSuccess('회원가입이 완료되었습니다.');
        navigate('/');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Signup error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <div className="signup-logo">EVECOT 회원가입</div>
      <div className="signup-box">
        <div className="welcome-text">EVECOT 가입을 환영합니다!</div>
        <div className="signup-container">
          <div className="input-box">
            <input
              type="text"
              placeholder="id"
              className="input-field"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <div className="input-description">영문 소문자 또는 영문 소문자 + 숫자 최대 15자리</div>
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="닉네임"
              className="input-field"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <br></br>
          <div className="input-box">
            <input
              type="password"
              placeholder="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="한번 더 입력해주세요"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="input-description">영문 소문자 + 숫자 또는 영문 소문자 + 숫자 + 특수문자 최대 15자리</div>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <div className="signup-button-container">
          <button className="signup-button" onClick={handleSignup}>가입하기</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
