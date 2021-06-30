let cartModal = document.querySelector('.cartModal');
let cart = document.querySelector('#cart');
let cart1 = document.querySelector('#cart span');
let closeModal = document.querySelector('#closeModal');
let addToCartBtn = document.querySelectorAll('.addTOcart');
let paymentBtn = document.querySelector('#submit');
let theTable = document.querySelector('table');




//MODAL EVENTS
cart.addEventListener('click', () => {
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
		addToCartBtn[i].textContent = 'Added to cart';
		if (addToCartBtn[i].classList.contains('active')) {
			addToCartBtn[i].disabled = true
		}

	})
}

//the add to cart btn
for (let i = 0; i < addToCartBtn.length; i++) {
	addToCartBtn[i].addEventListener('click', addtoCart)

}
//THIS FUNCTION WILL LOOP THROUGH THE BUTTON AND SELECT THE NAME AND PRICE OF ITEMS
function addtoCart(e) {
	let btn = e.target;
	let btnParent = btn.parentElement;
	let grandParent = btnParent.parentElement;
	let itemName = btnParent.children[0].innerText

	let itemPrice = grandParent.children[2].innerText;


	////
	//NOW THAT WEHAVE GOTTEN OUR NAME AND PRICE, LET'S CREATE A DYNAMIC TR THAT WE WILL BE ADING TO OUR CART MODAL
	let itemTR = document.createElement('tr');
	itemTR.innerHTML = `<td id='name'>${itemName}</td>
<td class="ourprice">${itemPrice}</td>
<td class="quantity"><input type="number" value ="1" min="1" max="500" id="numPlus"></td>
<td class="productPrice">${itemPrice}</td>
<td class = "trash"><i class="fa fa-trash"></i></td>`;


	let ourTable = document.querySelector('#table  #body');
	ourTable.appendChild(itemTR);

	let cartNumber = ourTable.rows.length;
	let ourCart = document.querySelector('#cartNumberSpan')
	ourCart.innerText = cartNumber;
	////////////////////////////////////////////
	
	//the quantity of the product needs to be dealt with
	let quantity = document.querySelectorAll('#numPlus');
	for (let j = 0; j < quantity.length; j++) {
		quantity[j].addEventListener("change", updateQuantity);
	}

	//let's picj the button
	let trashBtn = document.querySelectorAll('.trash');
	for (let t = 0; t < trashBtn.length; t++) {
		trashBtn[t].addEventListener('click', removeMe);

	}
	amountToPayOut()
}

function updateQuantity(e) {
	let numOfItem = e.target;
	let counter = numOfItem.parentElement.innerText;
	counter = parseInt(counter)

	let numberOfItemParent = numOfItem.parentElement.parentElement;
	//get the price field and the total field
	//quantity
	let quantityNumber = numberOfItemParent.querySelector('.quantity').children[0].value;


	//the main price
	let productPrice = numberOfItemParent.children[1].innerText;
	productPrice = productPrice.replace('$', '');
	productPrice = parseInt(productPrice)

	//total
	let pricefield = numberOfItemParent.querySelector('.productPrice');
	let totalFieldValue = productPrice * quantityNumber;
	if (quantityNumber == 0) {
		alert('the quantity cannot be zero')
	} else if (isNaN(quantityNumber) || quantityNumber == '') {
		quantityNumber = 1;
	}
	else {
		pricefield.innerText = '$' + totalFieldValue
	}
	amountToPayOut()
}

//the final total price to pay
function amountToPayOut() {
	let total = 0;
	//pick the content inthe sub total field on our modal 
	//pick the class name of the sub total
	let totalPrice = document.getElementsByClassName('productPrice');
	//loop through every every
	for (let k = 0; k < totalPrice.length; k++) {
		let totalPrice_value = Number(totalPrice[k].innerText.replace('$', ''));

		total += totalPrice_value;
		let totalPriceToPay = document.querySelector('.totalPriceToPay')
		totalPriceToPay.innerText = '$' + total
		let ourInputValue = document.querySelector('#totalAmount')
		ourInputValue.value = total
	}
}

//the function that controls the red trash button which remove an item from the list

function removeMe(e) {
	let trashBtn = e.target;
	let trashBtn_parent = trashBtn.parentElement.parentElement;
	trashBtn_parent.remove()
	let ourTable2 = document.querySelector('table > tbody');
	let number = ourTable2.rows.length
	let ourCart = document.querySelector('#cartNumberSpan')
	ourCart.innerText = number;
	amountToPayOut()
	if (theTable.rows.length <= 1) {
		let updateTotal = document.querySelector('.totalPriceToPay');
		let ourInputValue = document.querySelector('#totalAmount')
		updateTotal.innerText = '$' + 0
		ourInputValue.value = 0
	}



	//the clear cart btn
	let clearcartBtn = document.querySelector('#clearCart')
	clearcartBtn.addEventListener('click', () => {
		let tbody = document.querySelector('tbody');
		tbody.innerHTML = '';
		let ourTable2 = document.querySelector('table > tbody');
		let number1 = ourTable2.rows.length
		let ourCart = document.querySelector('#cartNumberSpan')
		ourCart.innerText = number1;
		if (theTable.rows.length <= 1) {
			let updateTotal = document.querySelector('.totalPriceToPay');
			updateTotal.innerText = '$' + 0;
		}


	})
}


paymentBtn.addEventListener('click', (e) => {
	let ourTable = document.querySelector('#table tbody').innerHTML;
	
	let table2 = document.querySelector('#table2 tbody');
let ourNewTable = document.createElement('tbody');
	ourNewTable.innerHTML = ourTable;
	console.log(ourNewTable)
	ourNewTable = ourNewTable.rows;

	for(let d= 0; d < ourNewTable.length ; d++){
		let itemName = ourNewTable[d].children[0].innerText
		let quatity = ourNewTable[d].children[2].innerText
		console.log(quatity)
		let price = ourNewTable[d].children[1].innerText
		let table3 = document.createElement('tr');
		table3.innerHTML = `
		<td>${itemName}</td>
		<td> ${price} each</td>
	
		`
		table2.appendChild(table3)
		console.log(table2)
	}
	//variable declaration
	let userName = document.querySelector('#username')
	let EmailValue = document.querySelector('#Email')
	let phoneNumber = document.querySelector('#phonenumber')
	let amount = document.querySelector('#totalAmount')

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
	if (amount.value == 0) {
		alert('add a [product to cart before you proceed to payout')
	}
	if (userName.className == 'correctInput' && EmailValue.className == 'correctInput' && phoneNumber.className == 'correctInput' && amount.value != 0) {
		payWithPaystack()
	}
	

})



function payWithPaystack() {
	let handler = PaystackPop.setup({
		key: 'pk_test_559ed4e475d2ae6faf647de9b8e491f039987619', // Replace with your public key
		email: document.getElementById("Email").value,
		amount: document.getElementById("totalAmount").value * 100,
		ref: '' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
		// label: "Optional string that replaces customer email"
		onClose: function () {
			alert('Window closed.');
		},
		callback: function (response) {
			cartModal.classList.remove('active');
			popUpModal();
		}
	});
	handler.openIframe();

}


//SUMMARY MODAL
let closeModall = document.querySelector('#overlay')
closeModall.addEventListener('click', () => {
	let openModa = document.querySelector('.showsummary');
	openModa.style.display = 'none';
})
let closedBtn = document.querySelector('.modalClose');
closedBtn.addEventListener('click', () => {
	let openModa = document.querySelector('.showsummary');
	openModa.style.display = 'none';
})

//let us get the table tr so that we can get it's item








function popUpModal() {
	let openModa = document.querySelector('.showsummary');
	openModa.style.display = 'block';

}



