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

//Child class for creating burgers

function BurgerCreator(size, stuff){
    this.stuffName = stuff.name;
    FoodCreator.call(this, size.name, size.price + stuff.price, size.cal + stuff.cal)
};

BurgerCreator.prototype = Object.create(FoodCreator.prototype);

BurgerCreator.SIZE_SMALL = { name: 'Small Burger', price: 50, cal: 20 };

BurgerCreator.WITH_CHESEE = {  name: 'Cheese stuff', price: 10, cal: 20 };

BurgerCreator.WITH_SALAD = {  name: 'Salad', price: 20, cal: 5 };

BurgerCreator.SIZE_BIG = { name: 'Big Burger', price: 100, cal: 40 };

BurgerCreator.WITH_POTATO = { name: 'potato', price: 15, cal: 10 };

//Function to know a price of menuItem
BurgerCreator.prototype.countPrice = function() {
    return this.price;
}

//Function to know calories of menuItem
BurgerCreator.prototype.countCalories = function() {
    return this.calories;
}

//1
var burger1 = new BurgerCreator(BurgerCreator.SIZE_SMALL, BurgerCreator.WITH_CHESEE);
console.log(burger1.name + ' with ' + burger1.stuffName+':\n '
+ burger1.countPrice() + ' tugrics, ' + burger1.countCalories() + ' cal');


//Salads

function SaladCreator(salad, weight) {
	this.weightMenuItem = weight;
    FoodCreator.call(this, salad.name , salad.price, salad.cal)
};

SaladCreator.prototype = Object.create(FoodCreator.prototype);

SaladCreator.WEIGHT = { grams: 100 };

//Function to know a price of menuItem
SaladCreator.prototype.countPrice = function() {
	this.price = this.price * this.weightMenuItem/SaladCreator.WEIGHT.grams;
    return this.price;
};

//Function to know calories of menuItem
SaladCreator.prototype.countCalories = function() {
	this.calories = this.calories * this.weightMenuItem/SaladCreator.WEIGHT.grams;
    return  this.calories;
};

SaladCreator.CAESAR =  { name: 'Caesar', price: 100, cal: 20 };

SaladCreator.RUSSIAN_SALAD = { name: 'Russian Salad', price: 50, cal: 80 };



//2
var salad1 = new SaladCreator( SaladCreator.CAESAR, 150 );
console.log(salad1.name + ':\n '+ salad1.countPrice() + ' tugrics, ' + salad1.countCalories(50) + ' cal'); 

//Drinks
function DrinkCreator(drink) {
    FoodCreator.call(this, drink.name, drink.price, drink.cal);
};

DrinkCreator.prototype = Object.create(FoodCreator.prototype);

//Function to know a price of menuItem
DrinkCreator.prototype.countPrice = function() {
    return this.price;
};

//Function to know calories of menuItem
DrinkCreator.prototype.countCalories = function() {
    return this.calories;
};

DrinkCreator.COLA = { name: 'Coca-Cola', price: 50, cal: 30 };

DrinkCreator.COFFEE = { name: 'Coffee', price: 80, cal: 20 };

//3
var drink1 = new DrinkCreator(DrinkCreator.COFFEE);
console.log(drink1.name + ':\n '+ drink1.countPrice() + ' tugrics, ' + drink1.countCalories() + ' cal');

//Order

function OrderCreator(...args){
	this.array = args;
}

OrderCreator.prototype.addNewItem = function (item, payment) { 
	if (payment === false){
        return this.array.push(item);}
    else {
    	return 'Order has already been paid. Start new order!'
    }
}; 

OrderCreator.prototype.deleteItem = function (item, payment) { 
    if (payment === false){
        var delmenuItems = this.array.indexOf(item);
	  return this.array.splice(delmenuItems, 1)}  
	else { return 'Order has already been paid. It\'s impossible to delete anything!'}
};

OrderCreator.prototype.calculateOrderPrice = function () { 
    var sum = 0;
    for(var i = 0; i < this.array.length; i++){
        sum += this.array[i].price;
    }
    return sum;
}; 

OrderCreator.prototype.calculateOrderCalories = function () { 
    var sum = 0;
    for(var i = 0; i < this.array.length; i++){
        sum += this.array[i].calories;
    }
    return sum;
}; 

function closeOrder(){
if(isPaid === false) {
isPaid = true;
return 'Order has been paid!'
}}

var order1 = new OrderCreator(burger1, drink1);

//Tests
 
console.log('Bill: ' + order1.calculateOrderPrice() + ' tugrics ' + order1.calculateOrderCalories() + ' calories');
order1.addNewItem(salad1, isPaid);
console.log('Bill: ' + order1.calculateOrderPrice() + ' tugrics ' + order1.calculateOrderCalories() + ' calories');
order1.deleteItem(burger1, isPaid);
console.log('Bill: ' + order1.calculateOrderPrice() + ' tugrics ' + order1.calculateOrderCalories() + ' calories');
closeOrder();
console.log(isPaid);
order1.addNewItem(salad1, isPaid);
console.log('Bill: ' + order1.calculateOrderPrice() + ' tugrics ' + order1.calculateOrderCalories() + ' calories');
