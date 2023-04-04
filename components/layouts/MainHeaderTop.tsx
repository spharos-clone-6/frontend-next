import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRecoilState, useRecoilValue } from "recoil";
import ContentsModal from "../modals/ContentsModal";
import Image from "next/image";
import { contentsModalState } from "@/state/contentsModalState";
import { CgProfile } from "react-icons/cg";
import { GrCart, GrSearch } from "react-icons/gr";
import { accessTokenState } from "@/state/accessTokenState";
import Badge from "../ui/Badge";
import BackIcon from "../ui/BackIcon";

export default function MainHeaderTop() {
  const router = useRouter();
  const [contentsIsView, setContentsIsView] =
    useRecoilState<boolean>(contentsModalState);
  const accessToken = useRecoilValue(accessTokenState);

  const handleBack = () => {
    if (router.pathname === "store") {
      router.replace("/");
      setContentsIsView(false);
    } else router.back();
  };

  const showModal = () => {
    setContentsIsView(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setContentsIsView(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <div className="header-top">
        <div className="menu-icon">
          {router.pathname === "/store" ||
          router.pathname.includes("/product") ||
          router.pathname === "/cart" ||
          router.pathname === "/payment" ? (
            <BackIcon />
          ) : (
            <div>
              <button onClick={showModal} style={{ padding: "0" }}>
                <Image
                  src="/images/icons/menu.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </button>
            </div>
          )}
        </div>
        <div onClick={() => router.push("/")}>
          <h1 onClick={closeModal}>온라인 스토어</h1>
        </div>
        <nav>
          <ul>
            {router.pathname === "/payment" ? (
              <li className="close-icon">
                <Image
                  src="/images/icons/close.png"
                  alt=""
                  width={20}
                  height={20}
                />
              </li>
            ) : (
              <>
                <li>
                  <Link href="/search">
                    <GrSearch size={20} />
                  </Link>
                </li>
                <li>
                  {accessToken && <Badge />}
                  <Link href="/cart">
                    <GrCart size={20} />
                  </Link>
                </li>
                <li>
                  <Link href={!accessToken ? "/login" : "/mypage"}>
                    <CgProfile size={20} />
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
