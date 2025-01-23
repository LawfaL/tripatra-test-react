import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";

interface ProductProps {
  title: string;
  price: string;
}

const ProductMemo = ({ title, price }: ProductProps) => {
  return (
    <div className="w-full">
      <AspectRatio ratio={1 / 1} className="rounded-md overflow-hidden">
        <img
          src={`https://picsum.photos/seed/${
            Math.floor(Math.random() * 100) + 1
          }/500`}
          alt="Image"
          className="object-cover transition-all hover:scale-105 rounded-md h-full "
        />
      </AspectRatio>
      <div className="space-y-1 text-sm mt-3">
        <h3 className="font-medium leading-none">{title}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">{price}</p>
      </div>
    </div>
  );
};

export const Product = React.memo(ProductMemo);
