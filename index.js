const express = require("express");
const path = require("path")
const app = express();
const ejs = require("ejs");

require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')));




const products = [
        {
            id: '1',
            numColors: '2',
            badge: 'Top Rated',
            name: 'Pilke Student Desk',
            price: '299.99',
            imageSrc: '/images/furniture-1.jpg',
            desc: "The Pilke Student Desk combines functionality with sleek design, perfect for any study space. Crafted from durable wood, it features a spacious desktop for books and electronics, along with built-in drawers for organized storage. Its minimalist design and neutral finish fit seamlessly into modern interiors, making it an ideal choice for students of all ages."
        },
        {
            id: '2',
            numColors: '7',
            badge: 'Best Sale',
            name: 'Wally Student Desk',
            price: '99.99',
            imageSrc: '/images/furniture-2.jpg',
            desc: "The Wally Student Desk offers a contemporary take on study furniture with its clean lines and versatile design. Made from high-quality MDF with a smooth veneer, it includes a large work surface, a side shelf for books, and a hidden compartment for office supplies. Its sturdy frame and understated style make it a reliable and stylish addition to any study area."
        },
        {
            id: '3',
            numColors: '4',
            badge: 'Best Price',
            name: 'Low Oak Chair',
            price: '59.99',
            imageSrc: '/images/furniture-3.jpg',
            desc: "The Low Oak Chair brings a touch of elegance to any dining or living space. Constructed from solid oak, it features a low backrest for comfortable seating and a classic design that complements both modern and traditional decor. The natural wood grain adds warmth and character, making this chair a beautiful and practical choice for your home."
        },
        {
            id: '4',
            numColors: '3',
            badge: 'Best Price',
            name: 'Danish-style Student Desk',
            price: '159.99',
            imageSrc: '/images/furniture-4.jpg',
            desc: "Embrace timeless design with the Danish-style Student Desk. Inspired by classic Scandinavian aesthetics, this desk boasts clean lines, tapered legs, and a warm wood finish. Its compact size and practical drawers provide ample storage, making it perfect for smaller study spaces while adding a touch of elegance to your decor."
        },
        {
            id: '5',
            numColors: '2',
            badge: 'Top Rated',
            name: 'Friendly Off-white Couch',
            price: '1999.99',
            imageSrc: '/images/furniture-5.jpg',
            desc: "The Friendly Off-white Couch is designed for both comfort and style. With its plush cushions and soft, off-white upholstery, this couch invites relaxation and adds a bright, airy feel to any living room. Its classic design and durable fabric ensure it will be a cherished piece in your home for years to come."
        },
        {
            id: '6',
            numColors: '3',
            badge: 'Best Price',
            name: 'Dresser-style Cabinet',
            price: '559.99',
            imageSrc: '/images/furniture-6.jpg',
            desc: "The Dresser-style Cabinet offers a stylish solution for storage with its blend of classic and contemporary design. Featuring multiple drawers in varying sizes, it provides ample space for clothing, linens, or household items. Its elegant finish and sturdy construction make it a versatile addition to any room, combining functionality with timeless appeal."
        },
        {
            id: '7',
            numColors: '4',
            badge: 'Top Rated',
            name: 'Bamboo Side Cabinet',
            price: '159.99',
            imageSrc: '/images/furniture-7.jpg',
            desc: "The Bamboo Side Cabinet adds a touch of natural charm to your home with its eco-friendly bamboo construction. This sleek cabinet features a minimalist design with open and closed storage options, perfect for organizing everything from kitchen essentials to living room accessories. Its lightweight yet durable build makes it a practical and attractive choice."
        },
        {
            id: '8',
            numColors: '3',
            badge: 'Best Price',
            name: 'Suede Bed Frame',
            price: '2599.99',
            imageSrc: '/images/furniture-8.jpg',
            desc: "The Suede Bed Frame exudes luxury with its soft, suede-like upholstery and elegant design. Crafted with a sturdy wooden frame and padded headboard, it provides a comfortable and stylish foundation for your mattress. Available in a range of colors, it adds a touch of sophistication to any bedroom decor while ensuring a restful night's sleep."
        },
        {
            id: '9',
            numColors: '1',
            badge: 'Best Price',
            name: 'Rattan Kitchen Cabinets',
            price: '4999.99',
            imageSrc: '/images/furniture-9.jpg',
            desc: "The Rattan Kitchen Cabinets bring a touch of rustic charm to your kitchen. Made from high-quality rattan with a natural finish, these cabinets offer both style and durability. Their woven design adds texture and visual interest, while the practical storage space helps keep your kitchen organized and clutter-free. Ideal for adding a warm, inviting look to your cooking space."
        }

]
const links = [
    {
        name: 'About',
        source: ''
    },
    {
        name: 'Shop',
        source: ''
    },
    {
        name: 'Locations',
        source: ''
    },
    {
        name: 'Contact',
        source: ''
    }
]

const calculateOrderAmount = () => {

}

app.get("/", (req, res) => {
    res.render('home', {links: links, products: products})
});
app.get("/product/:id", (req, res) => {
    const product = products.find(product => product.id === req.params.id);
    res.render('product', {product: product});
});
app.get('/redirect', (req, res) => {
    res.render('checkout', {client_secret: req.query.client_secret})
});
//checkout
app.post('/checkout', async (req, res) => {
    
    const total = parseInt(req.body.price) * parseInt(req.body.quantity) ;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total * 100,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true
        }
    })
    res.render('checkout', {client_secret: paymentIntent.client_secret})
    //res.render('checkout', );

    

});

app.get('/confirmation', (req, res) => {
    res.render('checkoutConfirm');
})

app.listen(3000, () => {
    console.log("up on 3000")
});