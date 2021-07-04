let cartModal = document.querySelector('.cartModal');
let cart = document.querySelector('#cart');
let cart1 = document.querySelector('#cart span');
let closeModal = document.querySelector('#closeModal');
let addToCartBtn = document.querySelectorAll('.addTOcart');
let paymentBtn = document.querySelector('#submit');
let theTable = document.querySelector('table');




//Cart MODAL EVENTS
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
	updateCartNumber();
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

//the function that controls the trash button which remove an item from the list

function removeMe(e) {
	let trashBtn = e.target;
	let trashBtn_parent = trashBtn.parentElement.parentElement;
	trashBtn_parent.remove()
	let ourTable2 = document.querySelector('#table > tbody');
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

}

	//the clear cart btn
	let clearcartBtn = document.querySelector('#clearCart')
	clearcartBtn.addEventListener('click', () => {
		let tbody = document.querySelector('#table tbody');
		tbody.innerHTML = '';
		updateCartNumber()
		


	})



paymentBtn.addEventListener('click', (e) => {

	//variable declaration
	let userName = document.querySelector('#username')
	let EmailValue = document.querySelector('#Email')
	let phoneNumber = document.querySelector('#phonenumber')
	let amount = document.querySelector('#totalAmount')
	let ourText = document.querySelector('#checkoutText')
	if (amount.value == 0) {
		
		ourText.innerText = 'Add a product before you proceed'
		ourText.style.visibility = 'visible'
	}
	
	else if (userName.className == 'correctInput' && EmailValue.className == 'correctInput' && phoneNumber.className == 'correctInput' && amount.value != 0) {
		payWithPaystack();
		ourText.innerText = 'Perfect!'
		ourText.style.visibility = 'visible'
		e.preventDefault()
	}else{
		ourText.innerText = 'Add your details before you checkout'
		ourText.style.visibility = 'visible'
		e.preventDefault()
	}
	

})


//SUMMARY MODAL CLOSING ABRACADABRA
let closeModall = document.querySelector('#overlay')
closeModall.addEventListener('click', () => {
	let openModa = document.querySelector('.showsummary');
	openModa.style.display = 'none';
	closeit ()
})
let closedBtn = document.querySelector('.modalClose');
closedBtn.addEventListener('click', () => {
	let openModa = document.querySelector('.showsummary');
	openModa.style.display = 'none';
	closeit ()
})

function getInputValue(){
	let ourTable = document.querySelector('#table tbody').innerHTML;
	
	let table2 = document.querySelector('#table2 tbody');
let ourNewTable = document.createElement('tbody');
	ourNewTable.innerHTML = ourTable;
	ourNewTable = ourNewTable.rows;

	 
		let inputfield = document.querySelectorAll('#table tbody #numPlus')
		for(let e = 0; e<inputfield.length; e++){
			let td = document.createElement('td');
			td  = inputfield[e].value
			 
		
		let itemName = ourNewTable[e].children[0].innerText
		 
		 
		let table3 = document.createElement('tr');
		table3.innerHTML = `
		<td>${itemName}</td>
		<td>${td}</td>
	
		`
		table2.appendChild(table3)
	}

}
function resetBtn(){
	for (let i = 0; i < addToCartBtn.length; i++) {
		
			addToCartBtn[i].classList.remove('active')
			addToCartBtn[i].textContent = 'Add to cart';
			
			
				addToCartBtn[i].disabled = false
			}
			
		
	}

//function that is responsible for clearing the cart modal upon closing the summary modal. It also update the number of items in the cart 
function closeit () {
	let username = document.querySelector('#username').value;
	alert(`Adios, ${username}`);
	clearCart();
	updateCartNumber()
	resetBtn()
}

//function that deals with the opening of the summary modal
function popUpModal() {
	let openModa = document.querySelector('.showsummary');
	openModa.style.display = 'block';
	getInputValue()
	let username = document.querySelector('#username').value;
	let message = document.querySelector('.summaryMessage');
	message.innerText = 'Thank you ' + username + ' for patronizing us';
	clearCart();
}



//the functions for all the form onBlur 
//1. username
function userNameField(){
	let userNameText = document.querySelector('#usernameText')
	let EmailText = document.querySelector('#EmailText')
	let NumberText = document.querySelector('#NumberText')
	let userName = document.querySelector('#username');
	if (userName.value == '') {
		userName.className = 'wrongInput';
		userNameText.innerText = 'username cannot be empty'
		userNameText.style.visibility = "visible"
	
	}else
	if (userName.value.length <= 6) {
		userName.className = 'wrongInput';
		userNameText.innerText = 'username must be greater than 6 characters'
		userNameText.style.visibility = "visible"
	}else
	if (userName.value.length > 6) {
		userName.className = 'correctInput';
		userNameText.innerText = 'Perfect!'
		userNameText.style.visibility = "visible"
	}
}
//2.Email
function emailField(){
	let EmailValue = document.querySelector('#Email')
	if (EmailValue.value == '') {
		EmailValue.className = 'wrongInput'
		EmailText.innerText = 'Email cannot be empty'
		EmailText.style.visibility = "visible"
	}else if (EmailValue.value.includes('.com') && EmailValue.value.includes('@') ) {
		EmailValue.className = 'correctInput'
		EmailText.innerText = 'Perfect!'
		EmailText.style.visibility = "visible"
	}else{
		
		EmailText.innerText = 'Enter a valid Email'
		EmailText.style.visibility = "visible"
		EmailValue.className = 'wrongInput'
	}
}
//3. phone Number
function phoneField(){
	let phoneNumber = document.querySelector('#phonenumber');
	if (phoneNumber.value == ''){
		NumberText.innerText = 'Phone number field cannot be empty'
		NumberText.style.visibility = "visible"
		phoneNumber.className = 'wrongInput'
	}else
	if (phoneNumber.value.length < 11) {
		phoneNumber.className = 'wrongInput'
		NumberText.innerText = 'That\'s definitely a wrong number!'
		NumberText.style.visibility = "visible"
	
	}
	if (phoneNumber.value.length > 10) {
		phoneNumber.className = 'correctInput'
		NumberText.innerText = 'Perfect!'
		NumberText.style.visibility = "visible"
		
	}
}
//the code copied from paystack 
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
			getInputValue()
		}
	});
	handler.openIframe();

}

//function that clear the cart after closing the summary modal
function clearCart(){
	//get the cart table > tbody
	let ourTable = document.querySelector('#table > tbody')
	//set te tbody to empty
	ourTable.innerHTML = ''
}

//this function will track all the number of items inthe cart modal
function updateCartNumber(){
	//the cart number
	let ourTable = document.querySelector('#table  #body');
	let cartNumber = ourTable.rows.length;
	let ourCart = document.querySelector('#cartNumberSpan')
	ourCart.innerText = cartNumber;
}
