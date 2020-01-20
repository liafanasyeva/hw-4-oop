var bill = [];
var caloriesCount = [];
var menuItems = [];
var isPaid = false;

function FoodCreator(name, price, cal) {
    this.name = name;
    this.price = price;
    this.calories = cal;
}

//Main class for creating menuItems

FoodCreator.prototype.askAboutFood = function() {
    console.log('I\'m hungry! Do you have ' + this.name + '?');
}

var food = new FoodCreator('anything spicy');
food.askAboutFood();

//Burgers

var burgerSmall = {
    name: 'Small Burger',
    price: 50,
    cal: 20
} 

var burgerBig = {
    name: 'Big Burger',
    price: 100,
    cal: 40
} 

var burgerCheese = {
    name: 'Cheese stuff',
    price: 10,
    cal: 20
}

var burgerSalad = {
    name: 'salad',
    price: 20,
    cal: 5
}

var burgerPotato = {
    name: 'potato',
    price: 15,
    cal: 10
}

//Child class for creating burgers

function BurgerCreator(size, stuff){
    this.stuffName = stuff.name;
    FoodCreator.call(this, size.name, size.price + stuff.price, size.cal + stuff.cal)
};

BurgerCreator.prototype = Object.create(FoodCreator.prototype);

//Function to know a price of menuItem
BurgerCreator.prototype.countPrice = function() {
    bill.unshift(this.price);
    return bill[0];
}

//Function to know calories of menuItem
BurgerCreator.prototype.countCalories = function() {
    caloriesCount.unshift(this.calories);
    return caloriesCount[0];
}

//Salads

var caesar =  {
    name: 'Caesar',
    price: 100,
    cal: 20
}

var russianSalad = {
    name: 'Russian Salad',
    price: 50,
    cal: 80
}

function SaladCreator(salad, weight) {
		this.weightMenuItem = weight;
    FoodCreator.call(this, salad.name , salad.price, salad.cal)
}

SaladCreator.prototype = Object.create(FoodCreator.prototype);

//Function to know a price of menuItem
SaladCreator.prototype.countPrice = function() {
		this.price = this.price * this.weightMenuItem/100;
    bill.unshift((this.price));
    return bill[0];
}

//Function to know calories of menuItem
SaladCreator.prototype.countCalories = function() {
		this.calories = this.calories * this.weightMenuItem/100;
    caloriesCount.unshift(this.calories);
    return caloriesCount[0];
}

//2
var salad1 = new SaladCreator(caesar, 300);
console.log(salad1.name + ':\n '+ salad1.countPrice() + ' tugrics, ' + salad1.countCalories(50) + ' cal'); 
//console.log(salad1)
//Drinks

var cola = {
    name: 'Coca-Cola',
    price: 50,
    cal: 30
}

var coffee = {
    name: 'Coffee',
    price: 80,
    cal: 20
}

function DrinkCreator(drink) {
    FoodCreator.call(this, drink.name, drink.price, drink.cal);
}

DrinkCreator.prototype = Object.create(FoodCreator.prototype);

//Function to know a price of menuItem
DrinkCreator.prototype.countPrice = function() {
    bill.unshift(this.price);
    return bill[0];
}

//Function to know calories of menuItem
DrinkCreator.prototype.countCalories = function() {
    caloriesCount.unshift(this.calories);
    return caloriesCount[0];
}

//1
var burger1 = new BurgerCreator(burgerSmall, burgerCheese);
console.log(burger1.name + ' with ' + burger1.stuffName+':\n '+ burger1.countPrice() + ' tugrics, ' + burger1.countCalories() + ' cal');

//3
var drink1 = new DrinkCreator(cola);
console.log(drink1.name + ':\n '+ drink1.countPrice() + ' tugrics, ' + drink1.countCalories() + ' cal');

//Sum of prices or calories
function calculatePrice(array){
    var sum = 0;
    for(var i = 0; i < array.length; i++){
        sum += array[i].price;}
    return sum;
    }
    
 function calculateCalories(array){
    var sum = 0;
    for(var i = 0; i < array.length; i++){
        sum += array[i].calories;}
    return sum;
    }

//To add some food
function addMenuItem(newmenuItems) {
    if (isPaid === false){
      return menuItems = menuItems.concat(newmenuItems);
    } else { return 'Order has already been paid. Start new order!'}
}
addMenuItem(burger1);
addMenuItem(drink1);
addMenuItem(salad1); 

console.log('Final price:\n' + calculatePrice(menuItems) + ' tugrics')
console.log('Final amount of calories:\n' + calculateCalories(menuItems) + ' cal')  

//To delete some food
function deleteMenuItem(item) {
    if (isPaid === false){
    var delmenuItems = menuItems.indexOf(item);
	return menuItems.splice(delmenuItems, 1)}  
		else { return 'Order has already been paid. It\'s impossible to delete anything!'}
}

deleteMenuItem(burger1);
 
console.log('Prices and calories after deleting an item')
console.log('Final price:\n' + calculatePrice(menuItems) + ' tugrics')
console.log('Final amount of calories:\n' + calculateCalories(menuItems) + ' cal')  

function isFinished(){
if(isPaid === false) {
isPaid = true;
return 'Order has been paid!'
}}

console.log(isFinished());
console.log(addMenuItem(salad1));
