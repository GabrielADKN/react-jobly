import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import CompanyList from "../Companies/CompList";
import CompanyDetail from "../Companies/CompanyDetail";
import JobList from "../Jobs/JobList";
import LoginForm from "../Forms/LoginForm";
import SignupForm from "../Forms/SignupForm";
import ProfileForm from "../Forms/ProfileForm";
import Navigation from "../Nav";

function Jobly() {
    const [token, setToken] = useState(localStorage.getItem('joblyToken'));
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            if (token) {
                JoblyApi.token = token;
                try {
                    const user = await JoblyApi.getCurrentUser();
                    setCurrentUser(user);
                } catch (errors) {
                    console.error("Error loading user", errors);
                }
            }
        };

        getUser();
    }, [token]);

    const logout = () => {
        setToken(null);
        setCurrentUser(null);
        localStorage.removeItem('joblyToken');
    };

    return (
        <Router>
            <div className="App">
                <Navigation isLoggedIn={!!currentUser} username={currentUser?.username} logout={logout} />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/companies" element={<CompanyList />} />
                    <Route path="/companies/:handle" element={<CompanyDetail />} />
                    <Route path="/jobs" element={<JobList />} />
                    <Route path="/login" element={<LoginForm setToken={setToken} />} />
                    <Route path="/signup" element={<SignupForm setToken={setToken} />} />
                    <Route path="/profile" element={<ProfileForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default Jobly;

