import React, { useState } from "react";

/**
 * Login and registration page.
 * Props:
 *  - onLogin(email, password): Called on login submit.
 *  - onRegister(email, password): Called on registration submit.
 *  - loading: Loading state for form.
 *  - error: Error message (if any).
 */
// PUBLIC_INTERFACE
function LoginPage({ onLogin, onRegister, loading, error }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState("");

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    if (!form.email.trim() || !form.password) {
      setFormError("Email and password are required.");
      return;
    }
    if (isRegister) {
      onRegister(form.email.trim(), form.password);
    } else {
      onLogin(form.email.trim(), form.password);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        {error && <div className="login-error">{error}</div>}
        {formError && <div className="login-error">{formError}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            disabled={loading}
            autoFocus
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            disabled={loading}
            required
          />
          <button className="login-btn" type="submit" disabled={loading}>
            {loading
              ? isRegister
                ? "Registering..."
                : "Logging in..."
              : isRegister
              ? "Register"
              : "Login"}
          </button>
        </form>
        <div className="login-switch">
          {isRegister ? (
            <span>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-btn"
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              New here?{" "}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-btn"
              >
                Create Account
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
