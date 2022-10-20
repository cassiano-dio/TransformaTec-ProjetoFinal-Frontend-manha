import React, {Component} from "react";
import ItemDataService from "../services/item.service";
import AuthService from "../services/auth.service";

export default class AddItem extends Component {

    constructor(props){
        super(props);
        this.onChangeTodoId = this.onChangeTodoId.bind(this);
        this.onChangeSymbol = this.onChangeSymbol.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        //this.onChangeUsername = this.onChangeUsername.bind(this);

        this.saveItem = this.saveItem.bind(this);
        this.newItem = this.newItem.bind(this);

        this.state = {
            id: null,
            name: "",
            symbol: "",
            todoId:"",
            price: null,
            description: "",
            //username: "",
            status: false,

            submitted: false
        };
    }

    onChangeTodoId(e){
        this.setState({todoId: e.target.value});
    }

    onChangeSymbol(e){
        this.setState({symbol: e.target.value});
    }

    onChangeName(e){
        this.setState({name: e.target.value});
    }

    // onChangeUsername(e){
    //     this.setState({username: e.target.value});
    // }
    
    saveItem(){

        const currentUser = AuthService.getCurrentUser();

        var data = {
            todoId: this.state.todoId,
            name: this.state.name,
            symbol: this.state.symbol,
            username: currentUser.username
        }

        ItemDataService.create(data)
            .then(
                response => {
                    this.setState({
                        id: response.data.id,
                        todoId: response.data.todId,
                        name: response.data.name,
                        price: response.data.price,
                        description: response.data.description,
                        status: response.data.status,
                        //username: response.data.username,
                        submitted: true
                    });
                    console.log(response.data)
                }
            ).catch(
                e => {
                    console.log(e);
                }
            );
    }

    newItem(){
        this.setState({
            id: null,
            name: "",
            symbol: "",
            todoId:null,
            price: null,
            description: "",
            status: false,
            //username:"",
            submitted: false
        });
    }

    render(){
        return (
            <div className="submit-form">

            {
                this.state.submitted ? (
                    <div>
                        <h4>Item cadastrado com sucesso!</h4>
                        <button className="btn btn-success" onClick={this.newItem}>
                            Novo Item
                        </button>
                    </div>
                ): (
                    <div>
                        <div className="form-group">
                            <label htmlFor="todoId">Id do TODO</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="todoId"
                                value={this.state.todoId}
                                onChange={this.onChangeTodoId}
                                name="todoId"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="symbol">Símbolo</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="symbol"
                                value={this.state.symbol}
                                onChange={this.onChangeSymbol}
                                name="symbol"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Nome do item</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="name"
                                onChange={this.onChangeName}
                                value={this.state.name}
                                name="name"
                            />
                        </div>
                        {/* <div className="form-group">
                            <label htmlFor="name">Username</label>
                            <input 
                                type="text"
                                className="form-control"
                                id="username"
                                onChange={this.onChangeUsername}
                                value={this.state.username}
                                name="username"
                            />
                        </div> */}
                        <br />
                        <button onClick={this.saveItem} className="btn btn-success">
                            Registrar
                        </button>
                    </div>
                )
            }
            </div>
        );
    }


}