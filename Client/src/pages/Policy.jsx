import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container mt-5 pt-4">
        <div className="privacy-policy">
          <h2 className="policy-heading">Privacy Policy</h2>

          <div className="policy-section">
            <h3>Information We Collect</h3>
            <p>
              <strong>Personal Information:</strong> We may collect personal
              information such as your name, email address, and phone number
              when you provide it to us voluntarily.
            </p>
            <p>
              <strong>Usage Information:</strong> We automatically collect
              information about your use of our website and services, including
              your IP address, browser type, operating system, and browsing
              behavior.
            </p>
          </div>

          <div className="policy-section">
            <h3>How We Use Your Information</h3>
            <ul>
              <li>To provide and maintain our services.</li>
              <li>
                To communicate with you, including responding to your inquiries
                and providing customer support.
              </li>
              <li>
                To personalize your experience and improve our website and
                services.
              </li>
              <li>
                To analyze trends, administer our website, and gather
                demographic information.
              </li>
              <li>
                To comply with legal obligations and enforce our policies.
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>Information Sharing</h3>
            <ul>
              <li>
                With service providers who assist us in operating our website
                and providing our services.
              </li>
              <li>
                With our affiliates and business partners for marketing and
                promotional purposes.
              </li>
              <li>
                In response to legal requests or proceedings, or to protect our
                rights, property, or safety.
              </li>
            </ul>
          </div>

          <div className="policy-section">
            <h3>Data Security</h3>
            <p>
              We take appropriate measures to protect your personal information
              from unauthorized access, disclosure, alteration, or destruction.
            </p>
          </div>

          <div className="policy-section">
            <h3>Your Choices</h3>
            <p>
              You may choose not to provide certain information, but this may
              limit your ability to access certain features of our website or
              use our services.
            </p>
          </div>

          <div className="policy-section">
            <h3>Changes to This Privacy Policy</h3>
            <p>
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
