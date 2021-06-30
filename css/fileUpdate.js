let cartModal = document.querySelector('.cartModal');
let cart = document.querySelector('#cart');
let cart1 = document.querySelector('#cart span');
let closeModal = document.querySelector('#closeModal');
let addToCartBtn = document.querySelectorAll('.addTOcart');
let paymentBtn = document.querySelector('#submit');


//an array of object. This is important when we want to add this to our cart modal
let product = [
    {
        name: 'ASUS LAPTOP',
        tag: 'asuslaptop',
        price: 100,
        inCart: 0
    },
    {
        name: 'DELL LAPTOP',
        tag: 'delllaptop',
        price: 200,
        inCart: 0
    },
    {
        name: 'DELL PRO LAPTOP',
        tag: 'dellpro',
        price: 300,
        inCart: 0
    },
    {
        name: 'Chuwi Laptop',
        tag: 'chuwi',
        price: 100,
        inCart: 0
    },
    {
        name: 'HP Sceptre',
        tag: 'sceptre',
        price: 200,
        inCart: 0
    },
    {
        name: 'Naija Laptop',
        tag: 'naija',
        price: 200,
        inCart: 0
    },
    {
        name: 'Dan Laptop',
        tag: 'dan',
        price: 100,
        inCart: 0
    },
    {
        name: 'MS Laptop',
        tag: 'MS',
        price: 110,
        inCart: 0
    },
    {
        name: 'DELL PRO LAPTOP',
        tag: 'pro',
        price: 300,
        inCart: 0
    },
    {
        name: 'Surface Laptop',
        tag: 'surface',
        price: 90,
        inCart: 0
    }
]
//MODAL EVENTS
cart.addEventListener('click', () => {
    onLoadUpdate();
    cartModal.classList.add('active')
})
closeModal.addEventListener('click', () => {
    cartModal.classList.remove('active')
})
let cartModal2 = document.querySelector('.overlay');
cartModal2.addEventListener('click', () => {
    cartModal.classList.remove('active')
})
//ADD TO CART BTN ACTION
for (let i = 0; i < addToCartBtn.length; i++) {
    addToCartBtn[i].addEventListener('click', () => {
        addToCartBtn[i].classList.add('active')
        addToCartBtn[i].textContent = 'added to cart'
        if (addToCartBtn[i].classList.contains('active')) {
            addToCartBtn[i].prevventDefault
        }
        cartNumber(product[i]);
        totalCost(product[i])
        displayOnCart();
        onLoadUpdate();

    })
}

//function to count the number i the cart
function cartNumber(product) {
    let productCounter = localStorage.getItem('cartNumber')

    productCounter = parseInt(productCounter)

    if (productCounter) {
        localStorage.setItem('cartNumber', productCounter + 1)
        cart1.textContent = productCounter;
    } else {
        localStorage.setItem('cartNumber', 1);
        cart1.textContent = 1;
    }
    setItems(product);
}

//function to update the cart number on load
function onLoadUpdate() {
    getTableRow();
}

function setItems(product) {
    let cartItem = localStorage.getItem('productInCart');
    cartItem = JSON.parse(cartItem)
    if (cartItem != null) {
        if (cartItem[product.tag] == undefined) {
            cartItem = {
                ...cartItem,
                [product.tag]: product
            }
        }
        cartItem[product.tag].inCart += 1
    } else {
        product.inCart = 1
        cartItem =
        {
            [product.tag]: product
        }
    }


    localStorage.setItem('productInCart', JSON.stringify(cartItem))
}
function totalCost(product2) {
    let cartCost = localStorage.getItem('totalCOST')

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCOST', cartCost + product2.price)
    } else {
        localStorage.setItem('totalCOST', product2.price)
    }


}
//function to add all our localstorage items to the cart modal
function displayOnCart() {
    let cartProducts = localStorage.getItem('productInCart');
    cartProducts = JSON.parse(cartProducts);
    let modalTable = document.querySelector('table');

    let cartCost = localStorage.getItem('totalCOST')
    if (cartProducts && modalTable) {
        modalTable.innerHTML = '';
        Object.values(cartProducts).map(item => {
            modalTable.innerHTML += `
			
			<tr class="newRow">
				<td>${item.name}<td>
				<td>${item.price}<td>
                <td><i class="fa fa-plus" id="counter"></i>${item.inCart}<i class="fa fa-minus"></i></td> 
				<td>total = ${item.inCart * item.price}</td>
				<td  id="removeItem" onclick="deleteUs()"><i class="fa fa-trash"></i></td>
			</tr>
			`;
            totalPrice();
        })

        ///////////////////////////////////////////////
        function totalPrice() {
            let totalPrice = document.querySelector('.CartValue h2');
            totalPrice.innerHTML = '$' + cartCost
        }


    }
}


function getTableRow() {
    let table = document.querySelectorAll('#table .newRow').length;
    cart1.textContent = table
}

paymentBtn.addEventListener('click', (e) => {
    //variable declaration
    let userName = document.querySelector('#username')
    let EmailValue = document.querySelector('#Email')
    let phoneNumber = document.querySelector('#phonenumber')

    if (userName.value == '') {
        userName.className = 'wrongInput';
        alert('username cannot be empty')
        e.preventDefault();
    }
    if (userName.value.length <= 6) {
        userName.className = 'wrongInput';
        alert('username must be greater than 6 characters')
        e.preventDefault();
    }
    if (userName.value.length > 6) {
        userName.className = 'correctInput';
        e.preventDefault()
    }
    if (EmailValue.value == '') {
        EmailValue.className = 'wrongInput'
        e.preventDefault();
    }

    if (EmailValue.value.length > 4) {
        EmailValue.className = 'correctInput'
        e.preventDefault();
    }
    if (phoneNumber.value.length < 11) {
        phoneNumber.className = 'wrongInput'
        alert('phone numbermust be 11 digit')
        e.preventDefault()
    }
    if (phoneNumber.value.length > 10) {
        phoneNumber.className = 'correctInput'
        e.preventDefault()
    }
    if (userName.className == 'correctInput' && EmailValue.className == 'correctInput' && phoneNumber.className == 'correctInput') {
        console.log('all fine dude')
    }

})

function deleteUs(e) {
    let tr = document.querySelector(".newRow");
    let productArray = localStorage.getItem('productInCart');
    //for delete btn
    let deleteMe = document.querySelectorAll('#removeItem');
    for (let a = 0; a < deleteMe.length; a++) {
        let tr = document.querySelector(".newRow");
        console.log(productArray[a])

    }
}


let clearCartBtn = document.querySelector('#clearCart');
clearCartBtn.addEventListener('click', () => {
    window.localStorage.clear();


})
onLoadUpdate();
displayOnCart();
getTableRow();