import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Appbar() {
  return (
    <div className=" border-b h-[60px] flex justify-between items-center">
      <div className="md:hidden pl-2">
        <Menu />
      </div>
      <div className=" text-3xl font-bold px-5">Zapier</div>
      <div className=" flex gap-5 px-5">
        <div>
          <Button className=" text-lg" variant="ghost">
            Login
          </Button>
        </div>
        <div className="">
          <Button variant="primaryButton" className="">
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
}
