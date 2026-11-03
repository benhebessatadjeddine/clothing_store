const fs = require('fs');
const dbPath = './src/data/db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.products.forEach(p => {
  const value = 6000 + Math.floor(Math.random() * 61) * 100;
  p.price = {
    current: {
      value: value,
      text: `${value} DA`
    }
  };
});

if (db.user && db.user.length > 0) {
  db.user[0].phone = "+213 555 00 00 00";
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('Prices updated');
