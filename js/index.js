function Product(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.quantity = 0;
    this.subTotal = 0;
    this.increaseSubTotal = quantity => this.subTotal = this.price * quantity;
    Product.total = 0;
}

let productList = "",
    listProducts = [],
    cart = [],
    categories = ["Cat1", "Cat2", "Cat3"],
    data = [
    {
        id: 1,
        name: "Producto1",
        price: 100,
        category: "cat1"
    },
    {
        id: 2,
        name: "Producto2",
        price: 200,
        category: "cat1"
    },
    {
        id: 3,
        name: "Producto3",
        price: 300,
        category: "cat2"
    },
    {
        id: 4,
        name: "Producto4",
        price: 400,
        category: "cat2"
    },
    {
        id: 5,
        name: "Producto5",
        price: 500,
        category: "cat3"
    },
];

data.forEach(el => {
    const product = new Product(el.id, el.name, el.price, el.category);
    listProducts.push(product);
});

function app() {
    renderProducts(listProducts);
}

function renderProducts(list) {
    productList = "";
    productList += "Productos disponibles:\n\n";
    for (const product of list) {
        productList += `${product.id}) ${product.name} - $${product.price} - Categoria: ${product.category}\n`;
    }
    productList += "\nFF) Filtrar por categoría \n F) Finalizar compra \n S) Salir";
    let select = prompt(productList);
    selectProduct(select, list);
}

function selectProduct(select, list) {
    if(Number(select) <= 0 || Number(select) > list.length) {
        alert("Ingresa el número del producto a comprar");
        return app();
    }
    const result = cart.find(el => el === Number(select));
    if(result) {
        alert("El producto seleccionado ya se encuentra en el carrito");
        return app();
    }
    if(select.toLowerCase() === "s") {
        alert("Volvé pronto!");
        return;
    }
    if(select.toLowerCase() === "f") {
        if(cart.length === 0) {
            alert("Tu carrito está vacío, selecciona productos de la lista");
            return app();
        }
        return total();
    };
    if(select.toLowerCase() === "ff") return filters();
    if(isNaN(select)) return app();
    addToCart(select);
}

function addToCart(select) {
    select = parseInt(select);
    const product = listProducts.find(el => el.id === select);
    cart.push(product.id);
    let quantity = parseInt(prompt(`Cuántos ${product.name} vas a llevar?`));
    product.quantity = quantity;
    product.increaseSubTotal(quantity);
    Product.total += product.price * quantity;
    app();
}

function filters() {
    let filter = prompt(`Selecciona la categoria que querés ver\n${categories.join("\n")}`);
    const filterCat = categories.find(el => el.toLowerCase() === filter.toLowerCase());
    if(!filterCat) {
        alert("Ingresa una categoría de la lista");
        return filters();
    }
    const listFiltered = listProducts.filter(el => el.category === filter.toLowerCase());
    renderProducts(listFiltered);
}

function total() {
    const date = new Date();
    let ticket = `${date.toLocaleString()}\n\nProductos comprados:\n`;
    cart.forEach(el => {
        const product = listProducts.find(p => el === p.id);
        ticket += `${product.name} -- x${product.quantity} -- $${product.subTotal}\n`;
    })
    ticket += `\tTotal a pagar: $${Product.total}`;
    alert(`${ticket}\n\nGracias por tu compra!`);
}

app();