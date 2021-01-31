const params = new URLSearchParams(window.location.search)
let id_of_book
for (const param of params) {
    if (param != 'id') {
        id_of_book = parseInt(param)
    }
}

