class MenuItem {
    constructor(image, name, description, price, itemNum, category) {
        this.image = image;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = 0;
        this.itemNum = itemNum;
        this.category = category;
    }
}

class Menu {
    constructor(){
        this.items = [];
        this.itemNum = 0;
        this.checkout = new Checkout();
        this.categories = ["foods", "drinks", "sides"];
    }
    newItem(image, name, description, price, category){
        this.itemNum++;
        let x = new MenuItem(image, name, description, price, this.itemNum, category);
        this.items.push(x);
        this.checkout.items.push(x);
        return x;
    }
    get numberOfItems(){
        return this.items.length;
    }
    get contents() {
        return this.print();
    }
    print() {
        for(var x = 0; x < this.categories.length; x++){
            document.getElementById("item-section").innerHTML += '<div style="text-transform: capitalize;" class="main">'
            + this.categories[x] + '</div>'
            + '<div id="' + this.categories[x] + '"></div>';
        }
        for(var i = 0; i < this.items.length; i++){
            console.log(i);
            for( var j = 0; j < this.categories.length; j++){
                if(this.items[i].category === this.categories[j]){
                    document.getElementById(this.categories[j]).innerHTML +='<div class="item"> <div class="item-image">'
                    + this.items[i].image + '</div><div class="item-info"><div class="item-name">'
                    + this.items[i].name + '</div><div class="item-description">'
                    + this.items[i].description + '</div><div class="item-price">$'
                    + this.items[i].price.toFixed(2)+'</div><div class="add-order" onclick="menu.checkout.addToBag('+ i +');">ADD TO ORDER</div></div></div>';
                }
            }
        }
    }
}
class Checkout {
    constructor() {
        this.total = 0;
        this.subtotal = 0;
        this.tax = 0;
        this.items = [];
        this.itemsInBag = [];
        this.differentItems = -1;
    }
    addToBag(x) {
        
        for(var i = 0; i < this.itemsInBag.length; i++){
            if(this.itemsInBag[i] === this.items[x]){
                this.itemsInBag[i].quantity++;
                this.displayBagAmount();
                return;
            }
        }
        this.differentItems++;
        this.itemsInBag.push(this.items[x]);
        console.log(this.itemsInBag[0]);
        this.itemsInBag[this.differentItems].quantity = 1;
        this.displayBagAmount();
    }
    calcSubtotal(){
        for(var i = 0; i < this.itemsInBag.length; i++){
            this.subtotal += this.itemsInBag[i].price * this.itemsInBag[i].quantity;
        }
    }
    calcTotal() {
        this.total = this.subtotal + this.tax;
    }
    calcTax() {
        this.tax = this.subtotal * 0.06;
    }
    displayBagAmount() {
        var itemTotal = 0;
        for(var i = 0; i < this.itemsInBag.length; i++){
            itemTotal += this.itemsInBag[i].quantity;
        }
        document.getElementById('item-count').innerHTML = itemTotal;
    }
    displayItemsInBag() {
        document.getElementById('all-orders').innerHTML ="";
        for(var i = 0; i < this.itemsInBag.length; i++){
            document.getElementById('all-orders').innerHTML += '<div class="orders-item">'
            + '<div class="orders-item-name">' + this.itemsInBag[i].name + '</div>'
            + '<div class="item-quantity">' + this.itemsInBag[i].quantity + '</div>'
            + '<div class="orders-item-price">$' + this.itemsInBag[i].price.toFixed(2) + '|x </div></div>'
        }
    }
    displayTotals(){
        this.subtotal = 0;
        this.tax = 0;
        this.total = 0;
        this.calcSubtotal();
        this.calcTax();
        this.calcTotal();
        document.getElementById('subtotal-amount').innerText = this.subtotal.toFixed(2);
        document.getElementById('tax-amount').innerText = this.tax.toFixed(2);
        document.getElementById('total-amount').innerText = this.total.toFixed(2);
    }
}

function openOrders() {
    menu.checkout.displayItemsInBag();
    menu.checkout.displayTotals();
    if(document.getElementById('orders').style.display === "none"){
        document.getElementById('orders').style.display="block";
        document.getElementById('receipt').style.color = "blue";
    }
    else{
        document.getElementById('orders').style.display = "none";
        document.getElementById('receipt').style.color = "black";
    }
}

let menu = new Menu;
var image = '<img src="images/item1.jpg"/>';
var name1 = "VEGAN TACO";
var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
var price = 7.50;
menu.newItem(image, name1, description, 8.50, "foods");
menu.newItem(image, "meal1", description, price, "foods");
menu.newItem(image, "meal2", description, 10.00, "foods");
menu.newItem(image, "meal3", description, price, "sides");
menu.newItem(image, "meal4", description, 3.00, "drinks");
menu.contents;
menu.checkout.displayBagAmount();

