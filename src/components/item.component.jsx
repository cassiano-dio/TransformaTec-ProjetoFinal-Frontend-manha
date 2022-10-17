import React, { Component } from "react";
import ItemDataService from "../services/item.service";
import { withRouter } from "../common/with-router"

class Item extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.getItem = this.getItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = {
            currentItem: {
                id: null,
                name: "",
                status: "",
                price: "",
                description: ""
            },
            "message": "",
        };
    }

    componentDidMount() {
        this.getItem(this.props.router.params.id)
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(function (prevState) {
            return {
                currentItem: {
                    ...prevState.currentItem,
                    description: description
                }
            };
        });
    }

    onChangeStatus(e) {

        const status = e.target.value;

        this.setState(prevState => ({

            currentItem: {
                ...prevState.currentItem,
                status: status
            }
        }));
    }

    onChangePrice(e) {

        const price = e.target.value;

        this.setState(prevState => ({
            currentItem: {
                ...prevState.currentItem,
                price: price
            }
        }));

    }

    onChangeName(e) {

        const name = e.target.value;

        this.setState(prevState => ({
            currentItem: {
                ...prevState.currentItem,
                name: name
            }
        }));
    }

    getItem(id) {
        ItemDataService.get(id)
            .then(response => {
                this.setState({
                    currentItem: response.data
                });
                console.log(response.data)
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateItem() {
        ItemDataService.update(
            this.state.currentItem.id,
            this.state.currentItem
        ).then(response => {
            console.log(response.data);
            this.setState({
                message: "Item atualizado com sucesso!"
            });
        })
            .catch(e => {
                console.log(e);
            })
    }

    deleteItem() {
        ItemDataService.delete(this.state.currentItem.id)
            .then(response => {
                console.log(response.data);
                this.props.router.navicate("/items");
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentItem} = this.state;

        return (<div>
            {
                currentItem ? (
                    <div className="edit-form">
                        <h4>Item</h4>
                        <form>

                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentItem.name}
                                    onChange={this.onChangeName}
                                />
                            </div>

                            <div>
                                <label htmlFor="status">Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="status"
                                    value={currentItem.status}
                                    onChange={this.onChangeStatus}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    value={currentItem.price}
                                    onChange={this.onChangePrice}
                                />
                            </div>
                            <div>
                                <label htmlFor="name">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentItem.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                    {currentItem.status ? true : false}
                                </label>
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
                        <p>Selecione um item</p>
                    </div>
                )
            }
        </div>
        );
    }
}

export default withRouter(Item);