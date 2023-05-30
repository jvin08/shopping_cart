import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shoppingcart-database-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);

const shoppingListInDB = ref(database, "cart");
const cartSample = [
    "ягоди",
    "яблука",
    "огірки",
    "банани",
    "апельсини",
    "зелень",
    "морква",
    "картопля",
    "консерви",
    "хліб",
    "масло",
    "сметана",
    "вода",
    "печиво",
    "йогурт",
    "пепсі",
    "чай",
    "тарілки",
    "вологі серветки",
    "сухі серветки",
];

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-to-cart");
const shoppingCartEl = document.getElementById("shopping-cart");
const cartSampleEl = document.getElementById("cart-sample");

const clearInputFieldEl = () => inputFieldEl.value = "";

const addItemToShoppingCartEl = (item) => {
        // shoppingCartEl.innerHTML += `<li>${itemValue}</li>`;
        let itemID = item[0]
        let itemValue = item[1]
        let newElement = document.createElement("li");
        newElement.textContent = itemValue;

        shoppingCartEl.append(newElement);
        newElement.addEventListener("click", function(){

            let exactLocationOfItemInDB = ref(database, `cart/${itemID}`)

            remove(exactLocationOfItemInDB);

        })
}

const clearShoppingCartEl = () => {
    shoppingCartEl.innerHTML = "";
}

onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let cartItems = Object.entries(snapshot.val())

        clearShoppingCartEl();
    
        for (let i = 0; i < cartItems.length; i++) {
            let item = cartItems[i];
            addItemToShoppingCartEl(item)
        }
    } else {
        shoppingCartEl.innerHTML = "Кошик пустий ще . . ."; 
        let newElement = document.createElement("span");
        newElement.setAttribute("id", "cart-sample")
        newElement.textContent = "Простий кошик";
        shoppingCartEl.append(newElement);
        // generating cart sample
        newElement.addEventListener("click", function(){
            for (let id = 0; id < cartSample.length; id++) {
                const element = cartSample[id];
                push(shoppingListInDB, element);
            }
            clearInputFieldEl();
        })
         
    }
    
})


addButtonEl.addEventListener("click", function(){

    let inputValue = inputFieldEl.value;
    
    inputValue && push(shoppingListInDB, inputValue);

    clearInputFieldEl();
})

