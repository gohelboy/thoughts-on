import { Link } from 'react-router-dom'
import { routes } from '../../routes'
import "./NotFound.scss"

const NotFound = () => {
    return (
        <main align='center'>
            <h1>NOT FOUND</h1>
            <Link to={routes.homepage}>GO to homepage</Link>
        </main>

    )
}

export default NotFound