import React from "react";
import CommonSection from "../components/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import NewsList from "../components/NewsList";

export default function News() {
  return (
    <Helmet title="News">
      <CommonSection title="News" />
      <section>
        <div className="container mx-auto">
          <div className="grid m-10">
            <NewsList />
          </div>
        </div>
      </section>
    </Helmet>
  );
};

