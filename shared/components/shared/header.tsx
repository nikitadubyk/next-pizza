import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

import { cn } from "@/shared/lib";
import { Routes } from "@/shared/services";

import { Button } from "../ui";

import { SearchInput } from "./search";
import { Container } from "./container";
import { CartButton } from "./cart-button";

interface HeaderProps {
  hasCart?: boolean;
  className?: string;
  hasSearch?: boolean;
}

export const Header = ({
  className,
  hasCart = true,
  hasSearch = true,
}: HeaderProps) => {
  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href={Routes.Home}>
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={35} height={35} alt="Logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-3">
            <User size={16} />
            Войти
          </Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
