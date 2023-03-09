import { useRouter } from "next/router";
import React from "react";

export default function SubHeader() {
  const dummyCategory = [
    {
      id: 1,
      title: "케이크",
    },
    {
      id: 2,
      title: "텀블러/보온병",
    },
    {
      id: 3,
      title: "머그/컵",
    },
    {
      id: 4,
      title: "라이프스타일",
    },
    {
      id: 5,
      title: "티/커피용품",
    },
    {
      id: 6,
      title: "세트",
    },
  ];

  const router = useRouter();
  const { pathname, query } = useRouter();

  const handlePushLink = (title: string) => {
    router.push(`${pathname}?category=${title}`);
  };

  return (
    <div className="header-sub first-section">
      <nav>
        <ul>
          {dummyCategory.map((category) => (
            <li
              className={query.category === category.title ? "active" : ""}
              onClick={() => handlePushLink(category.title)}
            >
              {category.title}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}