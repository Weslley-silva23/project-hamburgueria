const menu = document.getElementById("menu");
const CartBtn = document.getElementById("cart-btn");
const CartModal = document.getElementById("cart-modal");
const CartITens = document.getElementById("cart-itens");
const CartTotal = document.getElementById("cart-total");
const CheckoutBtn = document.getElementById("checkout-btn");
const CloseModalBtn = document.getElementById("close-modal-btn");
const Cartcount = document.getElementById("cart-count");
const AddressInput = document.getElementById('address');
const AddressWarn = document.getElementById("addreess-warn");

let cart = []

// abrir o modal do carrinho
CartBtn.addEventListener("click", function () {
    Updatecartmodal();
    CartModal.style.display = "flex";

})

//  fechar o modal quando clicar fora 
CartModal.addEventListener("click", function (event) {
    if (event.target === CartModal) {
        CartModal.style.display = "none"
    }
})
CloseModalBtn.addEventListener("click", function () {
    CartModal.style.display = "none"
})

menu.addEventListener("click", function (event) {
    let parentButton = event.target.closest(".add-to-cart-btn")
    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        addtocart(name, price)
    }

})

function addtocart(name, price) {
    const ExistingItem = cart.find(item => item.name === name)

    if (ExistingItem) {
        ExistingItem.quantity += 1;

    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })

        Updatecartmodal()
    }


}

function Updatecartmodal() {
    CartITens.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElemnet = document.createElement('div');
        cartItemElemnet.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElemnet.innerHTML = `
        
        <div class=" flex justify-between items-center"> 
        
        <div>
        <p class="font-bold">${item.name}</p>
        <p>Qtd: ${item.quantity}</p>
        <p class="font-medium mt-1"> R$ ${item.price.toFixed(2)}</p>
        </div>

     
        <button class="remove-btn" data-name="${item.name}"> 
        Remover
         </button>
        
        </div>
        
        
        `

        total += item.price * item.quantity;

        CartITens.appendChild(cartItemElemnet)
    })


    CartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"


    });
    Cartcount.innerHTML = cart.length;
}


CartITens.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
        const name = event.target.getAttribute('data-name')

        removeitencart(name);
    }
})

function removeitencart(name) {
    const index = cart.findIndex(item => item.name === name)

    if (index !== -1) {
        const item = cart[index]

        if (item.quantity > 1) {
            item.quantity -= 1;
            Updatecartmodal();
            return;
        }

        cart.splice(index, 1);
        Updatecartmodal()
    }

}

AddressInput.addEventListener("input", function (event) {
    let inputvalue = event.target.value;

    if (inputvalue.value !== "")
        AddressInput.classList.remove("border-red-500")
    AddressWarn.classList.add("hidden");

})

CheckoutBtn.addEventListener("click", function () {

const IsOpen = checkrestaurantOpen();
if(IsOpen){
    
    Toastify({
        text: "Ops, RESTAURANTE FECHADO NO MOMENTO",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "#ef4444",
        }
    }).showToast();

    return;
}

    if (cart.length === 0) return;
    if (AddressInput.value === ""){
        AddressWarn.classList.remove("hidden")
    AddressInput.classList.add("border-red-500")
    return;
    }



    const CartiTens = cart.map((item) => {
        return (
            ` ${item.name} quantidade: (${item.quantity}) Preço: R$${item.price} | `
        )
    
        
    }).join("")

    const message = encodeURIComponent(CartiTens);
    const phone = "5511995069685"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${AddressInput.value}`,"_blank");
   cart = [];
   Updatecartmodal();

})

function checkrestaurantOpen() {
    const data = new Date();
    const hora = data.getHours();
    return hora <= 22 && hora > 17;
}

const Spanitem = document.getElementById("spanItem") 
const IsOpen =  checkrestaurantOpen();


if (IsOpen) {
    Spanitem.classList.remove("bg-red-600");
    Spanitem.classList.add("bg-green-600")
} else{
   
    Spanitem.classList.add("bg-red-600")
    Spanitem.classList.remove("bg-green-600")
}