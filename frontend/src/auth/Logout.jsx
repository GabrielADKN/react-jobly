import {Navigate} from 'react-router-dom'
import {useContext} from 'react'
import UserContext from './UserContext'

/**
 * Logs the user out by clearing the current user and calling the logoutUser function.
 *
 * @return {JSX.Element} A React element containing a Navigate component that redirects the user to the home page after logging out.
 */
const Logout = () => {
    // log the user out
    const {logoutUser, setCurrentUser} = useContext(UserContext)
    setCurrentUser('')
    logoutUser()
    return (
        <>
        <Navigate onClick={() => logoutUser()} to="/"/>
        </>
     )
}

export default Logout