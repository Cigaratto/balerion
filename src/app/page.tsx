"use client";
import AddCardButton from "@/components/button/add-card-button";
import CardItem, { Card } from "../components/card/card-item";
import Usermenu from "@/components/user-menu";
import { useCard } from "@/context/card-context";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context";

export default function Home() {
  const { cards, isAdding } = useCard();
  const { role } = useAuth();

  const [cardShown, setCardShown] = useState<Card[]>([]);
  useEffect(() => {
    if (role == "USER") {
      setCardShown(
        cards
          .filter((c) => {
            return c.createdBy.role == "USER";
          })
          .sort((a, b) => {
            return a.createdAt > b.createdAt ? 1 : -1;
          })
      );
    } else if (role == "ADMIN") {
      setCardShown(
        cards.sort((a, b) => {
          return a.createdAt > b.createdAt ? -1 : 1;
        })
      );
    }
  }, [cards]);
  return (
    <div className="relative min-h-screen bg-[#181919]">
      <div className="absolute top-0 right-0 p-4">
        <Usermenu />
      </div>

      <div className="flex flex-col items-center justify-start min-h-screen pt-32 px-4">
        <div className="flex items-center gap-4 mb-10 flex-wrap justify-center">
          <h1 className="text-white text-5xl md:text-[64px] font-bold text-center">
            Memo Cards
          </h1>
          <span className="text-white text-[24px] pt-3 md:text-[32px] font-medium">
            ({cardShown.length}
            {isAdding ? "+1" : ""})
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto">
          {cardShown.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
          <div className="mb-28">
          <AddCardButton/>
          </div>
        </div>
      </div>
    </div>
  );
}
