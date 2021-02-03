if (sessionStorage.getItem('name') != undefined) {
    document.getElementById('login_button').innerHTML = "Welcome " + sessionStorage.getItem('name')
    document.getElementsByClassName('cart')[0].style.display = 'block'
}

const params = new URLSearchParams(window.location.search)
let id_of_book
let publisher_name
for (const param of params) {
    if (param[0] == 'id') {
        id_of_book = param[1]
    }
    else {
        publisher_name = param[1]
    }
}
var obj

fetch(`https://bbf.bits-pilani.ac.in/api/book/${id_of_book}`)
    .then(response => response.json())
    .then(data => {
        obj = data.data[0]
        console.log(obj)
        populate()
    })
    .catch(error => console.log('error', error));

function populate() {
    document.getElementsByClassName('rounded_box')[0].innerHTML = ''

    var book_img_container = document.createElement('div')

    var img = document.createElement('img')
    var src = document.createAttribute('src')
    src.value = obj.image
    img.setAttributeNode(src)
    var class_name = document.createAttribute('class')
    class_name.value = 'book_img'
    img.setAttributeNode(class_name)

    book_img_container.appendChild(img)

    var book_content = document.createElement('div')
    book_content.classList.add('book_content')

    var book_heading = document.createElement('div')
    var book_heading_id = document.createAttribute('id')
    book_heading_id.value = 'book_heading'
    var book_heading_onclick = document.createAttribute('onclick')
    book_heading_onclick.value = `location.href='${obj.link}'`
    book_heading.setAttributeNode(book_heading_id)
    book_heading.setAttributeNode(book_heading_onclick)
    book_heading.innerHTML = obj.title

    var book_author = document.createElement('div')
    var book_author_id = document.createAttribute('id')
    book_author_id.value = 'book_author'
    book_author.setAttributeNode(book_author_id)
    book_author.innerHTML = obj.author

    var book_publisher_container = document.createElement('div')
    book_publisher_container.classList.add('book_publisher_container')
    book_publisher_container.innerHTML = `by <a id='book_publisher' onclick='location.href="all_books.html?id=${obj.publisher_id}&name=${publisher_name}"'` + `>${publisher_name}`

    var book_price_container = document.createElement('div')
    book_price_container.classList.add('book_price_container')

    var new_price = document.createElement('div')
    var new_price_id = document.createAttribute('id')
    new_price_id.value = 'book_new_price'
    new_price.setAttributeNode(new_price_id)
    new_price.innerHTML = '₹' + obj.expected_price

    var old_price = document.createElement('div')
    var old_price_id = document.createAttribute('id')
    old_price_id.value = 'book_old_price'
    old_price.setAttributeNode(old_price_id)
    old_price.innerHTML = '₹' + obj.price_indian_currency

    var discount = document.createElement('div')
    var discount_id = document.createAttribute('id')
    discount_id.value = 'discount'
    discount.setAttributeNode(discount_id)
    discount.innerHTML = 'Save ' + obj.discount + '%'

    book_price_container.appendChild(new_price)
    book_price_container.appendChild(old_price)
    book_price_container.appendChild(discount)

    var personal_use = document.createElement('div')
    personal_use.classList.add('button_container')

    var personal_use_button = document.createElement('div')
    personal_use_button.classList.add('button')
    var onclick_buy = document.createAttribute('onclick')
    onclick_buy.value = 'Buy()'
    personal_use_button.innerHTML = 'Buy for Personal Use'
    personal_use_button.setAttributeNode(onclick_buy)
    personal_use.appendChild(personal_use_button)

    var recommended = document.createElement('div')
    recommended.classList.add('button_container')

    var recommended_button = document.createElement('div')
    recommended_button.classList.add('button_inverse')
    var onclick_recommend = document.createAttribute('onclick')
    onclick_recommend.value = 'Recommend()'
    recommended_button.innerHTML = 'Recommend to Library'
    recommended_button.setAttributeNode(onclick_recommend)
    recommended.appendChild(recommended_button)

    book_content.appendChild(book_heading)
    book_content.appendChild(book_author)
    book_content.appendChild(book_publisher_container)
    book_content.appendChild(book_price_container)
    book_content.appendChild(personal_use)
    book_content.appendChild(recommended)

    document.getElementsByClassName('rounded_box')[0].appendChild(book_img_container)
    document.getElementsByClassName('rounded_box')[0].appendChild(book_content)

}

function Buy() {
    document.getElementById('pop_up').style.display = 'flex'
    document.getElementsByClassName('wrapper')[0].style.opacity = '0'

    document.getElementById('pop_up_content').innerHTML = `
        Thank you for selecting the book for your personal use. <br>
         This book will be procured on approval. Once it arrives, you will be invited to go through the same for its final purchase by you. On your confirmation, the vendor will issue a bill in your name to make the payment. Once the payment is made, you can collect the book from the Library.<br><br>
Are you sure you want to continue ?
    `
    document.getElementsByClassName('buttons_container')[0].innerHTML = `
        <div class="button_inverse" onclick="cancel()">
                Cancel
            </div>
            <div class="button" onclick="yes_buy()">
                Yes
            </div>
    `
}
function Recommend() {

    document.getElementById('pop_up').style.display = 'flex'
    document.getElementsByClassName('wrapper')[0].style.opacity = '0'

    document.getElementById('pop_up_content').innerHTML = `
        Thank you for recommending the book for the Library!<br>
This book will be procured on approval. Once it arrives, you will be invited to go through the same for its final selection.<br><br>
Are you sure you want to continue ?
    `
    document.getElementsByClassName('buttons_container')[0].innerHTML = `
        <div class="button_inverse" onclick="cancel()">
                Cancel
            </div>
            <div class="button" onclick="yes_recommend()">
                Yes
            </div>
    `
}

function cancel() {
    document.getElementById('pop_up').style.display = 'none'
    document.getElementsByClassName('wrapper')[0].style.opacity = '1'

    document.getElementById('pop_up_content').innerHTML = ''
}

function yes_buy() {
    console.log(obj)
    var token = sessionStorage.getItem('token')
    console.log(token)
    if (token == undefined) {
        alert('Please Log in with your University ID first')
        cancel()
    }
    else {

    }
}
function yes_recommend() {
    console.log(obj)
    var token = sessionStorage.getItem('token')
    console.log(token)
    if (token == undefined) {
        alert('Please Log in with your University ID first')
        cancel()
    }
    else {

    }
}