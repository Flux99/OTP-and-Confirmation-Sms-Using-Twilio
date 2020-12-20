console.log("there");

if(document.readyState =="loading"){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    var removeButton =$(".btn-danger");
    console.log("removeButton",removeButton);
    for(var i=0 ;i < removeButton.length;i++){
        var button = removeButton[i]
        button.addEventListener('click',removeCartItem);
    }
    var quantityInputs =$(".cart-quantity-input");
    console.log("quantityInputquantityInputs",quantityInputs);
    for(var i=0 ;i < quantityInputs.length;i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged);
    }

    var addToCartButtons =$(".shop-item-button");
    for(var i=0 ;i < addToCartButtons.length;i++){
        var button = addToCartButtons[i]
        button.addEventListener('click',addToCartClicked);
    }
   
}

function removeCartItem(event){
    var buttonClicked =event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event){
    var input =event.target
    console.log("inputtttttttttt",input.value);
    if(isNaN(input.value) || input.value <= 0 ){
        input.value =1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button =event.target
    var orderItem =button.parentElement.parentElement
    var title =orderItem.getElementsByClassName('shop-item-title')[0].innerText
    var price =orderItem.getElementsByClassName('shop-item-price')[0].innerText 
    var imgSrc =orderItem.getElementsByClassName('shop-item-image')[0].src
    console.log("Title"+title+"price"+price+"imgSrc"+imgSrc); 
    addItemToCart(title,price,imgSrc)
    updateCartTotal()
}   

function addItemToCart(title,price,imgSrc){
    var cartRow = document.createElement('div')
    //cartRow.classList.add('cart-row');
    var cartItem = $(".cart-items")[0]
    var cartItemNames = cartItem.getElementsByClassName('cart-item-title')
    for (i=0;i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert("Already Added");
            return
        }

    }
    var cartRowContents= `
    <div class="cart-row">
    <div class="cart-item cart-column">
                <img class="cart-item-image" src=${imgSrc} width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div> 
            </div>`
    cartRow.innerHTML=cartRowContents
    cartItem.append(cartRow);
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener('change',quantityChanged)
    
}



function updateCartTotal(){
    var carItemContainer= document.getElementsByClassName("cart-items")[0]
    var cartRows = carItemContainer.getElementsByClassName('cart-row');
    console.log("cartRow",cartRows);
    var total =0;
    for(var i =0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName("cart-price")[0].innerHTML
        var price= parseFloat(priceElement.replace('₹',''))
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0].value
        console.log("price"+price+"quantityElement"+quantityElement);
        total = total + (price * quantityElement);
        console.log("total",total);
    }
    $(".cart-total-price")[0].innerHTML= '₹' +total

}


document.getElementById("myBtn").addEventListener("click", function() {
    var money =$(".cart-total-price")[0].innerHTML
    console.log("moneyyyy",money);
   
    if(money == '₹'+0){
        alert("Your Cart is Empty");
        return
    }else{
        var price= parseFloat(money.replace('₹',''))
            console.log("price",price);
        alert("Your Cart is Not Empty");
        var myJSON = JSON.stringify(price);
        async function postData(url = '/order', data = {myJSON}) {
            // Default options are marked with *
            const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
              credentials: 'same-origin', // include, *same-origin, omit
              headers: {
                'Content-Type': 'application/json',
                 'Content-Type': 'application/x-www-form-urlencoded'
              },
              redirect: 'follow', // manual, *follow, error
              referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
              body:data// body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
          }


          postData('/order',  myJSON )
            .then(data => {
            console.log("orderData"+data); // JSON data parsed by `response.json()` call
  });

    }
  });


