export default function HeroSection() {
  return (
    <section className="h-screen w-full flex justify-center items-center border">
      <div className="w-full text-center flex flex-col items-center justify-center gap-4">
        <h1 className="max-w-2xl text-3xl md:text-5xl lg:text-6xl duration-300 font-haffer-medium">
          Lorem ipsum dolor sit amet consectetur.
        </h1>
        <p className="max-w-lg md:text-lg lg:text-xl duration-300 text-paragraph">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Necessitatibus veritatis suscipit placeat voluptatum laudantium vitae
          nisi rerum
        </p>
      </div>
    </section>
  );
}
