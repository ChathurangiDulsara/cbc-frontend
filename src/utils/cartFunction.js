export function loadCart() {
  const cart = localStorage.getItem("cart");
  if(cart!=null){
    return JSON.parse(cart)
  }else{
    return []
  }
}



export function addToCart(productID, quantity){
  const cart = loadCart()

  const index = cart.findIndex(
    (orderedItems)=>{
      return orderedItems.productID==productID
    }
  )
  console.log(index)
  if(index==-1){
    cart.push(
      {productID, quantity}
    )
  }else{

    const newQty = cart[index].quantity+ quantity
    if(newQty<=0){
      cart.splice(index,1)
    }else{
      cart[index].quantity = newQty
    }
  }
  saveCart(cart)
}

export function saveCart(cart){
  localStorage.setItem("cart",JSON.stringify(cart))
}

export function clearCart(){
  localStorage.removeItem("cart")
}

export function deleteItem(productID){
  const cart = loadCart()

  const index = cart.findIndex(
    (orderedItems)=>{
      return orderedItems.productID==productID
    }
  )

  if(index!=-1){    
    cart.splice(index,1)
    saveCart(cart)
  }
}
