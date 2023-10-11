import React from "react";

function About() {
  return (
    <div className="max-w-[1320px] md:py-[80] py-5 flex mx-auto flex-col items-center md:flex-row">
      <div className="flex md:w-1/2 pb-5">
        <img
          className="h-96 w-full object-cover"
          alt="About Us"
          src="/images/fleet-4.jpeg"
        />
      </div>
      <div className="md:w-1/2 px-8">
        <h1 className="text-4xl text-center font-semibold pb-5">Who We Are</h1>
        <p className="py-2">
          We at Gotravrlb are committed to providing you with the best taxi
          service in Bangalore. With our fleet of cars and drivers, we can
          ensure that your ride is comfortable, safe, and stress-free.
        </p>
        <p className="py-1">
          We understand that traveling often means dealing with long lines,
          crowded buses and trains, and other frustrating situations. That's why
          we offer our services at affordable rates so that you can spend less
          time waiting around for transportation and more time enjoying your
          trip! If you need to get from point A to point B quickly but don't
          want to spend all day doing it, then Gotravrlb is here for you!
        </p>
        <p className="py-2">
          Gotravrlb is the taxi service you can rely on, day or night. We're
          here to help you get where you need to go, whenever you need us. Our
          drivers are friendly and professional, and our cars are clean and
          safe. If there's ever a problem with your ride, just call at{" "}
          <strong>8618888210</strong> and we'll take care of it right away.
        </p>
      </div>
    </div>
  );
}

export default About;
