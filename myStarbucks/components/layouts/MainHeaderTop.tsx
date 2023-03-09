import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function MainHeaderTop() {
  const router = useRouter();
  console.log(router);
  return (
    <div className="header-top">
      <div className="menu-icon">
        {/* {(pathname === "/") | (pathname === "/best") ? (
          <Link href="/contents/contents">
            <img src="/images/icons/menu.svg" alt="" />
          </Link>
        ) : (
          <img src="/images/icons/left.png" alt="" />
        )} */}
      </div>
      <h1>온라인 스토어</h1>
      <nav>
        <ul>
          <li>
            <Link href="/search">
              <img src="/images/icons/search.svg" />
            </Link>
          </li>
          <li>
            <Link href="/cart/cart">
              <img src="/images/icons/shopping-cart.svg" />
            </Link>
          </li>
          <li>
            <img src="/images/icons/close.png" />
          </li>
        </ul>
      </nav>
    </div>
  );
}