"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Card, Role } from "@/components/card/card-item";


type CardData = {
  cards: Card[];
  addCard: (content: string, role: Role, cardLabel: string) => void;
  isAdding: boolean;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  newTagCards: string[];
};

const initialCards: Card[] = [
  {
    id: "1",
    content:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    createdBy: { role: "ADMIN" },
    createdAt: new Date(),
    cardLabel: "ADMIN-1",
  },
  {
    id: "2",
    content:
      "second dummy card content here lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
    createdBy: { role: "USER" },
    createdAt: new Date(),
    cardLabel: "MEMO-1",
  },
];

const CardContext = createContext<CardData | undefined>(undefined);

export const CardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTagCards, setNewTagCards] = useState<string[]>([]);

  
  useEffect(() => {
    const storedData = localStorage.getItem("cards");
    if (storedData) {
      setCards(JSON.parse(storedData));
    } else {
      setCards(initialCards); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const addCard = (content: string, role: Role, cardLabel: string) => {
    const newCard: Card = {
      id: Date.now().toString(),
      content,
      createdBy: { role },
      createdAt: new Date(),
      cardLabel,
    };
    setCards((prev) => [newCard, ...prev]);
    setNewTagCards((prev) => [newCard.id, ...prev]);
  };

  return (
    <CardContext.Provider value={{ cards, addCard, isAdding, setIsAdding, newTagCards }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCard = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCard must be used within <CardProvider>");
  return context;
};
