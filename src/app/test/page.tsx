import CardItem, { Card } from "../../components/card/card-item";

const dummyCard: Card = {
  id: "1",
  content:
    "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..",
  createdBy: {
    name: "Admin-1",
    role: "admin",
  },
  createdAt: new Date().toISOString(),
};

export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#181919]">
      
        <h1 className="text-white text-[64px] font-bold">Memo Cards</h1>
        <div className="max-w-md mx-auto sm:mt-8 mt-10">
          <CardItem card={dummyCard} />
        </div>
      
    </div>
  );
}
