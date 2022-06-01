const data = [
    {
        id: 1,
        name: "Stanley 'Stan' Marsh",
        img: "./img/stan-marsh.png",
        price: 100,
    },
    {
        id: 2,
        name: "Kyle Broflovski",
        img: "./img/kyle-broflovski.png",
        price: 200,
    },
    {
        id: 3,
        name: "Eric Theodore Cartman",
        img: "./img/eric-cartman.png",
        price: 300,
    },
    {
        id: 4,
        name: "Kenneth 'Kenny' McCormick",
        img: "./img/kenny-mccormick.png",
        price: 400,
    },
    {
        id: 5,
        name: "Leopold 'Butters' Stotch",
        img: "./img/butters-stotch.png",
        price: 500,
    },
    {
        id: 6,
        name: "Tweek Tweak",
        img: "./img/tweek-tweak.png",
        price: 600,
    },
    {
        id: 7,
        name: "Bebe Stevens",
        img: "./img/bebe-stevens.png",
        price: 700,
    },
    {
        id: 8,
        name: "Jimmy Valmer",
        img: "./img/jimmy-valmer.png",
        price: 800,
    },
    {
        id: 9,
        name: "Jerome 'Chef' McElroy",
        img: "./img/chef.png",
        price: 900,
    },
    {
        id: 10,
        name: "Clyde Donovan",
        img: "./img/clyde-donovan.png",
        price: 1000,
    },
    {
        id: 11,
        name: "Craig Tucker",
        img: "./img/craig-tucker.png",
        price: 1100,
    },
    {
        id: 12,
        name: "Tolkien Black",
        img: "./img/token-black.png",
        price: 1200,
    },
    {
        id: 13,
        name: "Jason White",
        img: "./img/jason.png",
        price: 1300,
    },
    {
        id: 14,
        name: "Trent Boyett",
        img: "./img/trent-boyett.png",
        price: 1400,
    },
    {
        id: 15,
        name: "Wendy Testaburger",
        img: "./img/wendy-testaburger.png",
        price: 1500,
    },
    {
        id: 16,
        name: "Timmy Burch",
        img: "./img/timmy-burch.png",
        price: 1600,
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

const $main = document.getElementById("main");
const $iconCart = document.getElementById("icon-cart-container");
const $cart = document.getElementById("cart");
const $footer = document.getElementById("footer");
const $total = document.createElement("footer");
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
            <div class="card-details">
                <h4 class="card-name">${el.name}</h4>
                <h3 class="card-price">$${el.price}</h3>
                <button class="card-btn-buy" data-id="${el.id}">COMPRAR</button>
            </div>
        </article>`;
    });
}

//Add product selected to cart
const buyProduct = e => {
    if (e.target.matches(".card-btn-buy")) {
        const productFound = listProducts.find(el => el.id === Number(e.target.dataset.id));
        const productInCart = cart.find(el => el.id === productFound.id);
        if (!productInCart) {
            productFound.increaseQuantity();
            cart.push(productFound);
        }
        alertProductAdded();
        addToCart();
        saveToLocalStorage();
    }
}

//Product added
const alertProductAdded = () => {
    $iconCart.insertAdjacentHTML("afterbegin", '<p id="product-bought" class="product-added">producto agregado</p>');
    setTimeout(() => {
        $iconCart.removeChild(document.getElementById("product-bought"));
    }, 500);
}

//Check if the product is in cart
const inCart = () => {
    const $btnsBuy = document.querySelectorAll(".card-btn-buy");
    $btnsBuy.forEach(btn => {
        const btnFound = cart.find(el => el.id === Number(btn.dataset.id));
        if (btnFound) {
            btn.disabled = true;
            btn.classList.add("btn-disabled");
            btn.textContent = "AGREGADO";
        } else {
            btn.disabled = false;
            btn.classList.remove("btn-disabled");
            btn.textContent = "COMPRAR";
        }
    })
}

//Render products in cart
const addToCart = () => {
    toggleIconCart();
    $cart.innerHTML = "";
    cart.forEach(el => {
        $cart.innerHTML += `
            <div class="cart-card">
                <div class="cart-img">
                    <img class="cart-img" src="${el.img}" alt="${el.name}"/>
                    <h2 class="cart-name">${el.name}</h2>
                </div>
                <div class="cart-btns">
                    <p class="cart-subtotal"><subtotal>$${el.subTotal()}</subtotal></p>
                    <button class="cart-btn cart-btn-dec" data-id="${el.id}">-</button>
                    <p class="cart-quantity">${el.quantity}</p>
                    <button class="cart-btn cart-btn-inc" data-id="${el.id}">+</button>
                    <i class="fa-solid fa-trash-can" data-id="${el.id}"></i>
                </div>
            </div>
        `;
    })
    inCart();
    if (cart.length > 0) {
        $total.innerHTML = `
            <p>Total: <total>$${total()}</total></p>
            <div class="cart-btns-total">
                <button class="empty-cart">Vaciar Carrito</button>
                <button class="checkout-btn">Finalizar Compra</button>
            </div>
        `;
        $cart.insertAdjacentElement("beforeend", $total);
        document.querySelector(".empty-cart").addEventListener("click", emptyCart);
        document.querySelector(".checkout-btn").addEventListener("click", checkout);
    }
}

//Icon cart
const toggleIconCart = () => {
    if (cart.length === 0) {
        $iconCart.style.visibility = "hidden";
        $cart.classList.remove("cart-visible");
    }
    if (cart.length > 0) {
        $iconCart.style.visibility = "visible";
        $iconCart.lastElementChild.textContent = `${cart.length}`;
    }
}

//Display or hide cart
const displayCart = e => {
    if (e.target.matches(".icon-cart") || e.target.matches(".icon-cart-quantity")) {
        if (!$cart.classList.contains("cart-visible")) return $cart.classList.add("cart-visible");
        if ($cart.classList.contains("cart-visible")) return $cart.classList.remove("cart-visible");
    }
}

//Decrease quantity
const decrementQuantity = e => {
    if (e.target.matches(".cart-btn-dec")) {
        const productFound = cart.find(el => el.id === Number(e.target.dataset.id));
        productFound.decreaseQuantity();
        if (productFound.quantity === 0) cart = cart.filter(el => el.id != productFound.id);
        addToCart();
        saveToLocalStorage();
    }
}

//Increase quantity
const incrementQuantity = e => {
    if (e.target.matches(".cart-btn-inc")) {
        const productFound = cart.find(el => el.id === Number(e.target.dataset.id));
        productFound.increaseQuantity();
        addToCart();
        saveToLocalStorage();
    }
}

//Delete product from cart
const deleteItem = e => {
    if (e.target.matches(".fa-trash-can")) {
        Swal.fire({
            title: '¿Estás seguro que querés eliminar el producto del carrito?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí!',
            confirmButtonColor: '#000',
            confirmTextColor: '#ffcc00',
            cancelButtonColor: '#ffcc00',
            cancelButtonText: 'No!',
            iconColor: '#ffcc00'
        }).then((result) => {
            if (result.isConfirmed) {
                const productFound = cart.find(el => el.id === Number(e.target.dataset.id));
                cart = cart.filter(el => el.id != productFound.id);
                addToCart();
                saveToLocalStorage();
                Swal.fire({
                    title: 'Producto eliminado',
                    icon: 'success',
                    iconColor: '#ffcc00',
                    confirmButtonColor: '#000'
                })
            }
        })
    }
}

//Total cart
const total = () => {
    return cart.reduce((accumulator, product) => accumulator + product.subtotal, 0);
}

//Empty cart
const emptyCart = () => {
    cart = [];
    listProducts.forEach(el => el.quantity = 0);
    addToCart();
    $cart.classList.remove("cart-visible");
    localStorage.clear();
}

//Thanks and get back soon
const checkout = e => {
    if (e.target.matches(".checkout-btn")) {
        document.body.style.overflow = "hidden";
        document.body.innerHTML = `
            <div class="checkout-container">
                <div class="checkout">
                    <h2 class="checkout-thanks">Gracias por tu compra</h2>
                    <button class="back-to-home">VOLVER</button>
                </div>
            </div>
        `;
        mrHankey();
        document.querySelector(".back-to-home").addEventListener("click", () => {
            location.reload();
            localStorage.removeItem("cart");
        });
    }
}

//Mr. Hankey!!
const mrHankey = () => {
    setInterval(() => {
        for (let i = 0; i < 10; i++) {
            const $mrHankey = document.createElement("img");
            const randomLeft = Math.random().toFixed(2) * window.innerWidth;
            const randomDelay = Math.random().toFixed(2);
            $mrHankey.src = "./img/mr-hankey.png";
            $mrHankey.classList.add("mr-hankey");
            $mrHankey.style.left = `${randomLeft}px`;
            $mrHankey.style.animationDelay = `${randomDelay}s`;
            $mrHankey.addEventListener("animationend", () => $mrHankey.remove());
            document.body.appendChild($mrHankey);
        }
    }, 1000);
}

//Game Mr. Hankey
const killMrHankey = e => {
    if (e.target.matches(".mr-hankey")) {
        e.target.remove();
    }
}

//Save to local storage
const saveToLocalStorage = () => {
    if (cart.length === 0) return localStorage.clear();
    localStorage.setItem('cart', JSON.stringify(cart));
}

//Load local storage
const loadLocalStorage = () => {
    if (localStorage.getItem('cart')) {
        let cartLocalStorage = JSON.parse(localStorage.getItem('cart'));
        cartLocalStorage.forEach(el => {
            const product = new Product(el.id, el.name, el.img, el.price);
            product.quantity = el.quantity;
            cart.push(product);
        });
        addToCart();
    }
}

//Load products from local storage
loadLocalStorage();

//Render products and check if there are disabled buttons
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    inCart();
});

//Add events
document.addEventListener("click", e => {
    buyProduct(e);
    decrementQuantity(e);
    incrementQuantity(e);
    deleteItem(e);
    displayCart(e);
});

document.addEventListener("mouseover", e => {
    killMrHankey(e);
})