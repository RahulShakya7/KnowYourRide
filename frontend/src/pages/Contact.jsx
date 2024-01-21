import React from "react";
import CommonSection from "../components/CommonSection";
import Helmet from "../components/Helmet/Helmet";

import "../Styles/Contact.css";

export default function Contact() {
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <div className="container mx-auto py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1 pb-10">
              <h6 className="font-bold mb-4">Get In Touch</h6>

              <form>
                <div className="mb-4">
                  <input
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <textarea
                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                    rows="5"
                    placeholder="Message"
                  ></textarea>
                </div>

                <button className="message_button bg-purple-500 text-white w-full py-2 rounded hover:bg-blue-600" type="submit">
                  Send Message
                </button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="contact__info">
                <h6 className="font-bold">Contact Information</h6>
                <p className="mb-4">
                  Kathmandu, Nepal
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <h6 className="text-sm">Phone:</h6>
                  <p className="mb-0">+977 98378347262</p>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h6 className="text-sm">Email:</h6>
                  <p className="mb-0">knowyourride@gmail.com</p>
                </div>

                <h6 className="font-bold mt-4">Follow Us</h6>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

