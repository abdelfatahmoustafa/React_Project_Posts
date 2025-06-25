import { logInAPI } from "@/api/auth";
import { logInAndRegisterSchema } from "@/forms/schema";
import { useAuthStore } from "@/store/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Login() {
  const { search } = useLocation();
  const { redirectTo } = qs.parse(search, { ignoreQueryPrefix: true });
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInAndRegisterSchema),
  });

  useEffect(() => {
    const saved = localStorage.getItem("rememberMe");
    if (saved) {
      const parsed = JSON.parse(saved);
      setValue("email", parsed.email);
      setValue("password", parsed.password);
      setRemember(true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const res = await logInAPI(data);
      setTokens(res.data);
      if (remember) {
        localStorage.setItem("rememberMe", JSON.stringify(data));
      } else {
        localStorage.removeItem("rememberMe");
      }
      navigate(redirectTo ?? "/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Animated Gradient Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        zIndex: -2
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `,
          animation: 'gradientShift 15s ease-in-out infinite'
        }}></div>
      </div>
      <div className="login-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', position: 'relative' }}>
        <div className="login-card" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          position: 'relative',
          zIndex: 10
        }}>
          <div className="login-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '2.2rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '8px'
            }}>Welcome Back</h2>
            <p style={{ fontSize: '1.1rem', color: '#718096', fontWeight: 400 }}>Sign in to your account to continue</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete={remember ? "on" : "off"} className="login-form" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors?.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  {...register("email")}
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {errors?.email?.message && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <input
                  id="password"
                  type="password"
                  className={`form-input ${errors?.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {errors?.password?.message && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  id="rememberMe"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <span className="checkbox-custom"></span>
                <span className="checkbox-label">Remember me</span>
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </form>
          <div className="register-link" style={{ textAlign: 'center', marginTop: '24px' }}>
            <p style={{ color: '#718096' }}>
              Don't have an account?{' '}
              <span className="link-text" style={{ color: '#667eea', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('/register')}>
                Create Account
              </span>
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes gradientShift {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .login-form .form-input.error {
          border-color: #e53e3e;
          box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
        }
        .login-form .form-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        .login-form .form-input {
          width: 100%;
          padding: 16px 16px 16px 48px;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          background: #fff;
          transition: all 0.3s ease;
          outline: none;
        }
        .login-form .input-icon {
          position: absolute;
          left: 16px;
          color: #a0aec0;
          transition: color 0.3s ease;
        }
        .login-form .form-input:focus + .input-icon {
          color: #667eea;
        }
        .login-form .error-message {
          font-size: 0.8rem;
          color: #e53e3e;
          margin-top: 4px;
          font-weight: 500;
        }
        .login-form .checkbox-label {
          color: #2d3748;
          font-size: 0.95rem;
          font-weight: 500;
        }
        .login-form .submit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          padding: 14px 0;
          font-size: 1.1rem;
          margin-top: 8px;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
          transition: background 0.3s, box-shadow 0.3s;
        }
        .login-form .submit-btn:hover {
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.2);
        }
        .link-text:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
