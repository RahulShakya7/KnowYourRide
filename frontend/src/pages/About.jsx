import React from "react";
import AboutSection from "../components/AboutSection";
import CommonSection from "../components/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import driveImg from "../assets/all-images/drive.jpg";

export default function About() {
  return (
    <Helmet title="About">
      <CommonSection title="About Us" />
      <AboutSection aboutClass="aboutPage" />

      <section className="about__page-section pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <img src={driveImg} alt="" className="w-full rounded-3" />
            </div>

            <div className="flex flex-col justify-center">
              <h2 className="section__title">
                We Are Committed To Provide quality News about the latest vehicles and vehicle trends
              </h2>

              <p className="section__description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Eveniet veniam assumenda aperiam accusantium ex autem perferendis
                repellendus nostrum delectus. Nemo et dolore est tempore rem
                minima adipisci magni dolorum ipsam.
              </p>

              <p className="section__description">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Eveniet veniam assumenda aperiam accusantium ex autem perferendis
                repellendus nostrum delectus. Nemo et dolore est tempore rem
                minima adipisci magni dolorum ipsam.
              </p>

              <div className="flex items-center gap-3 mt-4">
                <span className="text-xl">
                  <i className="ri-phone-line"></i>
                </span>

                <div>
                  <h6 className="section__subtitle">Need Any Help?</h6>
                  <h4>+977 9813945865</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};


