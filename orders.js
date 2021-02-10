var order = []
var recommendeds = []


var ordered_books = []
var recommended_books = []

var publishers_arr
var is_professor = sessionStorage.getItem('is_professor')

if (!is_professor) {
    document.getElementsByClassName('orders')[0].style.display = 'none'
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
    document.getElementsByClassName('recommended')[0].style.opacity = '1'
    document.getElementsByClassName('recommended')[0].style.transform = 'scale(1)'
    document.getElementsByClassName('final_price_container')[0].style.opacity = '0'
    document.getElementsByClassName('items_container')[0].style.height = '80%'
}

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
        console.log(result)
        order = result.personal
        recommendeds = result.library

        populate()
    })
    .catch(error => console.log('error', error));

function orders() {
    console.log(ordered_books)
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
        var publishers_name
        for (var x = 0; x < publishers_arr.length; x++) {
            if (publishers_arr[x].id == ordered_books[i].publisher_id) {
                publishers_name = publishers_arr[x].name
                break
            }
        }
        var div = document.createElement('div')
        div.classList.add('books')
        div.innerHTML = `
            <div class="books_title" onclick='location.href="${ordered_books[i].link}"'>
                                ${i + 1}. ${ordered_books[i].title}
                            </div>
                            <div class="books_seller" onclick='location.href="all_books.html?id=${ordered_books[i].publisher_id}&name=${publishers_name}"'>
                                ${publishers_name}
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
    console.log(recommended_books)
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
        var publishers_name
        for (var x = 0; x < publishers_arr.length; x++) {
            if (publishers_arr[x].id == recommended_books[i].publisher_id) {
                publishers_name = publishers_arr[x].name
                break
            }

        }
        var div = document.createElement('div')
        div.classList.add('books')
        div.innerHTML = `
            <div class="books_title" onclick='location.href="${recommended_books[i].link}"'>
                                ${i + 1}. ${recommended_books[i].title}
                            </div>
                            <div class="books_seller" onclick='location.href="all_books.html?id=${recommended_books[i].publisher_id}&name=${publishers_name}"'>
                                ${publishers_name}
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

async function populate() {
    console.log('populate')
    ordered_books = []
    recommended_books = []
    for (var i = 0; i < order.length; i++) {
        var id_of_book = order[i].book_id
        console.log('inside for')
        await get_book_details(id_of_book).then(obj => {
            console.log('got the obj')
            ordered_books.push(obj)
        })

    }

    for (var i = 0; i < recommendeds.length; i++) {
        var id_of_book = recommendeds[i].book_id
        console.log('inside for')
        await get_book_details(id_of_book).then(obj => {
            console.log('got the obj')
            recommended_books.push(obj)
        })

    }
    document.getElementsByClassName('loader_wrapper')[0].style.display='none'
    console.log('going to orders')
    if (is_professor=='true') {
        orders()
    }
    else {
        recommended()
    }

}

async function get_book_details(id_book) {

    var response = await fetch(`https://bbf.bits-pilani.ac.in/api/book/${id_book}`)
    var json = await response.json()

    console.log(json)
    return json.data[0]
    // .then(response => response.json())
    // .then(data => {

    //     obj = data.data[0]
    //     console.log('success')
    //     console.log(obj)
    //     return (obj)
    // })
    // .catch(error => console.log('error', error));


}