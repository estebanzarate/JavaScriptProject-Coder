function Product(id, name, img, description, price, category, stock) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
    this.price = price;
    this.category = category;
    this.stock = stock;
    this.updateStock = () => this.stock = this.stock - this.quantity;
    this.quantity = 0;
    this.decreaseQuantity = () => this.quantity--;
    this.increaseQuantity = () => this.quantity++;
    this.subTotal = 0;
    this.increaseSubTotal = quantity => this.subTotal = this.price * quantity;
    Product.total = 0;
}

let productList = "",
    main = document.getElementById("main"),
    d = document,
    iconCart = d.querySelector("#icon-cart"),
    q = d.querySelector(".add-q"),
    listProducts = [],
    cart = [],
    categories = ["Cat1", "Cat2", "Cat3"],
    data = [
        {
            id: 1,
            name: "Producto1",
            img: "https://placeimg.com/640/480/any",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi assumenda reiciendis sequi eos quae velit voluptates! Sint obcaecati doloremque laboriosam.",
            price: 100,
            category: "cat1",
            stock: 5
        },
        {
            id: 2,
            name: "Producto2",
            img: "https://placeimg.com/640/480/any",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi assumenda reiciendis sequi eos quae velit voluptates! Sint obcaecati doloremque laboriosam.",
            price: 200,
            category: "cat1",
            stock: 5
        },
        {
            id: 3,
            name: "Producto3",
            img: "https://placeimg.com/640/480/any",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi assumenda reiciendis sequi eos quae velit voluptates! Sint obcaecati doloremque laboriosam.",
            price: 300,
            category: "cat2",
            stock: 5
        },
        {
            id: 4,
            name: "Producto4",
            img: "https://placeimg.com/640/480/any",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi assumenda reiciendis sequi eos quae velit voluptates! Sint obcaecati doloremque laboriosam.",
            price: 400,
            category: "cat2",
            stock: 5
        },
        {
            id: 5,
            name: "Producto5",
            img: "https://placeimg.com/640/480/any",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi assumenda reiciendis sequi eos quae velit voluptates! Sint obcaecati doloremque laboriosam.",
            price: 500,
            category: "cat3",
            stock: 5
        },
    ];

const renderProducts = () => {
    data.forEach(el => {
        const product = new Product(el.id, el.name, el.img, el.description, el.price, el.category, el.stock);
        listProducts.push(product);
        main.innerHTML += `
        <div class="card">
            <figure class="card-figure">
                <img src="${product.img}" alt="${product.name}" />
            </figure>
            <div class="div-detail">
                <h4 class="product-name">${product.name}</h4>
                <h3>$${product.price}</h3>
                <div class="div-btn-buy">
                    <input type="button" id="${product.id}" class="btn-buy" value="COMPRAR"></input>
                </div>
            </div>
        </div>
        `;
    });
}

const modalBuy = e => {
    if (e.target.classList.contains("btn-buy")) {
        const modalBuy = d.createElement("div");
        modalBuy.classList.add("modal-buy");
        const select = listProducts.find(p => p.id === Number(e.target.id));
        d.body.innerHTML += `
            <div class="modal-buy-container">
                <div class="modal-buy">
                    <figure class="modal-figure">
                        <img src="${select.img}" alt="${select.name}" />
                    </figure>
                    <div class="div-detail">
                        <h2 class="product-name">${select.name}</h2>
                        <p>${select.description}</p>
                        <h3>$${select.price}</h3>
                        <div class="div-btn-buy">
                            <div class="div-btn-add">
                                <button class="btn-add btn-dec ${select.name}">-</button>
                                <p class="add-q">0</p>
                                <button class="btn-add btn-inc ${select.name}">+</button>
                            </div>
                            <button class="btn-modal-buy ${select.name}">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // btnDisabled(select);
    }
    if (e.target.classList.contains("modal-buy-container")) {
        const modalBuy = d.querySelector(".modal-buy-container");
        modalBuy.parentNode.removeChild(modalBuy);
    }
    if (!e.target.classList.contains("btn-buy")) return;
}
d.addEventListener("click", e => modalBuy(e));

const quantity = e => {
    if (e.target.classList.contains("btn-dec")) {

    };
    if (e.target.classList.contains("btn-inc")) {

    };
}
d.addEventListener("click", e => quantity(e));

const addToCart = e => {
    if (e.target.classList.contains("btn-modal-buy")) {

    }
}
d.addEventListener("click", e => addToCart(e))

// const btnDisabled = p => {
//     const q = d.querySelector(".add-q").textContent,
//         btnDec = d.querySelector(".btn-dec"),
//         btnInc = d.querySelector(".btn-inc"),
//         btnAddTC = d.querySelector(".btn-modal-buy");
//     if (Number(q) === 0) {
//         btnDec.disabled = true;
//         btnAddTC.disabled = true;
//     } else {
//         btnDec.disabled = false;
//         btnAddTC.disabled = false;
//     }
//     Number(q) === p.stock ? btnInc.disabled = true : btnInc.disabled = false;
// }

const showCart = e => {
    if (e.target.classList.contains("icon-cart")) {
        d.body.innerHTML += `
            <section class="cart-container">
                <aside id="cart" class="cart"></aside>
            </section>`;
        d.querySelector("#cart").style.right = "0";
    }
    if (e.target.classList.contains("cart-container")) {
        const $cartContainer = d.querySelector(".cart-container");
        $cartContainer.parentNode.removeChild($cartContainer);
    }
};
d.addEventListener("click", e => showCart(e));

const addBtn = d.querySelector(".add-q");

renderProducts();