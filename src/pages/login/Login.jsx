import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase'; // Import your firebase configuration
import { Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import './login.scss'; // Import your CSS file

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State để kiểm tra đăng nhập

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      // Xử lý kết quả đăng nhập thành công (chuyển hướng, lưu thông tin người dùng, vv.)
      console.log('Logged in with Google:', result.user);
      localStorage.setItem('authTokens', result.user?.stsTokenManager.accessToken);
      localStorage.setItem('refeshToken', result.user?.stsTokenManager?.refreshToken);
      setLoggedIn(true); // Cập nhật trạng thái đã đăng nhập thành công
    } catch (error) {
      // Xử lý lỗi (nếu có)
      console.error('Google login error:', error);
    }
  };

  // Nếu đã đăng nhập thành công, chuyển hướng đến trang Home
  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-content">
          <div className="left-image">
            <img
              src="https://www.cannonhillkmartplaza.com.au/wp-content/uploads/2022/07/Bookswap-750-%C3%97-420-px.png"
              alt="Bookswap"
            />
          </div>
          <div className="login-form">
            <h2 className="login-heading">Welcome Back!</h2>
            <button onClick={handleGoogleLogin} className="google-login-button">Login with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
