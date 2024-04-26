import { useContext, useState } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

/**
 * Renders a login form component that allows users to log in to Jobly.
 *
 * @return {JSX.Element} The rendered login form component.
 */
const Login = () => {
  const navigate = useNavigate();
  const { loginFormSubmit } = useContext(UserContext);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log('login submitted');
    e.preventDefault();
    loginFormSubmit(formData);
    setTimeout(() => {
      navigate("/companies");
    }, 3000);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="mb-3">Log in to Jobly</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                required
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                required
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
