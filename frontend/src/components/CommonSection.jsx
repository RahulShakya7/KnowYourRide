import React from "react";
import "../Styles/Common-section.css";

export default function CommonSection({ title }) {
  return (
    <section className="common__section mb-5">
      <div className="container mx-auto my-20 text-center">
        <h1 className="text-white text-4xl">{title}</h1>
      </div>
    </section>
  );
};

