// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');
// const bonjour = require('bonjour')();
// const Product = require('./models/product');

// const app = express();
// const port = 5001;
// const host = '0.0.0.0';

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, '../client')));

// // MongoDB bağlantısı
// mongoose.connect('mongodb://localhost:27017/qroje', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
// db.once('open', () => {
//     console.log('MongoDB bağlantısı başarıyla kuruldu');
// });

// // Routes
// const productsRouter = express.Router();

// // Veritabanında tüm ürünleri bul
// productsRouter.get('/', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.json(products);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Belirli bir barkod veya QR koduna göre ürünü bul
// productsRouter.get('/:code', async (req, res, next) => {
//     let product;
//     try {
//         product = await Product.findOne({ code: req.params.code });
//         if (product == null) {
//             return res.status(404).json({ message: 'Ürün bulunamadı' });
//         }
//     } catch (err) {
//         return res.status(500).json({ message: err.message });
//     }

//     res.json(product);
// });

// app.use('/api/products', productsRouter);

// app.listen(port, host, () => {
//     console.log(`Sunucu http://${host}:${port} adresinde çalışıyor`);

//     // Bonjour ile hizmeti yayınla
// bonjour.publish({ name: 'targetSSID', type: 'http', port: port });
// });

// const express = require('express');
// const path = require('path');
// const app = express();
// const PORT = 3000;

// function startServer() {
//     app.use(express.static(path.join(__dirname, 'client')));
    
//     app.get('/', (req, res) => {
//         res.sendFile(path.join(__dirname, 'client', 'index.html'));
//     });

//     app.listen(PORT, () => {
//         console.log(`Server is running on http://localhost:${PORT}`);
//     });
// }

// module.exports = { startServer };


import express from 'express';
import { connect, Schema, model } from 'mongoose';
import cors from 'cors';

// Express uygulaması oluşturun
const app = express();

// CORS'u etkinleştirin
app.use(cors());

// MongoDB'ye bağlanın
connect('mongodb://localhost:27017/qr_code_db')
  .then(() => {
    console.log('MongoDB\'ye başarıyla bağlanıldı');

    // Ürün şemasını ve modelini tanımlayın
    const productSchema = new Schema({
      code: String,
      name: String,
      price: String,
      stock: String
    });

    const Product = model('Product', productSchema, 'Products');

    // API endpoint: QR koduna göre ürün bilgilerini döner
    app.get('/api/products/:code', async (req, res) => {
      try {
        const product = await Product.findOne({ code: req.params.code });
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ message: 'Ürün bulunamadı.' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Bir hata oluştu.' });
      }
    });

    // Sunucuyu başlatın
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda çalışıyor`);
    });
  })
  .catch((error) => {
    console.error('MongoDB bağlantısı sırasında hata oluştu:', error);
  });
