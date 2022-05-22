const data = [
    {
        id: 1,
        name: "Producto1",
        img: "https://placeimg.com/640/480/animals",
        price: 100,
    },
    {
        id: 2,
        name: "Producto2",
        img: "https://placeimg.com/640/480/animals",
        price: 200,
    },
    {
        id: 3,
        name: "Producto3",
        img: "https://placeimg.com/640/480/animals",
        price: 300,
    },
    {
        id: 4,
        name: "Producto4",
        img: "https://placeimg.com/640/480/animals",
        price: 400,
    },
    {
        id: 5,
        name: "Producto5",
        img: "https://placeimg.com/640/480/animals",
        price: 500,
    },
];

function Product(id, name, img, price) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.quantity = 0;
    this.subtotal = 0;
    this.subTotal = () => this.subtotal = this.price * this.quantity;
    this.decreaseQuantity = () => this.quantity--;
    this.increaseQuantity = () => this.quantity++;
}

const $main = d.getElementById("main");
const $cart = d.createElement("section");
const $total = d.createElement("footer");
$total.classList.add("cart-total");
const listProducts = [];
let cart = [];

data.forEach(el => listProducts.push(new Product(el.id, el.name, el.img, el.price)));

//Render products
const renderProducts = () => {
    listProducts.forEach(el => {
        $main.innerHTML += `
        <article class="card-product">
            <figure class="card-figure">
                <img src="${el.img}" alt="${el.name}" />
            </figure>
            <div>
                <h4>${el.name}</h4>
                <h3>$${el.price}</h3>
                <button class="card-btn-buy" data-id="${el.id}">COMPRAR</button>
            </div>
        </article>`;
    });
}

//Add product selected to cart
const buyProduct = e => {
    if (e.target.matches(".card-btn-buy")) {
        const p = listProducts.find(el => el.id === Number(e.target.dataset.id));
        const c = cart.find(el => el.id === p.id);
        if (!c) {
            p.increaseQuantity();
            cart.push(p);
        }
        if (c) c.increaseQuantity();
        addToCart();
        saveToLocalStorage();
    }
}

//Render products in cart
const addToCart = () => {
    $cart.innerHTML = "";
    cart.forEach(el => {
        $cart.innerHTML += `
            <div class="card-cart">
                <img class="card-cart-img" src="${el.img}" alt="${el.name}"/>
                <h3>${el.name}</h3>
                <p>Cantidad: ${el.quantity}</p>
                <div class="card-cart-btns">
                    <button class="card-cart-btn-dec" data-id="${el.id}">-</button>
                    <p>${el.quantity}</p>
                    <button class="card-cart-btn-inc" data-id="${el.id}">+</button>
                </div>
                <i class="fa-solid fa-trash-can" data-id="${el.id}"></i>
                <p>$${el.subTotal()}</p>
            </div>
        `;
    })
    if (cart.length > 0) {
        $total.innerHTML = `
            <p>Total: $${total()}</p>
            <div>
                <button class="empty-cart">Vaciar Carrito</button>
                <button class="checkout-btn">Finalizar Compra</button>
            </div>
        `;
        $main.insertAdjacentElement("afterend", $cart);
        $cart.insertAdjacentElement("beforeend", $total);
        document.querySelector(".empty-cart").addEventListener("click", emptyCart);
        document.querySelector(".checkout-btn").addEventListener("click", checkout);
    }
}

//Decrease quantity
const decrementQuantity = e => {
    if (e.target.matches(".card-cart-btn-dec")) {
        const p = cart.find(el => el.id === Number(e.target.dataset.id));
        p.decreaseQuantity();
        if (p.quantity === 0) cart = cart.filter(el => el.id != p.id);
        addToCart();
        saveToLocalStorage();
    }
}

//Increase quantity
const incrementQuantity = e => {
    if (e.target.matches(".card-cart-btn-inc")) {
        const p = cart.find(el => el.id === Number(e.target.dataset.id));
        p.increaseQuantity();
        addToCart();
        saveToLocalStorage();
    }
}

//Delete product from cart
const deleteItem = e => {
    if (e.target.matches(".fa-trash-can")) {
        const p = cart.find(el => el.id === Number(e.target.dataset.id));
        cart = cart.filter(el => el.id != p.id);
        saveToLocalStorage();
        return addToCart();
    }
}

//Total cart
const total = () => {
    return cart.reduce((a, p) => a + p.subtotal, 0);
}

//Empty cart
const emptyCart = e => {
    cart = [];
    listProducts.forEach(el => el.quantity = 0);
    addToCart();
    localStorage.clear();
}

//Thanks and get back soon
const checkout = e => {
    if (e.target.matches(".checkout-btn")) {
        document.body.innerHTML += `
            <div class="checkout-container">
                <div class="checkout">
                    <h2>Gracias por su compra!!</h2>
                    <h3>Vuelva prontos</h3>
                    <img src="./apu.jpg" alt="vuelva pronto" />
                    <button class="back-to-home">VOLVER</button>
                </div>
            </div>
        `;
        document.querySelector(".back-to-home").addEventListener("click", () => {
            location.reload();
        });
    }
}

//Save to local storage
const saveToLocalStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//Load local storage
if (localStorage.getItem('cart')) {
    let cartCopy = JSON.parse(localStorage.getItem('cart'));
    cartCopy.forEach(e => {
        const p = new Product(e.id, e.name, e.img, e.price);
        p.quantity = e.quantity;
        cart.push(p)
    });
    addToCart();
}

document.addEventListener("DOMContentLoaded", renderProducts);
document.addEventListener("click", e => {
    buyProduct(e);
    decrementQuantity(e);
    incrementQuantity(e);
    deleteItem(e);
});