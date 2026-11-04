const fs = require('fs');

const dbPath = './src/data/db.json';
const imgsDir = './public/imgs';

// Get list of new images
const imgFiles = fs.readdirSync(imgsDir).filter(file => file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png'));

if (imgFiles.length === 0) {
    console.error('No images found in public/imgs');
    process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// 1. Slice to exactly 8 products or as many as we have images
const numProducts = Math.min(8, imgFiles.length);
db.products = db.products.slice(0, numProducts);

const brands = ["Lumina", "Vogue", "Aura", "Nova", "Thread", "Silk", "Velvet", "Glow"];
const names = ["Classic Jacket", "Urban Sneakers", "Modern T-shirt", "Elegant Dress", "Streetwear Hoodie", "Casual Jeans", "Formal Shirt", "Running Shoes"];

db.products.forEach((product, idx) => {
    product.name = names[idx];
    product.brandName = brands[idx];
    product.description = "Premium quality item exclusively available at Lumina Threads.";
    
    // Assign distinct image
    product.imageUrl = `/imgs/${imgFiles[idx]}`;

    // Pick random additional images from the pool
    const additional = [];
    for(let i=0; i<4; i++) {
        additional.push(`/imgs/${imgFiles[Math.floor(Math.random() * imgFiles.length)]}`);
    }
    product.additionalImageUrls = additional;
});

// 2. Update Dummy user
if (db.user && db.user.length > 0) {
    db.user[0].email = "marco.rossi@luminamilano.it";
    db.user[0].name = "Marco";
    db.user[0].lastname = "Rossi";
    db.user[0].phone = "+39 344 486 1409";
    db.user[0].adress = "Via Montenapoleone 8, 20121 Milano (MI), Italia";
    db.user[0].password = "password123";
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('Successfully updated db.json with 8 new products and fresh user data.');
