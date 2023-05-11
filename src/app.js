import express, { urlencoded } from 'express';
import ProductManager from './Manager.js';

const app = express();

const manager = new ProductManager();

app.use(urlencoded({extended: true}));

app.use(express.json());

app.get('/', (req, res) => { res.send('Bienvenido a la API de productos') });

app.get('/products', async (req, res) => {
    const products = await manager.getProducts();
    const {limit} = req.query;
    if (limit) {
        res.json(products.slice(0, limit));
    } else {
    res.json(products);
    }
    });

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await manager.getProductById(id);
    if (product === "Not found") {
        res.status(404).json({error: "Producto no encontrado"});
    } else {
        res.json(product);
    }
    });

app.get

app.listen(8080, () => {
    console.log('API Started!');
    });

