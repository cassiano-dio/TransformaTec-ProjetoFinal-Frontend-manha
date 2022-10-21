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
        <div className="col-md-12">

            <div className="card " >
                
                <h4 >Seja bem vindo ao nosso sistema de registro de itens</h4>
                
            </div>
        </div>
    )

};

export default Home;