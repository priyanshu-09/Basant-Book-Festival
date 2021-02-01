let publishers_arr = []


fetch("https://bbf.bits-pilani.ac.in/api/publisher/list/")
    .then(response => response.json())
    .then(data => {
        publishers_arr = data.data
        populate_publilshers()
    })
    .catch(error => console.log('error', error));


function populate_publilshers() {
    var length = publishers_arr.length
    console.log(length, publishers_arr)
    var number_of_rows = Math.ceil(length / 4)
    var current = 0
    document.getElementsByClassName('publishers_grid_container')[0].innerHTML = ''

    for (var x = 0; x < number_of_rows; x++) {
        var container_div = document.createElement('div')
        container_div.classList.add('publishers_flexbox')
        document.getElementsByClassName('publishers_grid_container')[0].appendChild(container_div)

        if (length < 4) {
            console.log(length)
            for (var i = 0; i < length; i++) {
                create_stalls(publishers_arr[current], x)
                current++
            }
            break
        }
        else {
            for (var i = 0; i < 4; i++) {
                create_stalls(publishers_arr[current], x)
                current++
            }
            length = length - 4
        }

    }
}

function create_stalls(obj, x) {
    var div = document.createElement('div')
    div.classList.add('stalls')
    var image_div = document.createElement('div')
    var img = document.createElement('img')
    var src = document.createAttribute('src')
    var img_class = document.createAttribute('class')
    var onclick = document.createAttribute('onclick')
    var root_url = 'http://bbf.bits-pilani.ac.in/media/'
    src.value = root_url + obj.logo
    img_class.value = 'stalls_image'
    onclick.value = `location.href='all_books.html?id=${obj.id}&name=${obj.name}'`

    img.setAttributeNode(src)
    img.setAttributeNode(img_class)
    img.setAttributeNode(onclick)
    image_div.appendChild(img)
    div.appendChild(image_div)

    var text_div = document.createElement('div')
    text_div.classList.add('stalls_heading')
    text_div.innerHTML = obj.name
    div.appendChild(text_div)

    document.getElementsByClassName('publishers_flexbox')[x].appendChild(div)


}

var height_of_svg = document.getElementsByClassName('landing_svg')[0].offsetHeight
var percent_on_hero_section
console.log('window width', window.innerWidth)
console.log('window outer width', window.outerWidth)
if (window.outerWidth > 600) {
    percent_on_hero_section = 0.825
    console.log('web')
}
else {
    console.log('mobile')
    percent_on_hero_section = 0.725
}
console.log(window.outerHeight)
console.log(height_of_svg)

document.getElementsByClassName('landing_svg')[0].style.top = (window.outerHeight - (percent_on_hero_section * height_of_svg)) + 'px'