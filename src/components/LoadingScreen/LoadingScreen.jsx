import './LoadingScreen.scss';
import logo from "../../assets/logo/NomNomNotes_Logo.png";

/*
 * LoadingScreen Component
 * - Displays a loading screen with a logo while content is being loaded
 */

function LoadingScreen () {
    return (
        <div className="loading">
            <img className="loading__logo" src={logo} alt="NomNom Notes Logo" />
        </div>
    );
}

export default LoadingScreen;