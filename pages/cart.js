import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cartObj = JSON.parse(localStorage.getItem("cart"));
    setCartItems(cartObj);
    localStorage.setItem(
      "cartCount",
      JSON.stringify(
        cartObj.reduce(function (sum, current) {
          return sum + current.quantity;
        }, 0)
      )
    );
    localStorage.setItem(
      "cartTotal",
      JSON.stringify(
        cartObj.reduce(function (sum, current) {
          return sum + current.total;
        }, 0)
      )
    );
  }, []);

  const incrementQuantity = (productId) => {
    const updatedCart = cartItems.map((product) => {
      if (product.id == productId) {
        product?.quantity ? (product.quantity += 1) : (product["quantity"] = 1);
      }
      product["total"] = product.price * product.quantity;
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCartItems(updatedCart);
  };

  const decrementQuantity = (productId) => {
    const updatedCart = cartItems.map((product) => {
      if (product.id == productId) {
        product?.quantity === 1
          ? removeProdect(productId)
          : (product.quantity -= 1);
      }
      product["total"] = product.price * product.quantity;
      return product;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCartItems(updatedCart);
  };

  //   //Delete Cart Item
  const removeProdect = (id) => {
    const updatedCart = cartItems.filter((product) => product.id != id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCartItems(updatedCart);
  };

  return (
    <>
      <section class="h-100 gradient-custom">
        <div class="container py-5">
          <div class="row d-flex justify-content-center my-4">
            <div class="col-md-8">
              <div class="card mb-4">
                <div class="card-header py-3">
                  <h5 class="mb-0">Cart - {cartItems.length} items </h5>
                </div>
                {cartItems &&
                  cartItems?.map((product) => (
                    <div class="card-body">
                      <div class="row">
                        <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
                          <div
                            class="bg-image hover-overlay hover-zoom ripple rounded"
                            data-mdb-ripple-color="light"
                          >
                            <img
                              src={product?.image}
                              class="w-100"
                              alt="image"
                            />
                            <a href="#!">
                              <div
                                class="mask"
                                style={{
                                  backgroundColor: "rgba(251, 251, 251, 0.2)",
                                }}
                              ></div>
                            </a>
                          </div>
                        </div>

                        <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
                          <p>
                            <strong> {product?.category}</strong>
                          </p>
                          <p>{product?.title}</p>
                          <button
                            onClick={() => removeProdect(product?.id)}
                            type="button"
                            class="btn btn-primary btn-sm me-1 mb-2"
                            data-mdb-toggle="tooltip"
                            title="Remove item"
                          >
                            <i class="bi bi-trash3"></i>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger btn-sm mb-2"
                            data-mdb-toggle="tooltip"
                            title="Move to the wish list"
                          >
                            <i class="bi bi-heart"></i>
                          </button>
                        </div>

                        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
                          <div
                            class="d-flex mb-4"
                            style={{ maxWidth: "300px" }}
                          >
                            <button
                              class="btn btn-primary px-3 me-2"
                              onClick={() => incrementQuantity(product?.id)}
                            >
                              <i class="bi bi-plus-lg"></i>
                            </button>

                            <div class="form-outline">
                              <input
                                id="form1"
                                min="0"
                                name="quantity"
                                value={
                                  product?.quantity ? product?.quantity : "1"
                                }
                                type="number"
                                class="form-control"
                              />
                              <label class="form-label" for="form1">
                                Quantity
                              </label>
                            </div>

                            <button
                              class="btn btn-primary px-3 ms-2"
                              onClick={() => decrementQuantity(product?.id)}
                            >
                              <i class="bi bi-dash-lg"></i>
                            </button>
                          </div>

                          <p class="text-start text-md-center">
                            <strong>
                              $
                              {product?.total ? product?.total : product?.price}
                            </strong>
                          </p>
                        </div>
                      </div>
                      <hr class="my-4" />
                    </div>
                  ))}
              </div>
            </div>
            {/* <div class="col-md-4">
              <div class="card mb-4">
                <div class="card-header py-3">
                  <h5 class="mb-0">Summary</h5>
                </div>
                {cartItems.map((product) => (
                  <div class="card-body">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                        Products
                        <span>{product.total}</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center px-0">
                        Shipping
                        <span>Gratis</span>
                      </li>
                      <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                        <div>
                          <strong>Total amount</strong>
                          <strong>
                            <p class="mb-0">(including VAT)</p>
                          </strong>
                        </div>
                        <span>
                          <strong>{product.total}</strong>
                        </span>
                      </li>
                    </ul>

                    <button
                      type="button"
                      class="btn btn-primary btn-lg btn-block"
                    >
                      Go to checkout
                    </button>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};
export default Cart;
