import React, { Component } from "react";
import ItemDataService from "../services/item.service"

export default class AddItem extends Component {


    constructor(props) {

        super(props);
        this.onChangeTodId = this.onChangeTodId.bind(this);
        this.onChangeSymbol = this.onChangeSymbol.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.saveItem = this.saveItem.bind(this);
        this.newItem = this.newItem.bind(this);

        this.state = {

            id: null,
            todoId: null,
            symbol: null,
            name: null,

        };
    }

    onChangeTodId(e){
        this.setState({todoId: e.target.value});
    }

    onChangeSymbol(e){
        this.setState({symbol: e.target.value});
    }

    onChangeName(e){
        this.setState({name: e.target.value});
    }

    saveItem(){

        var data = {
            todoId: this.state.todoId,
            symbol: this.state.symbol,
            name: this.state.name,
            submitted: false
        }

        ItemDataService.create(data)
        .then(
            response => {
                this.setState({
                    id: response.data.id,
                    todoId: response.data.todoId,
                    symbol: response.data.symbol,
                    name: response.data.name,

                    submitted: true
                });
                console.log(response.data)
            })
            .catch( e => {
                console.log(e);
            });
    }

    newItem(){
        this.setState({
            id: null,
            todoId: "",
            symbol: "",
            name: "",

            submitted: false
        })
    }

    render(){
        return (
            <div className="submit-form">
                {
                    this.state.submitted ? (
                        <div>
                            <h4>Item registrado com sucesso!</h4>
                            <button className="btn btn-success" onClick={this.newItem}>
                                Novo Item
                            </button>
                        </div>
                    ):(
                        <div>
                            <div className="form-group">
                                <label htmlFor="todoId">Todo Id</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    id="todoId"
                                    required
                                    value={this.state.todoId}
                                    onChange={this.onChangeTodId}
                                    name="todoId"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="todoId">Symbol</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="symbol"
                                    required
                                    value={this.state.symbol}
                                    onChange={this.onChangeSymbol}
                                    name="symbol"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="todoId">Name</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    required
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    name="todoId"
                                />
                            </div>
                            <button onClick={this.saveItem} className="btn btn-success">
                                Salvar
                            </button>
                        </div>
                    )}
            </div>
        )
    }

}