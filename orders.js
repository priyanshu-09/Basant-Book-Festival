var order = []
var recommendeds = []


var ordered_books = []
var recommended_books = []

var publishers_arr

fetch("https://bbf.bits-pilani.ac.in/api/publisher/list/")
    .then(response => response.json())
    .then(data => {
        publishers_arr = data.data

    })
    .catch(error => console.log('error', error));


var token = sessionStorage.getItem('token')

var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + token);



var requestOptions = {
    method: 'GET',
    headers: myHeaders,

    redirect: 'follow'
};

fetch("https://bbf.bits-pilani.ac.in/api/order/my/", requestOptions)
    .then(response => response.json())
    .then(result => {
        order = result.personal
        recommendeds = result.library
        populate()
        orders()
    })
    .catch(error => console.log('error', error));

function orders() {
    document.getElementsByClassName('headings_container')[0].innerHTML = `
        <div class="headings items">
                            Items
                        </div>
                        <div class="headings seller">
                            Seller
                        </div>
                        <div class="prices">
                            Original Price
                        </div>
                        <div>
                            Final Price (After Discount)
                        </div>
    `
    var total_amt = 0
    document.getElementsByClassName('items_container')[0].innerHTML = ''
    for (var i = 0; i < ordered_books.length; i++) {
        var div = document.createElement('div')
        div.classList.add('books')
        div.innerHTML = `
            <div class="books_title" onclick='location.href="${ordered_books[i].link}"'>
                                ${i + 1}. ${ordered_books[i].title}
                            </div>
                            <div class="books_seller" onclick='location.href="all_books.html?id=${ordered_books[i].publisher_id}&name=${publishers_arr[(ordered_books[i].publisher_id) - 1].name}"'>
                                ${publishers_arr[(ordered_books[i].publisher_id) - 1].name}
                            </div>
                            <div class="books_old_price">
                                ${ordered_books[i].price_indian_currency}
                            </div>
                            <div class="books_new_price">
                                ${ordered_books[i].expected_price}
                            </div>
        `
        total_amt += ordered_books[i].expected_price
        document.getElementsByClassName('items_container')[0].appendChild(div)
    }
    document.getElementsByClassName('final_price')[0].innerHTML = total_amt.toString()
    document.getElementsByClassName('orders')[0].style.opacity = '1'
    document.getElementsByClassName('orders')[0].style.transform = 'scale(1)'
    document.getElementsByClassName('recommended')[0].style.opacity = '0.4'
    document.getElementsByClassName('recommended')[0].style.transform = 'scale(0.9)'
    document.getElementsByClassName('final_price_container')[0].style.opacity = '1'
    document.getElementsByClassName('items_container')[0].style.height = '70%'
}
function recommended() {
    document.getElementsByClassName('headings_container')[0].innerHTML = `
        <div class="headings items">
                            Items
                        </div>
                        <div class="headings seller">
                            Seller
                        </div>
                        <div class="prices">
                            Author
                        </div>
                        <div>
                            Year of Publication
                        </div>
    `
    document.getElementsByClassName('items_container')[0].innerHTML = ''
    for (var i = 0; i < recommended_books.length; i++) {
        var div = document.createElement('div')
        div.classList.add('books')
        div.innerHTML = `
            <div class="books_title" onclick='location.href="${recommended_books[i].link}"'>
                                ${i + 1}. ${recommended_books[i].title}
                            </div>
                            <div class="books_seller" onclick='location.href="all_books.html?id=${recommended_books[i].publisher_id}&name=${publishers_arr[(recommended_books[i].publisher_id) - 1].name}"'>
                                ${publishers_arr[(recommended_books[i].publisher_id) - 1].name}
                            </div>
                            <div class="books_author">
                                ${recommended_books[i].author}
                            </div>
                            <div class=" books_year">
                                ${recommended_books[i].year_of_publication}
                            </div>
        `
        document.getElementsByClassName('items_container')[0].appendChild(div)
    }

    document.getElementsByClassName('recommended')[0].style.opacity = '1'
    document.getElementsByClassName('recommended')[0].style.transform = 'scale(1)'
    document.getElementsByClassName('orders')[0].style.opacity = '0.4'
    document.getElementsByClassName('orders')[0].style.transform = 'scale(0.9)'
    document.getElementsByClassName('final_price_container')[0].style.opacity = '0'
    document.getElementsByClassName('items_container')[0].style.height = '80%'
}

function populate() {
    for (var i = 0; i < order.length; i++) {
        var id_of_book = order[i].book_id

        fetch(`https://bbf.bits-pilani.ac.in/api/book/${id_of_book}`)
            .then(response => response.json())
            .then(data => {
                obj = data.data[0]
                ordered_books.push(obj)
            })
            .catch(error => console.log('error', error));
    }

    for (var i = 0; i < recommendeds.length; i++) {
        var id_of_book = recommendeds[i].book_id

        fetch(`https://bbf.bits-pilani.ac.in/api/book/${id_of_book}`)
            .then(response => response.json())
            .then(data => {
                obj = data.data[0]
                recommended_books.push(obj)
            })
            .catch(error => console.log('error', error));
    }

}