const data = [
    {
        id: 1,
        name: "Producto1",
        img: "https://placeimg.com/640/480/any",
        price: 100,
    },
    {
        id: 2,
        name: "Producto2",
        img: "https://placeimg.com/640/480/any",
        price: 200,
    },
    {
        id: 3,
        name: "Producto3",
        img: "https://placeimg.com/640/480/any",
        price: 300,
    },
    {
        id: 4,
        name: "Producto4",
        img: "https://placeimg.com/640/480/any",
        price: 400,
    },
    {
        id: 5,
        name: "Producto5",
        img: "https://placeimg.com/640/480/any",
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

const d = document;
const $main = d.getElementById("main");
const $cart = d.createElement("section");
const $total = d.createElement("p");
$total.classList.add("cart-total");
const listProducts = [];
const cart = [];

data.forEach(el => listProducts.push(new Product(el.id, el.name, el.img, el.price)));

const renderProducts = () => {
    listProducts.forEach(el => {
        $main.innerHTML += `
        <div class="card-product">
            <figure class="card-figure">
                <img src="${el.img}" alt="${el.name}" />
            </figure>
            <div>
                <h4>${el.name}</h4>
                <h3>$${el.price}</h3>
                <button class="card-btn-buy" data-id="${el.id}">COMPRAR</button>
            </div>
        </div>`;
    });
}

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
    }
}

const addToCart = () => {
    if (cart.length > 0) {
        $main.insertAdjacentElement("afterend", $cart);
        $cart.insertAdjacentElement("beforeend", $total);
    }
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
                <p>$${el.subTotal()}</p>
            </div>
        `;
    })
    $total.innerHTML = `Total: $${total()}`;
    $cart.insertAdjacentElement("beforeend", $total);
}

const decrementQuantity = e => {
    if (e.target.matches(".card-cart-btn-dec")) {
        const p = cart.find(el => el.id === Number(e.target.dataset.id));
        p.decreaseQuantity();
        addToCart();
    }
}

const incrementQuantity = e => {
    if (e.target.matches(".card-cart-btn-inc")) {
        const p = cart.find(el => el.id === Number(e.target.dataset.id));
        p.increaseQuantity();
        addToCart();
    }
}

const total = () => {
    return cart.reduce((a, p) => a + p.subtotal, 0);
}

d.addEventListener("click", buyProduct);
d.addEventListener("click", decrementQuantity);
d.addEventListener("click", incrementQuantity);

renderProducts();