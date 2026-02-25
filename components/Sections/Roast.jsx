import BlurText from "../BlurText";
const Roast = () => {
  return (
    <section className="w-full bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* 1. Blur Text in the middle */}
        <BlurText
          text="Way better than Qureo"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-white text-4xl md:text-6xl font-pixel text-center mb-20 leading-tight justify-center"
        />
      </div>
    </section>
  );
};

export default Roast;
