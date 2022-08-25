getAllProduct()

function getAllProduct() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products",
        success: function (data) {
            displayTable(data)
        }
    })
}


function displayTable(data) {
    let result = ""
    result += "<table>"
    result += "<tr>"
    result += "<th>Number</th>"
    result += "<th>Name</th>"
    result += "<th>Price</th>"
    result += "<th>Category</th>"
    result += "<th colspan='2'>Action</th>"
    result += "</tr>"
    for (let i = 0; i < data.length; i++) {
        result += "<tr>"
        result += "<td>" + (i + 1) + "</td>"
        result += "<td>" + data[i].name + "</td>"
        result += "<td>" + data[i].price + "</td>"
        result += "<td>" + data[i].category + "</td>"
        result += "<td><button onclick='updateFrom(" + data[i].id + ")'>Update</button>"
        result += "<button onclick='deleteProduct(" + data[i].id + ")'>Delete</button></td>"
        result += "</tr>"
    }
    result += "</table>"
    document.getElementById("list").innerHTML = result
}

function setFormCreate() {
    document.getElementById("name").value = ""
    document.getElementById("price").value = ""
    document.getElementById("category").value = ""
}

function setFormByData(data){
    document.getElementById("name").value = data.name
    document.getElementById("price").value = data.price
    document.getElementById("category").value = data.category
}

function createForm() {
    setFormCreate()
    document.getElementById("titleFrom").innerHTML = "Tạo mới sản phẩm"
    document.getElementById("button").innerHTML = "Tạo mới"
    document.getElementById("button").setAttribute("onclick", "createProduct()")
    $('#myModal').modal("show")
}


function createProduct() {

    let name = $('#name').val()
    let price = $('#price').val()
    let category = $('#category').val()

    let product = {
        name: name,
        price: price,
        category: category,
    }

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/products",
        data: JSON.stringify(product),
    })
    setFormCreate()
    document.getElementById("message").innerHTML = "Tạo mới thành công"
    getAllProduct()
    event.preventDefault()
}
let idProduct;
function updateFrom(id){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/products/" + id,
        success: function (data1){
            idProduct = id
            document.getElementById("name").value = data1.name
            document.getElementById("price").value = data1.price
            document.getElementById("category").value = data1.category


        }
    })
    $('#myModal').modal("show")
    document.getElementById("titleFrom").innerHTML = "Cập nhập sản phẩm"
    document.getElementById("button").innerHTML = "Chỉnh sửa"
    document.getElementById("message").innerHTML = ""
    document.getElementById("button").setAttribute("onclick", "updateProduct()")
}


function deleteProduct(id) {
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/products/" + id,
        success: getAllProduct
    })
}

function updateProduct(){
    let namep = $('#name').val()
    let pricep = $('#price').val()
    let categoryp = $('#category').val()

    let product = {
        id: idProduct,
        name: namep,
        price: pricep,
        category: categoryp,
    }
    console.log(product)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/products",
        data: JSON.stringify(product),
        success:function(data2) {
            setFormByData(data2)
            document.getElementById("message").innerHTML = "Cập nhập thành công"
        }
    })
    event.preventDefault()
}


