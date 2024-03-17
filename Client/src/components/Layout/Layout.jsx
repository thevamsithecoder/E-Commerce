import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
      <Toaster />
        {children}</main>
      <Footer />
    </div>
  );
};
//if it is 80vh then all the below area covered

Layout.defaultProps = { 
  description : "MERN Stack Project",
  keywords : "MongoDB, ExpressJS, ReactJS, NodeJS",
  author : "Vamsi Sai Kotni",
  title : "E-Commerce Hub - Shop Now"
}

export default Layout;