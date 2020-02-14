import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
class Main extends Component {
  constructor(props) {
    super(props)
    this.showProduct = this.showProduct.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
  }
  showProduct() {
    return(
      <div>
        <h2>Buy Product</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Owner</th>
                <th scope="col"></th>
              </tr>
            </thead>
          <tbody id="productList">
          { this.props.products.map((product, key) => {
              return(
                  <tr key={key}>
                    <th scope="row">{product.id.toString()}</th>
                    <td>{product.name}</td>
                    <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                    <td>{product.owner}</td>
                    <td>
                      { !product.purchased
                        ? <button
                            name={product.id}
                            value={product.price}
                            onClick={(event) => {
                              this.props.purchaseProduct(event.target.name, event.target.value)
                            }}
                          >
                            Buy
                          </button>
                        : null
                      }
                      </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
    );
  }
  create() {
    return (
      <div>
        <h1>Add Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
      </div>
      );
  }

  update() {
    return (
      <div>
        <h1>Update Product</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const id = this.productId.value
          const name = this.productName.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.updateProduct(id, name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productId"
              type="text"
              ref={(input) => { this.productId = input }}
              className="form-control"
              placeholder="Product ID"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Update Product</button>
        </form>
      </div>
      );
  }

  render() {
    return (
      <Router>
        <div id="content">
        <div>
          <ul>
              <li className="nav-item">
                    <Link to={''} className="nav-link">
                      <h1 >Show Products</h1>
                    </Link>
              </li>
              <li className="nav-item">
                    <Link to={'/create'} className="nav-link">
                      <h1 >Create</h1>
                    </Link>
              </li>
              <li className="nav-item">
                    <Link to={'/update'} className="nav-link">
                      <h1 >Update</h1>
                    </Link>
              </li>
            </ul>
        </div>
          <p>&nbsp;</p>
          <Switch>
            <Route path="/create">
              <this.create></this.create>
            </Route>
          </Switch>
          <Switch>
            <Route path="/update">>
              <this.update></this.update>
            </Route>
          </Switch>
          <Switch>
            <Route path="">
              <this.showProduct></this.showProduct>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Main;
