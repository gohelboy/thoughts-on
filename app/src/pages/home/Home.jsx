import Button from "../../GlobalComponents/Button/Button";
import { routes } from "../../routes"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const authToken = localStorage.getItem('token');

    const navigate = useNavigate();

    const gotoLogin = () => {
        return navigate(routes.login)
    }

    const logout = () => {
        localStorage.removeItem('token');
        return navigate(routes.login)
    }

    return (
        <main>
            <h1>Home</h1>
            {authToken ? <Button varient='default-outline' text="Logout" onClick={logout} /> : <Button varient='default-outline' text="Login" onClick={gotoLogin} />}
        </main>
    )
}

export default Home