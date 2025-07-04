// Represents a product in the store
class Product {
    constructor(name,price,quantity,isExpire, isShippable, weight){
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.isExpire = isExpire; //boolean
    this.isShippable = isShippable; //boolean
    
    if(isShippable){
        this.weight = weight
    }else{
        this.weight = 0
        }
    }

    getName(){
        return this.name
    }
    getWeight(){
        return this.weight
    }
}

class Customer {
    constructor(name,budget)
    {
        this.name = name;
        this.budget = budget;
    }
}

class shippingService {
    static shippingfee(){
        return 30; //price
    }
    // Prints the shipment details for shippable products
    static shippings(items){
        let totalweight = 0;
        console.log("** Shipment Notice **")
        console.log("------------------------------")
        for(let item of items){
            
            if(item.product.isShippable){
        
            const mulWeight = item.product.getWeight() * item.quantity;

            console.log(`${item.quantity}x ${item.product.getName()}    ${mulWeight}g`)
            totalweight += mulWeight
            }
        }
        console.log("------------------------------")
        console.log(`Total Package Weight: ${(totalweight / 1000).toFixed(1)} kg`)
        console.log(" ")
        console.log(" ")
    }
}



class cart{
    constructor(){
        this.items = []; 
    }
    
    add(product, quantity) { 
     
     // Check if product quantity is available before adding to cart
     if(quantity <= product.quantity){
            this.items.push( {product, quantity} )
        }else{
            console.log(`Not enough quantity for the ${product.name}`)
        }
    }
    calculateSubTotal(){
        let total = 0;
        for(let item of this.items){
            total += item.product.price * item.quantity;
        }
        return total;
    }
    calculateWeight(){
        let weighted = 0;
        for(let item of this.items){
            if(item.product.weight){
            weighted += item.product.weight * item.quantity
            }else{
                return weighted;
            }
        }
        return weighted;
    }

    checkout(customer){
        if (this.items.length === 0) {
            console.log("Cart is empty.");
            return;
        }
        //Check expire date
        for (let item of this.items) {
            if (item.product.isExpire) {
                console.log(`${item.product.getName()} is expired.`);
                return;
            }
        }
        
        let subtotal = this.calculateSubTotal()
        let shippingfees = shippingService.shippingfee()
        let total = subtotal + shippingfees

        // Calculate total cost and compare with customers budget
        if(customer.budget < total){
            console.log("Insufficient balance!")
            return;
        }else{

            shippingService.shippings(this.items);

            console.log("$$  Checkout receipt $$")
            console.log("------------------------------")

        for(let item of this.items){
            const totalprice = item.product.price * item.quantity;
            console.log(`${item.quantity}x ${item.product.getName()}    ${item.product.price*item.quantity}`)
            item.product.quantity -= item.quantity;
            }

            console.log("------------------------------")
            console.log(`Subtotal: ${subtotal}`)
            console.log(`Shipping: ${shippingfees}`)
            console.log(`Amount: ${total}`)
        }
    }
}
//test customer
const customer = new Customer("Mohamed", 9000);

//test products
const cheese = new Product("Cheese", 100, 5, false, true, 200);
const tv = new Product("TV", 5000, 2, false, true, 700);
const card = new Product("Scratch Card", 50, 10, false, false, 0);

//test cart
const myCart = new cart();
myCart.add(cheese, 2);
myCart.add(tv, 1);
myCart.add(card, 1);

myCart.checkout(customer)