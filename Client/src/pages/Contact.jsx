import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mt-3 mb-3">
            <img
              src="/images/contactus.jpg"
              alt="contactus"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div className="bg-dark p-3 rounded text-white mb-3">
              <h1 className="text-center mb-4">CONTACT US</h1>
              <p className="text-justify">
                Feel free to call us anytime for queries or information about our
                products. We are available 24/7 to assist you.
              </p>
              <div className="mt-4">
                <p className="mb-2"><BiMailSend /> : <span>www.help@ecommercehub.com</span></p>
                <p className="mb-2"><BiPhoneCall /> : <span>+91 9040277767</span></p>
                <p className="mb-2"><BiSupport /> : <span>1800-0000-0000 (toll free)</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
