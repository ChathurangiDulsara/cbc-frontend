export function loadCart() {

  const cart = localStorage.getItem("orderedItems");
  if (cart != null) {
    return JSON.parse(cart)
  } else {
    return []
  }
}



export function addToCart(productID, quantity) {
  const cart = loadCart()

  const index = cart.findIndex(
    (orderedItems) => {
      return orderedItems.productID == productID
    }
  )
  console.log(index)
  if (index == -1) {
    cart.push(
      { productID, quantity }
    )
  } else {

    const newQuantity = cart[index].quantity + quantity
    if (newQuantity <= 0) {
      cart.splice(index, 1)
    } else {
      cart[index].quantity = newQuantity
    }
  }
  saveCart(cart)
}

export function saveCart(cart) {
  localStorage.setItem("orderedItems", JSON.stringify(cart))
}

export function clearCart() {
  localStorage.removeItem("orderedItems")
}

export function deleteItem(productID) {
  const cart = loadCart()

  const index = cart.findIndex(
    (orderedItems) => {
      return orderedItems.productID == productID
    }
  )

  if (index != -1) {
    cart.splice(index, 1)
    saveCart(cart)
  }
}
