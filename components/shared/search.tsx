"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";

import { API, Routes } from "@/services";
import { Product } from "@prisma/client";
import { cn, generatePath } from "@/lib/utils";

interface SearchInputProps {
  className?: string;
}

export const SearchInput = ({ className }: SearchInputProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      try {
        const response = await API.products.search(searchQuery);
        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    },
    250,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}

      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                key={product.id}
                onClick={onClickItem}
                href={generatePath(Routes.Product.Details, { id: product.id })}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
              >
                <img
                  alt={product.name}
                  src={product.imageUrl}
                  className="rounded-sm h-8 w-8"
                />
                <p>{product.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
