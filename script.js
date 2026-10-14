const itemInput = document.getElementById('item-input');
const priceInput = document.getElementById('price-input');
const addBtn = document.getElementById('add-btn');
const shoppingList = document.getElementById('shopping-list');
const clearBtn = document.getElementById('clear-btn');

let items = JSON.parse(localStorage.getItem('shoppingItems')) || [];

function saveItems() {
    localStorage.setItem('shoppingItems', JSON.stringify(items));
}

function render() {
    shoppingList.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('item-card');
        if (item.purchased) {
            li.classList.add('purchased');
        }

        const label = document.createElement('label');
        label.classList.add('purchase-label');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.purchased;
        checkbox.dataset.id = item.id;
        
        checkbox.addEventListener('change', () => {
            item.purchased = checkbox.checked;
            saveItems();
            render();
        });

        const labelText = document.createTextNode(` ${item.name} - Ksh ${item.price}`);
        
        label.appendChild(checkbox);
        label.appendChild(labelText);

        const editBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        editBtn.textContent = 'Edit';
        
        editBtn.addEventListener('click', () => {
            const newName = prompt('Edit item name:', item.name);
            const newPrice = prompt('Edit price (Ksh):', item.price);
            
            if (newName !== null && newName.trim() !== '') {
                item.name = newName.trim();
            }
            if (newPrice !== null && newPrice.trim() !== '') {
                item.price = newPrice.trim();
            }
            saveItems();
            render();
        });

        li.appendChild(label);
        li.appendChild(editBtn);

        shoppingList.appendChild(li);
    });
}

function addItem() {
    const name = itemInput.value.trim();
    const priceStr = priceInput.value.trim();

    if (name === '' || priceStr === '') {
        return; 
    }

    const newItem = {
        id: Date.now().toString(),
        name: name,
        price: priceStr,
        purchased: false
    };

    items.push(newItem);
    saveItems();
    render();

    itemInput.value = '';
    priceInput.value = '';
    itemInput.focus();
}

function clearList() {
    items = [];
    saveItems();
    render();
}

addBtn.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);

render();