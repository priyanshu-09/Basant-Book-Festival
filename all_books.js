if (sessionStorage.getItem('name') != undefined) {
    document.getElementById('login_button').innerHTML = "Welcome " + sessionStorage.getItem('name')
    document.getElementsByClassName('cart')[0].style.display = 'block'
}

const params = new URLSearchParams(window.location.search)
let id_of_publisher
let name_of_publisher


for (const param of params) {
    if (param[0] == 'id') {
        id_of_publisher = param[1]
    }
    else {
        name_of_publisher = param[1]
    }
}

let whole_books_arr = []
let current_page_number = 1
let total_books = 0

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

console.log(id_of_publisher)
var raw = JSON.stringify({ "search": id_of_publisher });

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("https://bbf.bits-pilani.ac.in/api/book/filter/fs/publisher/", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result.data)
        whole_books_arr = result.data;
        total_books = whole_books_arr.length;
        document.getElementsByClassName('all_books_heading')[0].innerHTML = name_of_publisher
        if (total_books < 9) {
            document.getElementsByClassName('next')[0].style.display = 'none'
            console.log('hi')
        }
        paginate()
    })
    .catch(error => console.log('error', error));

document.getElementsByClassName('books_flexbox')[0].innerHTML = ''
document.getElementsByClassName('books_flexbox')[1].innerHTML = ''
document.getElementsByClassName('next')[0].style.display = 'flex'



function paginate() {
    document.getElementsByClassName('books_flexbox')[0].innerHTML = ''
    document.getElementsByClassName('books_flexbox')[1].innerHTML = ''
    for (var i = (8 * (current_page_number - 1)); i < 8 * current_page_number; i++) {
        if (i == total_books - 1) {
            if (i - (8 * (current_page_number - 1)) < 4) {

                populate_books(whole_books_arr[i], 0)
            }
            else {
                populate_books(whole_books_arr[i], 1)
            }
            break
        }
        if (i - (8 * (current_page_number - 1)) < 4) {

            populate_books(whole_books_arr[i], 0)
        }
        else {
            populate_books(whole_books_arr[i], 1)
        }
    }
}

function populate_books(obj, row) {
    var container_div = document.createElement('div')
    container_div.classList.add('book_card')
    var onclick = document.createAttribute('onclick')
    onclick.value = `location.href='book.html?id=${obj.id}&name=${name_of_publisher}'`
    container_div.setAttributeNode(onclick)

    var book_img_container = document.createElement('div')
    book_img_container.classList.add('book_img_container')

    var img = document.createElement('img')
    var src = document.createAttribute('src')
    src.value = obj.thumbnail
    img.setAttributeNode(src)
    var class_name = document.createAttribute('class')
    class_name.value = 'book_img'
    img.setAttributeNode(class_name)

    book_img_container.appendChild(img)

    var book_text = document.createElement('div')
    book_text.classList.add('book_text')

    var book_title = document.createElement('div')
    book_title.classList.add('book_title')

    var span = document.createElement('span')
    span.innerHTML = obj.title
    book_title.appendChild(span)

    var book_author = document.createElement('div')
    book_author.classList.add('book_author')
    book_author.innerHTML = obj.author

    var book_price_container = document.createElement('div')
    book_price_container.classList.add('book_price_container')

    var new_price = document.createElement('div')
    new_price.classList.add('new_price')
    new_price.innerHTML = '₹' + obj.expected_price

    var old_price = document.createElement('div')
    old_price.classList.add('old_price')
    old_price.innerHTML = '₹' + obj.price_indian_currency

    var discount = document.createElement('div')
    discount.classList.add('discount')
    discount.innerHTML = 'Save ' + obj.discount + '%'

    book_price_container.appendChild(new_price)
    book_price_container.appendChild(old_price)
    book_price_container.appendChild(discount)

    book_text.appendChild(book_title)
    book_text.appendChild(book_author)
    book_text.appendChild(book_price_container)

    container_div.appendChild(book_img_container)
    container_div.appendChild(book_text)

    document.getElementsByClassName('books_flexbox')[row].appendChild(container_div)
}

function next() {
    current_page_number++
    if (current_page_number == 2) {
        document.getElementsByClassName('prev')[0].style.display = 'flex'

    }
    if (Math.ceil(total_books / 8) == current_page_number) {
        document.getElementsByClassName('next')[0].style.display = 'none'
    }
    paginate()
}

function prev() {
    current_page_number--
    if (current_page_number == Math.ceil(total_books / 8) - 1) {
        document.getElementsByClassName('next')[0].style.display = 'flex'
    }
    if (current_page_number == 1) {
        document.getElementsByClassName('prev')[0].style.display = 'none'

    }
    paginate()
}
