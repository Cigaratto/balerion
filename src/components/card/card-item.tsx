import { Card } from "@/components/ui/card";
import { useCard } from "@/context/card-context";

export type Role = "ADMIN" | "USER";

export interface Card {
  id: string;
  content: string;
  createdBy: {
    role: Role;
  };
  createdAt: Date;
  cardLabel: string;
}

interface Props {
  card: Card;
}

export default function CardItem({ card }: Props) {
  const { newTagCards } = useCard();
  const tagColor = card.createdBy.role === "ADMIN" ? "bg-[#FF6C6F]" : "bg-[#62AEFF]";
  const isNewCard = newTagCards.includes(card.id); 

  return (
    <div className="relative bg-white w-[347px] h-[198px] border p-4 rounded-xl">
      {isNewCard && (
        <div className="absolute w-[56px] h-[34px] top-[-14px] right-[-14px] text-center pt-2 bg-[#8C6CFF] text-white text-xs rounded-full">
          NEW
        </div>
      )}

      <div className="flex justify-between items-start">
        <div className="flex flex-col space-y-2">
          <span className="font-semibold text-[15px] pt-1 text-gray-500">
            {card.cardLabel}
          </span>
          <span
            className={`font-semibold text-white text-center text-xs py-1.5 rounded-full w-[61px] h-[30px] ${tagColor}`}
          >
            {card.createdBy.role}
          </span>
        </div>

        <div className="flex w-[214px] h-[159px]">
          <p className="font-light text-[10px] text-gray-700 pt-0.5 pl-[27px] leading-5">
            {card.content}
          </p>
        </div>
      </div>
    </div>
  );
}
