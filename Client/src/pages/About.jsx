import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - E-Commerce Hub"}>
      <div className="container">
        <div className="row mt-5 pt-5">
          <div className="col-md-6">
            <img
              src="/images/Aboutus.jpg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6">
            <p className="about-text">
              Welcome to <strong>E-Commerce Hub</strong>, your premier online
              destination offering a plethora of items catering to every need
              and desire. Our team of four is dedicated to providing customers
              with access to an extensive array of products across diverse
              categories, all in one convenient location. Whether you're seeking
              the latest fashion trends, cutting-edge electronics, or home decor
              essentials, our meticulously curated selection ensures there's
              something for everyone. With a commitment to excellence, we strive
              to exceed your expectations at every turn.
              <br /> <br />
              Fashion enthusiasts will delight in our curated collection of
              clothing, shoes, and accessories. We feature both timeless
              classics and the latest trends from top brands and emerging
              designers alike. Whether you're searching for sleek and
              sophisticated attire for a formal event or casual and trendy
              pieces for everyday wear, our fashion category has you covered.
            </p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6 order-md-2">
            <img
              src="/images/Aboutus2.jpg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6 order-md-1">
            <p className="about-text">
              For tech-savvy shoppers, our comprehensive range of electronics,
              gadgets, and gizmos is designed to keep you connected,
              entertained, and productive. From smartphones and tablets to
              laptops and smart home devices, our selection boasts the latest
              innovations to enhance your digital experience. Dive into the
              world of connectivity and productivity with our array of
              smartphones, tablets, laptops, and smart home devices. Stay at the
              forefront of innovation and enjoy a seamless digital lifestyle
              with our cutting-edge technology offerings tailored to meet your
              every need.
              <br /> <br />
              Additionally, our home and living category offers a curated
              selection of furniture, decor, kitchenware, and more to refresh
              your living space. Create a sanctuary of style and comfort with
              our carefully chosen products designed to inspire and delight.
              Whether you're looking to revamp your entire home or add the
              finishing touches to a specific room, you'll find everything you
              need in our home and living section.
            </p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <img
              src="/images/Aboutus3.jpg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-6 pb-3">
            <p className="about-text">
              At E-Commerce Hub, we understand the importance of holistic
              well-being. Our commitment to your health extends to a diverse
              range of products tailored to support your journey to optimal
              wellness. Explore our selection of vitamins, supplements, fitness
              equipment, and self-care essentials to nurture your body and mind.
              Health and wellness are also a priority at E-Commerce Hub, with
              our diverse range of products supporting your journey to optimal
              well-being.
              <br /> <br />
              As a team of four, we've invested in creating an easy-to-navigate
              platform with secure payment options to ensure stress-free
              transactions. Our website is optimized for a smooth and intuitive
              shopping experience across various devices. We strive to exceed
              your expectations at every turn, with our dedicated customer
              service team ready to assist you with any questions or concerns.
              <em>
                <strong>
                  {" "}
                  Your satisfaction is our top priority and we're committed to
                  providing high-quality products and fast, reliable shipping.
                </strong>
              </em>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
