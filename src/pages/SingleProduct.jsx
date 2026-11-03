import React, { useState, useRef, useEffect } from "react";
import {
  QuantityInput,
  SectionTitle,
  SelectSize,
  SingleProductRating,
  SingleProductReviews,
} from "../components";
import { FaHeart, FaCartShopping } from "react-icons/fa6";
import { Link, useLoaderData } from "react-router-dom";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  updateWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import { store } from "../store";
import { getProductById, getUserById, updateUser } from "../data/localDb";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const singleProductLoader = async ({ params }) => {
  const { id } = params;
  const productData = getProductById(id);
  return { productData };
};

// ---------------------------------------------
// Limit Break: Magnetic Button Component
// ---------------------------------------------
const MagneticButton = ({ children, onClick, className, style, primary }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Calculate distance and pull factor
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    // Pull slightly towards mouse
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        x: springX,
        y: springY,
        position: "relative",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "16px 32px",
        borderRadius: "16px",
        fontSize: "1rem",
        fontWeight: "700",
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        border: "none",
        cursor: "pointer",
        color: primary ? "#0a0a0f" : "rgba(241,240,238,0.8)",
        background: primary ? "linear-gradient(135deg,#c9a84c,#e8c97a)" : "rgba(255,255,255,0.05)",
        boxShadow: primary ? "0 10px 30px rgba(201,168,76,0.4)" : "inset 0 0 0 1px rgba(255,255,255,0.1)",
        transition: "box-shadow 0.3s",
      }}
      whileHover={{ scale: 1.05, boxShadow: primary ? "0 15px 40px rgba(201,168,76,0.6)" : "inset 0 0 0 1px rgba(201,168,76,0.5), 0 10px 20px rgba(0,0,0,0.5)" }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

// ---------------------------------------------
// Limit Break: X-Ray Image Magnifier
// ---------------------------------------------
const ImageMagnifier = ({ src, alt }) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const zoomLevel = 2.5;
  const magnifierSize = 250; // diameter of the magnifying glass

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "24px",
        overflow: "hidden",
        cursor: "none", // Hide standard cursor
        background: "#0a0a0f",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
      onMouseEnter={(e) => {
        const elem = e.currentTarget;
        const { width, height } = elem.getBoundingClientRect();
        setSize([width, height]);
        setShowMagnifier(true);
      }}
      onMouseMove={(e) => {
        const elem = e.currentTarget;
        const { top, left } = elem.getBoundingClientRect();
        const x = e.pageX - left - window.scrollX;
        const y = e.pageY - top - window.scrollY;
        setXY([x, y]);
      }}
      onMouseLeave={() => {
        setShowMagnifier(false);
      }}
    >
      <img
        src={src}
        style={{ width: "100%", height: "auto", display: "block", objectFit: "cover", transition: "filter 0.3s", filter: showMagnifier ? "brightness(0.5) contrast(1.2)" : "brightness(1) contrast(1)" }}
        alt={alt}
      />

      {/* The Magnifying Glass Overlay */}
      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",
          pointerEvents: "none",
          height: `${magnifierSize}px`,
          width: `${magnifierSize}px`,
          top: `${y - magnifierSize / 2}px`,
          left: `${x - magnifierSize / 2}px`,
          opacity: "1",
          border: "2px solid rgba(201,168,76,0.8)",
          borderRadius: "50%",
          boxShadow: "0 20px 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.5)",
          backgroundColor: "#fff",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
          backgroundPositionX: `${-x * zoomLevel + magnifierSize / 2}px`,
          backgroundPositionY: `${-y * zoomLevel + magnifierSize / 2}px`,
          zIndex: 10,
        }}
      />
    </div>
  );
};

const SingleProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(0);
  const { wishItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [rating, setRating] = useState(["empty star","empty star","empty star","empty star","empty star"]);

  const { productData } = useLoaderData();

  const product = {
    id: productData?.id + size,
    title: productData?.name,
    image: productData?.imageUrl,
    rating: productData?.rating,
    price: productData?.price?.current?.value,
    brandName: productData?.brandName,
    amount: quantity,
    selectedSize: size || productData?.availableSizes[0],
    isInWishList: wishItems.find((item) => item.id === productData?.id + size) !== undefined,
  };

  for (let i = 0; i < productData?.rating; i++) {
    rating[i] = "full star";
  }

  const handleWishlist = (isAdd) => {
    if (!loginState) {
      toast.error(`You must be logged in to ${isAdd ? 'add' : 'remove'} products`);
      return;
    }
    try {
      const id = localStorage.getItem("id");
      const userObj = getUserById(id);
      if (!userObj) return;
      userObj.userWishlist = userObj.userWishlist || [];
      if(isAdd) {
        userObj.userWishlist.push(product);
        updateUser(id, { userWishlist: userObj.userWishlist });
        store.dispatch(updateWishlist({ userObj }));
        toast.success("Product added to the wishlist!");
      } else {
        userObj.userWishlist = userObj.userWishlist.filter((item) => product.id !== item.id);
        updateUser(id, { userWishlist: userObj.userWishlist });
        store.dispatch(removeFromWishlist({ userObj }));
        toast.success("Product removed from the wishlist!");
      }
    } catch (error) { console.error(error); }
  };

  return (
    <>
      <SectionTitle title="Product details" path="Home | Shop | Details" />
      
      <div style={{ maxWidth: "1400px", margin: "40px auto", padding: "0 24px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px",
          alignItems: "start",
        }} className="single-product-grid">
          
          {/* Left Column: Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} style={{ position: "sticky", top: "100px" }}>
            <ImageMagnifier 
              src={productData?.additionalImageUrls[currentImage]?.startsWith('/imgs/') ? productData.additionalImageUrls[currentImage] : `https://${productData?.additionalImageUrls[currentImage]}`} 
              alt={productData.name} 
            />
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginTop: "16px" }}>
              {productData?.additionalImageUrls.map((imageObj, index) => (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={nanoid()}
                  src={imageObj?.startsWith('/imgs/') ? imageObj : `https://${imageObj}`}
                  onClick={() => setCurrentImage(index)}
                  alt={productData.name}
                  style={{
                    width: "100%", aspectRatio: "1/1", objectFit: "cover",
                    borderRadius: "12px", cursor: "pointer",
                    border: currentImage === index ? "2px solid #e8c97a" : "1px solid rgba(255,255,255,0.05)",
                    opacity: currentImage === index ? 1 : 0.6,
                    transition: "all 0.2s"
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Column: Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            
            <div>
              <span style={{ fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.8)", display: "block", marginBottom: "8px" }}>
                {productData?.brandName}
              </span>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: "800", color: "#f1f0ee", lineHeight: "1.1" }}>
                {productData?.name}
              </h1>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <span style={{
                fontSize: "2.5rem", fontWeight: "800", fontFamily: "'Space Grotesk',sans-serif",
                background: "linear-gradient(135deg,#c9a84c,#e8c97a)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
              }}>
                {productData?.price?.current?.value} €
              </span>
              <SingleProductRating rating={rating} productData={productData} />
            </div>

            <div style={{ fontSize: "1.1rem", color: "rgba(241,240,238,0.6)", lineHeight: "1.7" }}>
              {parse(productData?.description || "")}
            </div>

            <div style={{ background: "rgba(10,10,15,0.6)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
              <SelectSize sizeList={productData?.availableSizes} size={size} setSize={setSize} />
              
              <div>
                <span style={{ display: "block", fontSize: "0.8rem", fontWeight: "700", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(241,240,238,0.5)", marginBottom: "12px" }}>Quantity</span>
                <QuantityInput quantity={quantity} setQuantity={setQuantity} />
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "12px" }}>
              <MagneticButton primary onClick={() => {
                if (loginState) dispatch(addToCart(product));
                else toast.error("You must be logged in to add products");
              }} style={{ flex: "1 1 200px" }}>
                <FaCartShopping /> Add to Cart
              </MagneticButton>

              <MagneticButton onClick={() => handleWishlist(!product?.isInWishList)} style={{ flex: "1 1 200px" }}>
                <FaHeart color={product?.isInWishList ? "#e8c97a" : "inherit"} /> 
                {product?.isInWishList ? "Remove from Wishlist" : "Add to Wishlist"}
              </MagneticButton>
            </div>

            {/* Spec tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "20px" }}>
              {[
                { l: "SKU", v: productData?.productCode },
                { l: "Gender", v: productData?.gender },
                { l: "Category", v: productData?.category },
                { l: "Stock", v: productData?.isInStock ? "Available" : "Sold Out" }
              ].map(tag => (
                <div key={tag.l} style={{ padding: "8px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", fontSize: "0.85rem", color: "rgba(241,240,238,0.7)" }}>
                  <strong style={{ color: "#e8c97a" }}>{tag.l}:</strong> {tag.v}
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>

      <SingleProductReviews rating={rating} productData={productData} />

      <style>{`
        @media(max-width: 900px) {
          .single-product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
};

export default SingleProduct;
