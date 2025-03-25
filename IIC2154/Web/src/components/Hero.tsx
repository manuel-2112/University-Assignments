import React from "react";

interface HeroProps {
  title: string;
  description: string;
  ctaText: string;
  backgroundImage: string;
  icon: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  description,
  ctaText,
  backgroundImage,
  icon,
}) => {
  return (
    <section className="flex overflow-hidden relative flex-col justify-center items-center px-16 py-20 min-h-[712px] max-md:px-5">
      <img
        loading="lazy"
        src={backgroundImage}
        alt=""
        className="object-cover absolute inset-0 size-full"
      />
      <div className="flex relative flex-col items-center mt-48 max-w-full w-[568px] max-md:mt-10 max-md:w-full">
        <h1 className="text-5xl text-center text-black uppercase leading-[54.54px] max-md:max-w-full max-md:text-4xl">
          {title}
        </h1>
        <div className="flex gap-5 items-start px-6 py-3.5 mt-12 text-lg tracking-wide leading-8 rounded-2xl bg-zinc-300 text-stone-500 max-md:flex-wrap max-md:pr-5 max-md:mt-10 max-md:w-full">
          <input type="text" placeholder={description} className="flex-auto mt-1 text-center max-md:max-w-full bg-zinc-300">
          </input>
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="shrink-0 aspect-[1.15] fill-stone-900 w-[31px] mt-1"
          />
        </div>
        <button className="justify-center  py-2.5 mt-10 text-base font-medium tracking-tight leading-6 text-center text-white bg-lime-500 rounded-lg p-4">
          {ctaText}
        </button>
      </div>
    </section>
  );
};

export default Hero;
