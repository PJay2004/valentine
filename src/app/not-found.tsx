import Image from "next/image";
import { cn } from "./util/cn";

export default function notFound() {
  return (
    <div
      className={cn(
        "w-full min-h-screen flex items-center justify-center bg-pink-300"
      )}
    >
      <section className="flex flex-col items-center justify-center h-full container mx-auto px-4 sm:px-10 overflow-hidden">
        <div className="relative w-full aspect-video max-w-[500px]">
          <Image
            src="/sadge.gif"
            alt="cute cat crying gif"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <p className="text-red-500 font-bold text-3xl md:text-4xl text-center mt-10">
          {`Page Not Found :(`}
        </p>
      </section>
    </div>
  );
}
