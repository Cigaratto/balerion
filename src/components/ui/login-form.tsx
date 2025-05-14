import { Button } from "./button";
import { Input } from "./input";

export function LoginForm() {
  return (
    <div className="flex flex-col justify-center h-screen">
      <h1 className="text-2xl md:text-[32px] text-white">เข้าสู่ระบบ</h1>
      <p className="text-xs text-white pt-2.5 md:pt-5 pb-3">บัญชีพนักงาน</p>
      <Input
        className=" text-white bg-[#393937] border-0 rounded-xl w-[222px] md:w-[313px] h-[42px]"
        type="text"
        placeholder=""
      />
      <p className="text-xs text-white pt-2.5 md:pt-5 pb-3">รหัสผ่าน</p>
      <Input
        className="text-white bg-[#393937] border-0 rounded-xl w-[222px] md:w-[313px] h-[42px]"
        type="password"
        placeholder=""
      />
      <Button className="mt-5 text-[#11181C] bg-white w-[222px] md:w-[313px] h-[43px]" type="submit">
        ค้นหา
      </Button>
    </div>
  );
}
