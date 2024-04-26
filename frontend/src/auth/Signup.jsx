import { useContext, useState } from "react";
import UserContext from "./UserContext";

/**
 * Renders a signup form component that allows users to create a new account.
 *
 * @return {JSX.Element} The rendered signup form component.
 */
const Signup = () => {
  const { signupFormSubmit } = useContext(UserContext);
  const INITIAL_FORM_DATA = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupFormSubmit(formData);
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1>Create a new account</h1>
          <p>Enter your information to get started</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Pick a username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
