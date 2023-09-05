import './LoadingScreen.scss';
import logo from "../../assets/logo/NomNomNotes_Logo.png";

function LoadingScreen () {
    return (
        <div className="loading">
            <img className="loading__logo" src={logo} alt="NomNom Notes Logo" />
        </div>
    );
}

export default LoadingScreen;