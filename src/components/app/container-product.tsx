import React from "react";
import { SectionHead } from "./section-head";
import { ModalLogin } from "./modal-login";
import { Product } from "./product";
import { useAuth } from "@/hooks/auth";
import { ModalCreateProduct } from "./modal-create-product";
import { ProductDetail } from "./product-detail";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/apollo/queries";

const ContainerProductMemo = () => {
  const { getProfile } = useAuth();
  const profile = getProfile();

  const { data, refetch } = useQuery(GET_PRODUCTS);
  return (
    <>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-5">
        <SectionHead
          title="Newest Products"
          description="Discover our latest products, curated to enhance your lifestyle."
          actions={
            !profile ? <ModalLogin /> : <ModalCreateProduct refetch={refetch} />
          }
        />
        <div className="grid grid-cols-5 gap-5 mb-5">
          {data?.getAllProduct.slice(0, 5).map((product: any, index: number) => (
            <ProductDetail key={index} data={product} refetch={refetch}>
              <button>
                <Product title={product.name} price={`$` + product.price} />
              </button>
            </ProductDetail>
          ))}
        </div>
        <SectionHead
          title="See our products"
          description="Explore our diverse range of products, crafted to meet your needs
              and preferences."
        />
        <div className="grid grid-cols-8 gap-5 flex-wrap">
          {data?.getAllProduct.map((product: any, index: number) => (
            <ProductDetail key={index} data={product} refetch={refetch}>
              <button>
                <Product title={product.name} price={`$` + product.price} />
              </button>
            </ProductDetail>
          ))}
        </div>
      </div>
    </>
  );
};

export const ContainerProduct = React.memo(ContainerProductMemo);
