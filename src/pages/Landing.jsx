import React from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats, Marquee, BrandCarousel, Lookbook, Newsletter } from "../components";
import { useLoaderData } from "react-router-dom";
import { getLandingProducts } from "../data/localDb";

export const landingLoader = async () => {
  const products = getLandingProducts(8);
  return { products };
};

const Landing = () => {
  const { products } = useLoaderData();

  return (
    <main>
      <Hero />
      <Marquee />
      <Stats />

      <section className="selected-products">
        <div className="section-heading">
          <span className="section-heading-label">Featured</span>
          <h2>Trending <span>Products</span></h2>
        </div>
        <div className="selected-products-grid">
          {products.map((product) => (
            <ProductElement
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.imageUrl}
              rating={product.rating}
              price={product.price.current.value}
              brandName={product.brandName}
            />
          ))}
        </div>
      </section>

      <Lookbook />
      <BrandCarousel />
      <Newsletter />
    </main>
  );
};

export default Landing;
