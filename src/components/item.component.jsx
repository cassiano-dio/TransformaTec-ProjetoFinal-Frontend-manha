import React, { Component } from 'react';
import ItemDataService from "../services/item.service";
import { withRouter } from "../common/with-router";

class Item extends Component {

    /**
        username;
        name;
        price;
        description;
        status;
     */

    constructor(props) {

        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);

        this.getItem = this.getItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            currentItem: {
                id: null,
                userName: "",
                name: "",
                price: null,
                description: "",
                status: false
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getItem(this.props.router.params.id);
    }

    onChangeName(e) {

        const name = e.target.value;

        this.setState(prevState => ({
            currentItem: {
                ...prevState.currentItem,
                name: name
            }
        }));
    };

    onChangeDescription(e) {

        const description = e.target.value;

        this.setState(prevState => ({
            currentItem: {
                ...prevState.currentItem,
                description: description
            }
        }));
    };

    onChangeUsername(e) {

        const username = e.target.value;

        this.setState(prevState => ({
            currentItem: {
                ...prevState.currentItem,
                username: username
            }
        }));
    };

    onChangePrice(e) {

        const price = e.target.value;

        this.setState(prevState => ({
            currentItem: {
                ...prevState.currentItem,
                price: price
            }
        }));
    };

    onChangeStatus(e) {

        const status = e.target.value;

        this.setState(prevState => ({
            currentItem: {
                ...prevState.currentItem,
                status: status
            }
        }));
    };

    getItem(id) {

        ItemDataService.get(id)
            .then(
                response => {
                    this.setState({
                        currentItem: response.data
                    });
                    console.log(response.data)
                }
            )
            .catch(e => {
                console.log(e);
            });
    }

    updateItem() {

        ItemDataService.update(
            this.state.currentItem.id,
            this.state.currentItem.name,
            this.state.currentItem.userName,
            this.state.currentItem.price,
            this.state.currentItem.status,
            this.state.currentItem.description
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "Item atualizado com sucesso"
            })
        })
            .catch(e => {
                console.log(e);
            });

    }

    deleteItem() {
        ItemDataService.delete(this.state.currentItem.id)
            .then(
                response => {
                    console.log(response.data);
                    this.props.router.navigate("/items");
                }
            )
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentItem } = this.state;

        // this.state.currentItem.id,
        // this.state.currentItem.name,
        // this.state.currentItem.userName,
        // this.state.currentItem.price,
        // this.state.currentItem.status,
        // this.state.currentItem.description

        return (
            <div>
                {
                    currentItem ? (
                        <div className="edit-form">
                            <h4>Item</h4>
                            <form >

                                <div className='form-group'>
                                    <label htmlFor="name"></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        id='name'
                                        value={currentItem.name}
                                        onChange={this.onChangeName}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="userName"></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        id='userName'
                                        value={currentItem.userName}
                                        onChange={this.onChangeUsername}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="price"></label>
                                    <input
                                        type="number"
                                        className='form-control'
                                        id='price'
                                        value={currentItem.price}
                                        onChange={this.onChangePrice}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="status"></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        id='status'
                                        value={currentItem.status}
                                        onChange={this.onChangeStatus}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="name"></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        id='name'
                                        value={currentItem.name}
                                        onChange={this.onChangeName}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label htmlFor="description"></label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        id='description'
                                        value={currentItem.description}
                                        onChange={this.onChangeDescription}
                                    />
                                </div>

                            </form>
                            <button
                                className="badge badge-danger mr-2"
                                onClick={this.deleteItem}
                            >
                                Delete
                            </button>
                            <button
                                type="submit"
                                className="badge badge-success"
                                onClick={this.updateItem}
                            >
                                Update
                            </button>
                            <p>{this.state.message}</p>
                        </div>
                    ):(
                        <div>
                            <br />
                            <p>Click on an item</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default withRouter(Item);