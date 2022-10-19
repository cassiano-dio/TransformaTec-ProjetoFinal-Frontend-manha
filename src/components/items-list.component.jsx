import React, { Component } from 'react';
import ItemDataService from '../services/item.service';
import { Link } from 'react-router-dom';

export default class ItemsList extends Component {

    constructor(props) {

        super(props);

        this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
        this.retrieveItems = this.retrieveItems.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.searchUsername = this.searchUsername.bind(this);
        this.setActiveItem = this.setActiveItem.bind(this);

        this.state = {
            items: [],
            currentItem: null,
            currentIndex: -1,
            searchUsername: ""
        };
    }

    componentDidMount() {
        this.retrieveItems();
    }

    onChangeSearchUsername(e) {

        const searchUsername = e.target.value;

        this.setState({
            searchUsername: searchUsername
        })

    }

    retrieveItems() {
        ItemDataService.getAll()
            .then(
                response => {
                    this.setState({
                        items: response.data
                    });
                    console.log("DATA: ", response.data);
                }
            ).
            catch(e => {
                console.log(e);
            })
    }

    refreshList() {
        this.retrieveItems();
        this.setState({
            currentItem: null,
            currentIndex: -1
        });
    }

    setActiveItem(item, index) {

        this.setState({
            currentItem: item,
            currentIndex: index
        })

    }

    searchUsername() {

        this.setState({
            currentIndex: -1,
            currentItem: null,
        })

        ItemDataService.findUsername(this.state.searchUsername)
            .then(
                response => {
                    this.setState({
                        items: response.data
                    });
                    console.log(response.data);
                }
            )
            .catch(e => {
                console.log(e)
            });
    }

    render() {

        const { searchUsername, items, currentItem, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            placeholder='Busca por nome de usuário'
                            className="form-control"
                            value={searchUsername}
                            onChange={this.onChangeSearchUsername}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchUsername}
                            >
                                Buscar
                            </button>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <h4>Items list</h4>
                    <ul className="list-group">
                        {
                            items &&
                            items.map((item, index) =>( 
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveItem(item, index)}
                                    key={index}
                                >
                                    {item.name}
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="col-md-6">

                    {
                        currentItem ? (
                            <div>
                                <h4>Item</h4>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    {" "}
                                    {currentItem.name}
                                </div>
                                <div>
                                    <label htmlFor="price">Price</label>
                                    {" "}
                                    {currentItem.price}
                                </div>
                                <Link
                                    to={"/items/" + currentItem.id}
                                    className="btn btn-warning"
                                >
                                    Editar
                                </Link>
                            </div>

                        ) : (
                            <div>
                                <br />
                                <p>Clique em um item</p>
                            </div>
                        )
                    }

                </div>

            </div>
        )

    }

}