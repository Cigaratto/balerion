"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { useCard } from "@/context/card-context";
import { useAuth } from "@/context/auth-context";

export default function AddCardButton() {
  const { addCard, cards, isAdding, setIsAdding } = useCard();
  const { role } = useAuth();

  const [newContent, setNewContent] = useState("");
  const [reservedNumber, setReservedNumber] = useState<number | null>(null);

  const currentRole = (role as "ADMIN" | "USER") || "USER";

  const getNextLabelNumber = () => {
    return (
      cards.filter((card) => card.createdBy.role === currentRole).length + 1
    );
  };

  const handleStartAdding = () => {
    setReservedNumber(getNextLabelNumber());
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!newContent.trim()) return;

    const cardLabel = `${currentRole === "ADMIN" ? "ADMIN" : "MEMO"}-${
      reservedNumber ?? getNextLabelNumber()
    }`;
    addCard(newContent, currentRole, cardLabel);

    setNewContent("");
    setIsAdding(false);
  };

  if (isAdding) {
    const tagColor = currentRole === "ADMIN" ? "bg-[#FF6C6F]" : "bg-[#62AEFF]";
    const cardLabel = `${currentRole === "ADMIN" ? "ADMIN" : "MEMO"}-${
      reservedNumber ?? getNextLabelNumber()
    }`;

    return (
      <div className="w-[347px] h-[198px] bg-white border rounded-xl p-4 flex">
        <div className="flex flex-col justify-between w-1/3 pr-4">
          <div>
            <span className="font-semibold text-[15px] pt-1 text-gray-500">
              {cardLabel}
            </span>
            <span
              className={`font-semibold text-white text-center text-xs py-1.5 rounded-full w-[61px] h-[30px] inline-block mt-2 ${tagColor}`}
            >
              {currentRole}
            </span>
          </div>

          <Button
            onClick={handleSave}
            disabled={!newContent.trim()}
            className="self-start text-sm text-black underline hover:no-underline bg-transparent hover:bg-transparent"
            
          >
            SAVE
          </Button>
        </div>

        <textarea
          className="w-2/3 p-2 resize-none text-[10px] bg-gray-100 rounded ml-4 text-sm"
          placeholder="Type something..."
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      </div>
    );
  }

  return (
    <Button
      onClick={handleStartAdding}
      className="w-[347px] h-[198px] bg-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
    >
      <span className="text-6xl text-black font-semibold">+</span>
    </Button>
  );
}
