import React, {useState, useEffect} from 'react';
import UserService from '../services/user.service';

const Home = () => {

    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                console.log(response.data);
                setContent(response.data);
                console.log(content);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        )
    },[]);

    return (
        <div className="container">
            <header className="jumbotron"> 
                Seja bem vindo!
            </header>
        </div>
    )

};

export default Home;