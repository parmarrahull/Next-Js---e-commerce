import { Button } from "antd";
import "antd/dist/antd.css";
import { useEffect, useState } from "react";

const ProductListing = ({ data }) => {
  const [cart, setCart] = useState([]);

  if (typeof window !== "undefined") {
    JSON.parse(localStorage.getItem("cart")) || [];
  }

  useEffect(() => {
    if (cart.length !== 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    const localstorageCart = JSON.parse(localStorage.getItem("cart"));
    const localstorageItem = localstorageCart?.find(
      (item) => item.id === product.id
    );
    if (localstorageItem) {
      const newProdut = cart.map((item) =>
        localstorageItem.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(newProdut);
    } else {
      setCart([...cart, product]);
    }
  };

  return (
    <>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", margin: 50 }}>
        {data?.map((product) => {
          return (
            <>
              <div
                id={product?.id}
                className="card"
                style={{
                  display: "flex",
                  backgroundColor: "#fafafa",
                  flex: "0 0 24%",
                  padding: 30,
                  boxShadow: "0px 13px 10px  -7px rgba(0,0,0,0.1)",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                  borderBottomLeftRadius: "12px",
                  borderBottomRightRadius: "12px",
                }}
              >
                <div style={{ height: "100%" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      height: "50%",
                    }}
                  >
                    <img
                      style={{
                        maxWidth: 200,
                        maxHeight: 200,
                      }}
                      alt="example"
                      src={product.image}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: 5,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        margin: 0,
                        background: "#53c18e",
                        color: "white",
                      }}
                    >
                      ${product.price}
                    </p>
                  </div>
                  <div>
                    <h3 style={{ color: "#706f6f", fontSize: 20 }}>
                      {product.category}
                    </h3>
                    <h4 style={{ fontSize: 20 }}>{product.title} </h4>
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => addToCart({ ...product, quantity: 1 })}
                    type="primary"
                    danger
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ProductListing;

export const getServerSideProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
