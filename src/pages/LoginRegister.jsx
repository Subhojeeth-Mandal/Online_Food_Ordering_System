import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const API_URL = 'http://localhost:3000/users';

const validatePassword = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  let hasLower = false;
  let hasUpper = false;
  let hasNumber = false;
  let hasSpecial = false;
  for (let char of password) {
    if (char >= 'a' && char <= 'z') hasLower = true;
    else if (char >= 'A' && char <= 'Z') hasUpper = true;
    else if (char >= '0' && char <= '9') hasNumber = true;
    else hasSpecial = true;
  }
  if (!hasLower) return 'Password must include at least one lowercase letter';
  if (!hasUpper) return 'Password must include at least one uppercase letter';
  if (!hasNumber) return 'Password must include at least one number';
  if (!hasSpecial) return 'Password must include at least one special character';
  return '';
};

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({name: '',email: '',password: '',confirmPassword: ''});
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await axios.get(`${API_URL}?email=${formData.email}&password=${formData.password}`);
        if (res.data.length > 0) {
          login(res.data[0]);
          navigate(-1);
        } else {
          setError('Invalid email or password');
        }
      } else {
        const passwordError = validatePassword(formData.password);
        if (passwordError) {
          setError(passwordError);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Password and Confirm Password do not match');
          return;
        }

        const checkRes = await axios.get(`${API_URL}?email=${formData.email}`);
        if (checkRes.data.length > 0) {
          setError('Email already exists');
          return;
        }

        const res = await axios.post(API_URL, formData);
        login(res.data);
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError('Connection to auth server failed. Make sure json-server is running.');
    }
  };

  return (
    <div className="login-page orange-theme">
      <div className="emoji-bg">
        {['🍕', '🍔', '🌮', '🍜', '🍩', '🍟', '🍣', '🍦', '🥗', '🍰'].map(
          (emoji, i) => (
            <span key={i} className={`floating-emoji e${i + 1}`}>
              {emoji}
            </span>
          )
        )}
      </div>

      <div
        className={`glass-card transparent-form ${isLogin ? 'login-form' : 'register-form'}`}>
        <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required value={formData.name}
                onChange={(e) =>setFormData({ ...formData, name: e.target.value})}/>
            </div>
          )}

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="email@address.com" required value={formData.email}
              onChange={(e) =>setFormData({ ...formData, email: e.target.value})}/>
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required value={formData.password}
              onChange={(e) =>setFormData({ ...formData, password: e.target.value})}/>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••" required value={formData.confirmPassword}
                onChange={(e) =>setFormData({...formData,confirmPassword: e.target.value})}/>
            </div>
          )}

          {!isLogin && (
            <p className="password-hint">
              Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
            </p>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginRegister;