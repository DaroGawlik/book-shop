fetch('./books.json') //path to the file with json data
	.then(response => {
		return response.json()
	})
	.then(data => {
		catchBooks(data)
	})

const header = document.createElement('header')
const main = document.createElement('main')
const footer = document.createElement('footer')

let $btnInfoBook
let $btnAddBag
let $bagListUl
let $bagListLi
let $bagTotal = 0
let val
let el
let blurAction

// HEADER
document.body.appendChild(header)

const headerShadow = document.createElement('div')
header.appendChild(headerShadow)
headerShadow.classList.add('headerShadow')

const headerTitle = document.createElement('h1')
header.appendChild(headerTitle)
headerTitle.classList.add('headerTitle')
headerTitle.innerHTML = `welcome to the amazing book shop`

// MAIN

document.body.appendChild(main)

// LEFT
const mainDivLeftConst = document.createElement('div')
main.appendChild(mainDivLeftConst)
mainDivLeftConst.classList.add('mainDivLeft')

const mainDivLeftHeader = document.createElement('h4')
mainDivLeftConst.appendChild(mainDivLeftHeader)
mainDivLeftHeader.classList.add('mainDivLeftHeader')
mainDivLeftHeader.innerHTML = `book catalog`

const mainDivLeftContainer = document.createElement('div')
mainDivLeftConst.appendChild(mainDivLeftContainer)
mainDivLeftContainer.classList.add('mainDivLeftContainer')

function catchBooks(data) {
	let books = data
	for (let i = 0; i < books.length; i++) {
		const objectBook = books[i]

		const bookCard = document.createElement('div')
		mainDivLeftContainer.appendChild(bookCard)
		bookCard.classList.add('bookCard')

		// IMAGE
		const bookCardImg = document.createElement('div')
		bookCard.appendChild(bookCardImg)
		bookCardImg.classList.add('bookCardImg')
		bookCardImg.style.backgroundImage = `url(${objectBook.imageLink})`

		// TITLE
		const bookTittle = document.createElement('h2')
		bookCard.appendChild(bookTittle)
		bookTittle.innerHTML = objectBook.title

		// AUTHOR
		const bookAuthor = document.createElement('h3')
		bookCard.appendChild(bookAuthor)
		bookAuthor.innerHTML = objectBook.author

		// PRICE
		const bookPrice = document.createElement('div')
		bookCard.appendChild(bookPrice)
		bookPrice.classList.add('bookPrice')
		bookPrice.innerHTML = objectBook.price + ` $`

		// DIV BTNS
		const bookBtns = document.createElement('div')
		bookCard.appendChild(bookBtns)
		bookBtns.classList.add('bookBtns')

		$btnInfoBook = document.createElement('button')
		bookBtns.appendChild($btnInfoBook)
		$btnInfoBook.classList.add('btnInfoBook')
		$btnInfoBook.innerHTML = `more info`

		$btnAddBag = document.createElement('button')
		bookBtns.appendChild($btnAddBag)
		$btnAddBag.classList.add('btnInfoAdd')
		$btnAddBag.innerHTML = `add to bag`
		$btnAddBag = document.querySelectorAll('.btnInfoAdd')

		// DIV MORE INFO

		const moreInfo = document.createElement('div')
		bookCard.appendChild(moreInfo)
		moreInfo.classList.add('moreInfoHide')
		moreInfo.innerHTML = objectBook.description

		const btnMoreInfoClose = document.createElement('button')
		moreInfo.appendChild(btnMoreInfoClose)
		btnMoreInfoClose.classList.add('btnMoreInfoClose')
		btnMoreInfoClose.innerHTML = `close`
		btnMoreInfoClose.style.visibility = 'hidden'
	}

	catchInfoBtns()
	catchBtnsMoreInfoClose()
	catchAddbook()
}

// FUNCTIONS LEFT

const showMoreInfo = divObject => {
	divObject.classList.add('moreInfo')
}

const btnShowMoreInfoActive = divObject => {
	divObject.style.visibility = 'visible'
}

const btnShowMoreClose = divObject => {
	divObject.classList.remove('moreInfo')
}

const btnShowMoreHide = divObject => {
	divObject.style.visibility = 'hidden'
}

const bagList = bagObject => {
	$bagListUl = document.querySelector('.bagListUl')

	if (!$bagListUl) {
		$bagListUl = document.createElement('ul')
		bagContainer.appendChild($bagListUl)
		$bagListUl.classList.add('bagListUl')
	}

	$bagListLi = document.createElement('li')
	$bagListUl.appendChild($bagListLi)
	$bagListLi.classList.add('bagListLi')

	liImg = document.createElement('div')
	$bagListLi.appendChild(liImg)
	liImg.classList.add('liImg')
	liImg.style.backgroundImage = bagObject.bagImg

	liInfo = document.createElement('div')
	$bagListLi.appendChild(liInfo)
	liInfo.classList.add('liInfo')

	liInfoTitle = document.createElement('p')
	liInfo.appendChild(liInfoTitle)
	liInfoTitle.classList.add('liInfoTitle')
	liInfoTitle.innerHTML = bagObject.bagTitle

	liInfoAuthor = document.createElement('p')
	liInfo.appendChild(liInfoAuthor)
	liInfoAuthor.classList.add('liInfoAuthor')
	liInfoAuthor.innerHTML = bagObject.bagAuthor

	liInfoPrice = document.createElement('p')
	liInfo.appendChild(liInfoPrice)
	liInfoPrice.classList.add('liInfoPrice')
	liInfoPrice.innerHTML = bagObject.bagPrice

	liBtnBagRemove = document.createElement('button')
	$bagListLi.appendChild(liBtnBagRemove)
	liBtnBagRemove.classList.add('btnLiBagRemove')
	liBtnBagRemove.innerHTML = `remove`

	catchAllRemoveBtns(liBtnBagRemove)
}

// RIGHT

const mainDivRightConst = document.createElement('div')
main.appendChild(mainDivRightConst)
mainDivRightConst.classList.add('mainDivRight')

const bagHeader = document.createElement('h4')
mainDivRightConst.appendChild(bagHeader)
bagHeader.classList.add('bagHeader')
bagHeader.innerHTML = `your bag`

const bagContainer = document.createElement('div')
mainDivRightConst.appendChild(bagContainer)
bagContainer.classList.add('bagContainer')

const bagTotal = document.createElement('div')
mainDivRightConst.appendChild(bagTotal)
bagTotal.classList.add('bagTotal')
bagTotal.innerHTML = `${$bagTotal} $`

const bagSummary = document.createElement('div')
mainDivRightConst.appendChild(bagSummary)
bagSummary.classList.add('bagSummary')

const btnOrder = document.createElement('button')
bagSummary.appendChild(btnOrder)
btnOrder.classList.add('btnOrder')
btnOrder.innerHTML = `confirm order`

const btnClear = document.createElement('button')
bagSummary.appendChild(btnClear)
btnClear.classList.add('btnClear')
btnClear.innerHTML = `clear all`

const removeTargetBook = e => {
	const catchPriceInBagToRemove = e.children[1].lastElementChild.innerHTML
	const cutPriceToRemove = catchPriceInBagToRemove.substring(0, 2)
	const toNumberPriceToRemove = Number(cutPriceToRemove)
	$bagTotal -= toNumberPriceToRemove
	bagTotal.innerHTML = `${$bagTotal} $`

	e.remove()
}

const removeAllBooks = e => {
	if ($bagListUl != undefined) $bagListUl.remove()
	$bagTotal = 0
	bagTotal.innerHTML = `${$bagTotal} $`
}

const addTotalPrice = toNumberPrice => {
	$bagTotal += toNumberPrice
	bagTotal.innerHTML = `${$bagTotal} $`
	console.log($bagTotal)
}

// FOOTER
document.body.appendChild(footer)

const footerSpan = document.createElement('span')
footer.appendChild(footerSpan)
footer.classList.add('footerSpan')
footerSpan.innerHTML = `Dariusz Gawlik © 11/2022`

// ORDER FORM

const orderContainerShadow = document.createElement('div')
document.body.appendChild(orderContainerShadow)

const orderContainer = document.createElement('div')
document.body.appendChild(orderContainer)
orderContainer.style.display = 'none'

const btnOrderContainerCancel = document.createElement('button')
orderContainer.appendChild(btnOrderContainerCancel)
btnOrderContainerCancel.classList.add('btnOrderContainerCancel')
btnOrderContainerCancel.innerHTML = `cancel`

const orderContainerForm = document.createElement('form')
orderContainer.appendChild(orderContainerForm)
orderContainerForm.classList.add('orderContainerForm')

showConfimOrder = () => {
	orderContainerShadow.classList.add('orderContainerShadow')
	orderContainer.classList.add('orderContainer')
	orderContainer.style.display = 'block'
}

hideConfimOrder = () => {
	orderContainerShadow.classList.remove('orderContainerShadow')
	orderContainer.classList.remove('orderContainer')
	orderContainer.style.display = 'none'
}
;(function doDivConfirmLoop() {
	const nameDivsConFirm = [
		{
			id: 'nameCon',
			nameLabel: 'nameLabel',
			nameInnerLabel: 'Name',
			nameInput: 'nameField',
			error: 'errorConfirmNameCon',
		},
		{
			id: 'surnameCon',
			nameLabel: 'surnameLabel',
			nameInnerLabel: 'Surname',
			nameInput: 'surnameField',
			error: 'errorConfirmSurnameCon',
		},
		{
			id: 'deliveryCon',
			nameLabel: 'deliveryLabel',
			nameInnerLabel: 'Delivery date',
			nameInput: 'deliveryField',
			error: 'errorConfirmDeliveryCon',
		},
		{
			id: 'streetCon',
			nameLabel: 'streetLabel',
			nameInnerLabel: 'Street',
			nameInput: 'streetField',
			error: 'errorConfirmStreetCon',
		},
		{
			id: 'houseNumberCon',
			nameLabel: 'houseNumberLabel',
			nameInnerLabel: 'House number',
			nameInput: 'houseNumberField',
			error: 'errorConfirmHouseNumberCon',
		},
		{
			id: 'flatNumberCon',
			nameLabel: 'flatNumberLabel',
			nameInnerLabel: 'Flat number',
			nameInput: 'flatNumberField',
			error: 'errorConfirmFlatNumberCon',
		},
	]

	for (let i = 0; i < nameDivsConFirm.length; i++) {
		const mainDivtest = document.createElement('div')
		orderContainerForm.appendChild(mainDivtest)
		mainDivtest.classList.add(`${nameDivsConFirm[i].id}`)

		labelCom = document.createElement('label')
		mainDivtest.appendChild(labelCom)
		labelCom.classList.add(`${nameDivsConFirm[i].nameLabel}`)
		labelCom.innerHTML = `${nameDivsConFirm[i].nameInnerLabel}`

		inputCom = document.createElement('input')
		inputCom.setAttribute('id', nameDivsConFirm[i].id)
		mainDivtest.appendChild(inputCom)
		inputCom.classList.add(`${nameDivsConFirm[i].nameInput}`)
		inputCom.classList.add('blurAction')

		errorConfirm = document.createElement('p')
		mainDivtest.appendChild(errorConfirm)
		errorConfirm.classList.add(`${nameDivsConFirm[i].error}`)
	}
})()

document.querySelectorAll('.blurAction').forEach(input =>
	input.addEventListener('blur', e => {
		switch (e.target.id) {
			case 'nameCon':
				checkName()
				focus()
				break
			case 'surnameCon':
				checkSurname()
				break
			case 'deliveryCon':
				checkDelivery()
				break
			case 'streetCon':
				checkStreet()
				break
			case 'houseNumberCon':
				checkHouseNumber()
				break
			case 'flatNumberCon':
				checkFlatNumber()
				break
		}
	})
)

function checkValifFiled() {
	checkName()
	checkSurname()
	checkDelivery()
	checkStreet()
	checkHouseNumber()
	checkFlatNumber()
}

const checkName = () => {
	let val = document.getElementById('nameCon').value
	let el = document.querySelector('.errorConfirmNameCon')
	if (val.length < 4 || val.match(/[^A-Za-z]/)) {
		el.innerText = 'Minimum 4 strings'
	} else {
		el.innerText = ''
	}
}

const checkSurname = () => {
	let val = document.getElementById('surnameCon').value
	let el = document.querySelector('.errorConfirmSurnameCon')
	if (val.length < 5 || val.match(/[^A-Za-z]/)) {
		el.innerText = 'Minimum 5 strings'
	} else {
		el.innerText = ''
	}
}

const deliveryField = document.querySelector('.deliveryField')
deliveryField.setAttribute('type', 'date')

const checkDelivery = () => {
	const today = new Date()
	const tomorrow = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
	dateUser = document.querySelector('.deliveryField').value
	const errorConfirmDeliveryCon = document.querySelector('.errorConfirmDeliveryCon')
	if (dateUser <= tomorrow) {
		errorConfirmDeliveryCon.innerText = 'Not earlier than next day'
	} else {
		errorConfirmDeliveryCon.innerText = ''
	}
}

const checkStreet = () => {
	let val = document.getElementById('streetCon').value
	let el = document.querySelector('.errorConfirmStreetCon')
	if (val.length < 5 || val.match(/[^A-Za-z0-9. ]/)) {
		el.innerText = 'Minimum 5 strings and numbers'
	} else {
		el.innerText = ''
	}
}

const checkHouseNumber = () => {
	let val = document.getElementById('houseNumberCon').value
	let el = document.querySelector('.errorConfirmHouseNumberCon')
	if (val.match(/^[1-9][0-9]*$/)) {
		el.innerText = ''
	} else {
		el.innerText = 'Only postivie numbers'
	}
}

const checkFlatNumber = () => {
	let val = document.getElementById('flatNumberCon').value
	let el = document.querySelector('.errorConfirmFlatNumberCon')
	if (val.match(/^[1-9](\-?[1-9][0-9]*)*$/)) {
		el.innerText = ''
	} else {
		el.innerText = 'Only postivie numbers'
	}
}

// RADIO DIV

const paymentTypeCon = document.createElement('div')
orderContainerForm.appendChild(paymentTypeCon)
paymentTypeCon.classList.add('paymentTypeCon')
paymentTypeCon.innerHTML = 'Choose the payment type:'
paymentTypeCon.style.fontSize = '20px'
paymentTypeCon.style.marginTop = '20px'

const radioLeftLabel = document.createElement('label')
paymentTypeCon.appendChild(radioLeftLabel)
radioLeftLabel.setAttribute('id', 'cashRadio')
radioLeftLabel.innerHTML = ' Cash '
radioLeftLabel.style.marginLeft = '10px'
const radioLeftInput = document.createElement('input')
paymentTypeCon.appendChild(radioLeftInput)
radioLeftInput.setAttribute('type', 'radio')
radioLeftInput.setAttribute('name', 'type')
radioLeftInput.setAttribute('value', 'cash')
radioLeftInput.setAttribute('id', 'cashRadio')
radioLeftInput.style.marginLeft = '5px'

const radioRightLabel = document.createElement('label')
paymentTypeCon.appendChild(radioRightLabel)
radioRightLabel.setAttribute('id', 'cardRadio')
radioRightLabel.innerHTML = ' Card '
radioRightLabel.style.marginLeft = '20px'
const radioRightInput = document.createElement('input')
paymentTypeCon.appendChild(radioRightInput)
radioRightInput.setAttribute('type', 'radio')
radioRightInput.setAttribute('name', 'type')
radioRightInput.setAttribute('value', 'card')
radioRightInput.setAttribute('id', 'cardRadio')
radioRightInput.style.marginLeft = '5px'

//GIFT DIV

const giftsComForm = document.createElement('div')
orderContainerForm.appendChild(giftsComForm)
giftsComForm.classList.add('giftsComForm')

const giftTitle = document.createElement('p')
giftsComForm.appendChild(giftTitle)
giftTitle.classList.add('giftTitle')
giftTitle.innerText = 'Choose 2 gifts:'

const giftsContainer = document.createElement('div')
giftsComForm.appendChild(giftsContainer)
giftsContainer.classList.add('giftsContainer')
const brOne = document.createElement('br')

const radioGiftFirstInput = document.createElement('input')
giftsContainer.appendChild(radioGiftFirstInput)
radioGiftFirstInput.setAttribute('type', 'checkbox')
radioGiftFirstInput.setAttribute('id', 'pack')

const radioGiftFirstLabel = document.createElement('label')
giftsContainer.appendChild(radioGiftFirstLabel)
radioGiftFirstLabel.setAttribute('id', 'pack')
radioGiftFirstLabel.innerHTML = 'Pack as a gift'
giftsContainer.appendChild(brOne)
const radioGiftSecondInput = document.createElement('input')

giftsContainer.appendChild(radioGiftSecondInput)
radioGiftSecondInput.setAttribute('type', 'checkbox')
radioGiftSecondInput.setAttribute('id', 'postcard ')

const radioGiftSecondLabel = document.createElement('label')
giftsContainer.appendChild(radioGiftSecondLabel)
radioGiftSecondLabel.setAttribute('id', 'postcard')
radioGiftSecondLabel.innerHTML = 'Add postcard'
const brTwo = document.createElement('br')
giftsContainer.appendChild(brTwo)

const radioGiftThirdInput = document.createElement('input')
giftsContainer.appendChild(radioGiftThirdInput)
radioGiftThirdInput.setAttribute('type', 'checkbox')
radioGiftThirdInput.setAttribute('id', 'Provide')
const radioGiftThirdLabel = document.createElement('label')
giftsContainer.appendChild(radioGiftThirdLabel)
radioGiftThirdLabel.setAttribute('id', 'Provide ')
radioGiftThirdLabel.innerHTML = 'Provide 2% discount to the next time'
const brThree = document.createElement('br')
giftsContainer.appendChild(brThree)

const radioGiftFourthInput = document.createElement('input')
giftsContainer.appendChild(radioGiftFourthInput)
radioGiftFourthInput.setAttribute('type', 'checkbox')
radioGiftFourthInput.setAttribute('id', 'brand')

const radioGiftFourthLabel = document.createElement('label')
giftsContainer.appendChild(radioGiftFourthLabel)
radioGiftFourthLabel.setAttribute('id', 'brand')
radioGiftFourthLabel.innerHTML = 'Branded pen or pencil'

//

document.querySelectorAll('input[type="checkbox"]').forEach(item => item.addEventListener('click', () => checkGifts()))

const checkGifts = () => {
	const test = [...document.querySelectorAll('input[type="checkbox"]')]
	// test.forEach(item => console.log(item.checked))
	const newTest = test.filter((item, index) => item.checked === true)
	if (newTest.length > 1) {
		test.forEach(item => {
			if (item.checked === false) {
				item.setAttribute('disabled', true)
			}
		})
	}
	if (newTest.length < 2) {
		test.forEach(item => {
			if (item.checked === false) {
				item.removeAttribute('disabled')
			}
		})
	}
}

// btn
const btnCom = document.createElement('div')
orderContainerForm.appendChild(btnCom)
btnCom.classList.add('btnCom')

// LISTENERS

const catchInfoBtns = () => {
	const infoButtonsLoop = document.querySelectorAll('.btnInfoBook')
	infoButtonsLoop.forEach(item =>
		item.addEventListener('click', e => {
			showMoreInfo(item.parentElement.nextSibling)
			btnShowMoreInfoActive(item.parentElement.nextSibling.lastChild)
		})
	)
}

const catchBtnsMoreInfoClose = () => {
	const deleteMoreInfoLoop = document.querySelectorAll('.btnMoreInfoClose')
	deleteMoreInfoLoop.forEach(item =>
		item.addEventListener('click', e => {
			btnShowMoreHide(item)
			btnShowMoreClose(item.parentElement)
		})
	)
}

const catchAddbook = () => {
	const addBookLoop = document.querySelectorAll('.btnInfoAdd')
	addBookLoop.forEach(item =>
		item.addEventListener('click', e => {
			const bagObject = {
				bagImg: item.parentElement.parentElement.children[0].style.backgroundImage,
				bagTitle: item.parentElement.parentElement.children[1].innerHTML,
				bagAuthor: item.parentElement.parentElement.children[2].innerHTML,
				bagPrice: item.parentElement.parentElement.children[3].innerHTML,
			}
			bagList(bagObject)

			const catchPriceInBag = item.parentElement.parentElement.children[3].innerHTML
			const cutPrice = catchPriceInBag.substring(0, 2)
			const toNumberPrice = Number(cutPrice)
			addTotalPrice(toNumberPrice)
		})
	)
}

const catchAllRemoveBtns = btnObject => {
	btnObject.addEventListener('click', e => {
		removeTargetBook(e.target.parentElement)
	})
}

btnClear.addEventListener('click', removeAllBooks)
btnOrder.addEventListener('click', showConfimOrder)
btnOrderContainerCancel.addEventListener('click', hideConfimOrder)
