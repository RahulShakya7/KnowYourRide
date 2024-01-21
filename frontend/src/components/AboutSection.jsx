import React from "react";
import aboutImg from "../assets/all-images/Apache.png";

export default function AboutSection({ aboutClass }) {
  return (
    <section
      className={`about__section py-10 ${aboutClass === "aboutPage" ? "mt-0" : "mt-280"}`}
    >
      <div className="container mx-auto mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="lg:order-1">
            <div className="about__section-content">
              <h4 className="section__subtitle font-bold text-2xl">About Us</h4>
              <h2 className="section__title">Welcome to Know Your Ride</h2>
              <p className="section__description">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Voluptatum blanditiis esse accusantium dignissimos labore
                laborum. Veniam, corporis mollitia temporibus, in quaerat vero
                deleniti amet dolorem repudiandae, pariatur nam dolore! Impedit
                neque sit ad temporibus quam similique dolor ipsam praesentium
                sunt.
              </p>

              <div className="about__section-item flex items-center">
                <p className="section__description flex items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Lorem ipsum dolor
                  sit amet.
                </p>

                <p className="section__description flex items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Lorem ipsum dolor
                  sit amet.
                </p>
              </div>

              <div className="about__section-item flex items-center">
                <p className="section__description flex items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Lorem ipsum dolor
                  sit amet.
                </p>

                <p className="section__description flex items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Lorem ipsum dolor
                  sit amet.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:order-2">
            <div className="about__img">
              <img src={aboutImg} alt="" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

