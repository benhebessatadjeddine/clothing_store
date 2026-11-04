const fs = require('fs');
const dbPath = './src/data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const euroPrices = [189, 145, 65, 220, 135, 95, 175, 110];

db.products.forEach((p, idx) => {
  const value = euroPrices[idx % euroPrices.length];
  p.price = {
    current: {
      value: value,
      text: `${value} €`
    }
  };
});

if (db.user && db.user.length > 0) {
  db.user[0].phone = "+39 344 486 1409";
  db.user[0].adress = "Via Montenapoleone 8, 20121 Milano (MI), Italia";
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('Prices updated to Italian Euros (€)');
