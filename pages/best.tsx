import ProductContainerGrid from "@/components/layouts/ProductContainerGrid";
import Loading from "@/components/ui/Loading";
import { productType } from "@/types/types";
import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function best() {
  const [loading, setLoading] = useState<boolean>(true);
  const [itemList, setItemList] = useState<productType[]>([]);
  const { query } = useRouter();

  console.log(query.category);

  useEffect(() => {
    const getData = async () => {
      console.log(query);
      const result = await axios.get(
        `http://backend.grapefruit-honey-black-tea.shop/api/product/search/c?filter=${query.category}`
      );
      setItemList(result.data.content);
      setLoading(false);
    };
    getData();
  }, [query]);

  return (
    <>
      {loading ? (
        <div style={{ width: "100vw", height: "100vh", paddingTop: "55%" }}>
          <Loading size={40} />
        </div>
      ) : (
        <div className="first-section-sub-one">
          <ProductContainerGrid itemList={itemList} />
        </div>
      )}
    </>
  );
}
