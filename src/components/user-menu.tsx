import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";
import { LuLogOut } from "react-icons/lu";

export default function Usermenu() {
  const { email, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <span className="text-white text-2xl md:text-[32px] font-semibold">{email}</span>
      <Button onClick={handleLogout}>
        <LuLogOut style={{ width: "20px", height: "20px" }} />
      </Button>
    </div>
  );
}
