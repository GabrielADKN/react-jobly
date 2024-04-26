import { useContext } from 'react';
import UserContext from '../auth/UserContext';

const Home = () => {
    const { currentUser } = useContext(UserContext);
    const colorfulTitle = generateColorfulTitle("Jobly");

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center">
            <div className="text-center">
                <h1 className="mb-1 ">Welcome to <span className='fs-1 fw-bolder'>{colorfulTitle}</span></h1>
                {!currentUser ? (
                    <>
                        <p className="mb-4">Log in or <a href='/signup'>sign up</a> to continue</p>
                        <a href='/login' className="btn btn-primary me-2">Log in</a>
                        <a href='/signup' className="btn btn-secondary">Sign up</a>
                    </>
                ) : (
                    <>
                        <p className="mb-4">Find a company and apply to some jobs</p>
                        <a href='/companies' className="btn btn-primary me-2">Find a company</a>
                        <a href='/jobs' className="btn btn-secondary">Apply to jobs</a>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;

function generateColorfulTitle(title) {
    return title.split("").map((char, index) => (
        <span key={index} style={{ color: getRandomColor() }}>{char}</span>
    ));
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
