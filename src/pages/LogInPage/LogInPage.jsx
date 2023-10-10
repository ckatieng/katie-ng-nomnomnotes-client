import './LogInPage.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/NomNomNotes_Logo.png';
import Button from '../../components/Button/Button';

function LogInPage () {
    const navigate = useNavigate();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');

    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // };

    // const handlePasswordChange = (e) => {
    //     setPassword(e.target.value);
    // };

    const handleLoginClick = () => {
        // console.log('Email:', email);
        // console.log('Password:', password);
        navigate('/');
    };
    
    return (
        <div className="login">
            <div className="login__container">
                <img className="login__logo" src={logo} alt="NomNom Notes Logo" />

                <input 
                    type="email" 
                    className="login__input" 
                    placeholder="Email"
                    // value={email}
                    // onChange={handleEmailChange}
                />

                <input
                    type="password"
                    className="login__input"
                    placeholder="Password"
                    // value={password}
                    // onChange={handlePasswordChange}
                />

                <div className="login__button">
                    <Button variant="primary" onClick={handleLoginClick} text="Log In" />
                </div>

                <div className="login__signup">
                    <p className="login__paragraph">Don't have an account?</p>
                    <Link to ="/signup" className="login__link">Sign Up</Link>
                </div>
            </div>
        </div>
    );
}

export default LogInPage;