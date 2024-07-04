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
