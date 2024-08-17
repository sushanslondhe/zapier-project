import { Button } from "@/components/ui/button";
import Appbar from "./components/Appbar";
import { Check } from "lucide-react";

const Home = () => {
  return (
    <section className=" flex  flex-col gap-10 ">
      <Appbar />
      <div className=" flex flex-col justify-center items-center gap-10  ">
        <div className="flex flex-col justify-center max-w-xl md:max-w-2xl gap-5 md:gap-10   ">
          <h1 className=" text-4xl md:text-6xl font-bold">
            Automate as fast as you can type
          </h1>
          <p className=" font-serif font-light text-lg ">
            AI gives you automation superpowers, and Zapier puts them to work.
            Pairing AI and Zapier helps you turn ideas into workflows and bots
            that work for you.
          </p>
        </div>
        <div>
          <Button
            variant="primaryButton"
            className=" rounded-3xl h-[50px] px-10 text-white font-bold text-lg"
          >
            Start Free with email
          </Button>
        </div>
        <div className="flex gap-2 md:flex md:gap-20 ">
          <div className="flex gap-1">
            <Check /> <span className=" font-bold">Free Forever</span> for core
            features
          </div>
          <div className="flex gap-1">
            <Check /> <span className=" font-bold">More apps</span> for core
            features
          </div>
          <div className="flex gap-1">
            <Check /> Cutting edge{" "}
            <span className=" font-bold">AI features</span>
          </div>
        </div>
      </div>
      <div className=" flex justify-center h-[400px] md:h-[600px] ">
        <video
          className=" aspect-square  md:max-w-5xl "
          autoPlay
          loop
          muted
          playsInline
          src="https://res.cloudinary.com/zapier-media/video/upload/f_auto,q_auto/v1706042175/Homepage%20ZAP%20Jan%2024/012324_Homepage_Hero1_1920x1080_pwkvu4.mp4"
        ></video>
      </div>
      <div className=" flex flex-col max-w-lg md:max-w-3xl mx-auto gap-5 mb-20">
        <h1 className=" text-4xl">
          Get started quickly with these best-practice templates
        </h1>
        <p className=" font-serif text-muted-foreground text-lg">
          No need to start from scratch. In just a few minutes, you can use
          Interfaces, Tables, and Zaps to create complete solutions and reclaim
          countless hours of your time.
        </p>
      </div>
    </section>
  );
};

export default Home;
