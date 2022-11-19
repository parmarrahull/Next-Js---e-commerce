import { ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const cart_count = JSON.parse(localStorage.getItem("cart_count"));
    setCount(cart_count);
  }, [count]);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                style={{ fontWeight: "bold" }}
                className="nav-link active"
                aria-current="page"
                href="/"
              >
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={{ display: "flex", width: 50, justifyContent: "end" }}
                className="nav-link active"
                aria-current="page"
                href="/cart"
              >
                <ShoppingCartOutlined style={{ fontSize: "30px" }} />
                <p>{count}</p>
              </Link>
            </li>
          </ul>
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default NavBar;
