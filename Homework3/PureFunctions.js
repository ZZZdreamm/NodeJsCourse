class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

function calculateDiscountedPrice(productsArray, discount){
    return productsArray.map((product, index) => {
        return {
            name: product.name,
            price: product.price - (product.price * discount)
        }
    });
}

function calculateTotalPrice(productsArray){
    return productsArray.reduce((total, product) => total + product.price, 0);
}


module.exports = {
    Product,
    calculateDiscountedPrice,
    calculateTotalPrice
};
