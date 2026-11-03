import React from "react";
import { Filters, Pagination, ProductElement, SectionTitle } from "../components";
import "../styles/Shop.css";
import { useLoaderData } from "react-router-dom";
import { nanoid } from "nanoid";
import { getProducts } from "../data/localDb";
import { motion, AnimatePresence } from "framer-motion";

export const shopLoader = async ({ request }) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);

  let mydate = Date.parse(params.date);
  if (mydate && !isNaN(mydate)) {
    mydate = new Date(mydate).toISOString();
  } else {
    mydate = new Date("05 October 2010 14:48 UTC").toISOString();
  }

  const filterObj = {
    brand: params.brand ?? "all",
    category: params.category ?? "all",
    date: mydate,
    gender: params.gender ?? "all",
    order: params.order ?? "asc",
    price: params.price ?? 15000,
    search: params.search ?? "",
    in_stock: params.stock === undefined ? false : true,
    current_page: Number(params.page) || 1,
  };

  try {
    const { data, total } = getProducts({
      page: filterObj.current_page, limit: 12,
      brand: filterObj.brand, category: filterObj.category,
      gender: filterObj.gender, order: filterObj.order,
      search: filterObj.search, price: filterObj.price,
      inStock: filterObj.in_stock, dateGte: filterObj.date,
    });
    return { productsData: data, productsLength: total, page: filterObj.current_page };
  } catch (error) {
    console.log(error);
  }
  return { productsData: [], productsLength: 0, page: 1 };
};

const Shop = () => {
  const { productsData } = useLoaderData();

  return (
    <>
      <SectionTitle title="The Vault" path="Home | Shop" />
      
      {/* Massive Shop Header */}
      <div style={{ position: "relative", width: "100%", height: "40vh", minHeight: "300px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "40px" }}>
        <div style={{ position: "absolute", inset: 0, background: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed", opacity: 0.15, filter: "saturate(0) contrast(1.2)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #050508, transparent)" }} />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.3em", textTransform: "uppercase", color: "#e8c97a" }}>Curated Selection</span>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: "800", color: "#f1f0ee", margin: "10px 0" }}>ALL PRODUCTS</h1>
        </motion.div>
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div className="shop-layout">
          {/* Left Column: Filters Sidebar */}
          <aside className="shop-sidebar">
            <Filters />
          </aside>

          {/* Right Column: Products Grid */}
          <main className="shop-main">
            {productsData.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "120px 24px", background: "rgba(10,10,15,0.4)", borderRadius: "24px", border: "1px dashed rgba(255,255,255,0.1)" }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "20px", filter: "grayscale(1) opacity(0.5)" }}>📭</div>
                <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "2rem", fontWeight: "700", color: "#f1f0ee", marginBottom: "12px" }}>
                  The vault is empty.
                </h2>
                <p style={{ color: "rgba(241,240,238,0.5)", fontSize: "1.1rem" }}>No products match your current filters. Try adjusting them.</p>
              </motion.div>
            ) : (
              <motion.div layout className="products-grid">
                <AnimatePresence>
                  {productsData.map((product) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
                      key={product.id}
                      style={{ height: "100%" }}
                    >
                      <ProductElement
                        id={product.id}
                        title={product.name}
                        image={product.imageUrl}
                        rating={product.rating}
                        price={product.price.current.value}
                        brandName={product.brandName}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
            
            {productsData.length > 0 && <Pagination />}
          </main>
        </div>
      </div>
      
      <style>{`
        .shop-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 40px;
          align-items: flex-start;
        }
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        @media(max-width: 1024px) {
          .shop-layout { grid-template-columns: 260px 1fr; }
        }
        @media(max-width: 800px) {
          .shop-layout { grid-template-columns: 1fr; }
          .shop-sidebar { position: static; margin-bottom: 30px; }
        }
      `}</style>
    </>
  );
};

export default Shop;
