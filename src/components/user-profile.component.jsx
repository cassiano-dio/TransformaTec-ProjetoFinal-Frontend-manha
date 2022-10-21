import React from 'react';
import AuthService from "../services/auth.service";

const Profile = () => {

    const mainContainer = {
        backgroundColor: 'cornsilk',
        borderRadius: '5px'
    }

    const currentUser = AuthService.getCurrentUser();

    return (
        <div className='container' style={mainContainer}>
            <header className='jumbotron'>
                <h3>
                    Perfil de usuário de:  {currentUser.username}
                </h3>
            </header>
            <p>
                Id: {currentUser.id}
            </p>
            <p>
                Email: {currentUser.email}
            </p>
            <p>
                Autorizações:
                <ul>
                {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
            </p>
        </div>
    );
};

export default Profile;