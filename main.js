let cart = [];

const addButtons = document.querySelectorAll('.add');
const removeButtons = document.querySelectorAll('.remove');
const cartItemsContainer = document.getElementById('cartItems');
const totalElement = document.getElementById('total');
const cartContainer = document.getElementById('cart'); 
const closeBtn = document.querySelector('.close');

closeBtn.addEventListener('click', function() {
  cartContainer.style.display = 'none'; 
});

//aq vamatebt
addButtons.forEach(button => {
  button.addEventListener('click', function() {
    const name = this.getAttribute('data-name');
    const price = parseFloat(this.getAttribute('data-price'));
    const itemContainer = this.parentElement;
    const imageSrc = itemContainer.querySelector('img').src;


    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {

      existingItem.quantity += 1;
    } else {

      cart.push({ 
        name: name, 
        price: price, 
        image: imageSrc,
        quantity: 1 
      });
    }

    updateCart();
  });
});

//aq vshlit
removeButtons.forEach(button => {
  button.addEventListener('click', function() {
    const name = this.getAttribute('data-name');

   
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex !== -1) {
      if (cart[itemIndex].quantity > 1) {
       
        cart[itemIndex].quantity -= 1;
      } else {
        
        cart.splice(itemIndex, 1);
      }
      updateCart();
    }
  });
});

//kalatis gamochena washlaa
function updateCart() {
  
  if (cart.length > 0) {
    cartContainer.style.display = 'block'; 
  } else {
    cartContainer.style.display = 'none'; 
  }

  
  cartItemsContainer.innerHTML = '';
  
  let currentTotal = 0; 
  cart.forEach(product => {

    currentTotal += (product.price * product.quantity);

    const li = document.createElement('li');
    

  
    li.innerHTML = `
      <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
      <div style="flex-grow: 1;">
        <h4 style="margin: 0; font-size: 16px; display: flex; align-items: center; gap: 8px;">
          ${product.name} 
          <span style="background: #ff470f; color: white; padding: 2px 6px; border-radius: 10px; font-size: 12px;">x${product.quantity}</span>
        </h4>
        <span style="color: #555;">$${(product.price * product.quantity).toFixed(2)}</span>
      </div>
    `;

    cartItemsContainer.appendChild(li);
  });

  totalElement.innerText = `$${currentTotal.toFixed(2)}`;
}