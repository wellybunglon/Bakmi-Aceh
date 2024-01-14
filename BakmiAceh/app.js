document.addEventListener('alpine:init', () => {
    Alpine.data ('products', () => ({
        items: [
            {id: 1, name: 'Bakmie Aceh', img: '1.jpg', price:20000 },
            {id: 2, name: 'Nasi Goreng', img: '2.jpg', price:20000 },
        ],
    }));
    Alpine.data ('detail', () => ({
        items: [
            {id: 1, name: 'Welly han', img: '1.jpg', price:20000 },
            {id: 2, name: 'Firman', img: '2.jpg', price:20000 },
        ],
    }));

    Alpine.store('cart',{
        items:[],
        total: 0,
        quantity: 0,
        add(newItem) {
            // cek apakah ada barang yang sama di cart
            const cartItem = this.items.find((item) => item.id === newItem.id);

            // jika belum ada atau cart masih kosong
            if(!cartItem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price});
                this.quantity++;
                this.total += newItem.price;

            }
            else {
                // jika barangnya sudah ada cek apakah barang beda atau sama dengan yang ada di cart

                this.items = this.items.map((item) => {
                    
                    //jika barang berbeda

                    if(item.id !== newItem.id) {
                        return item;
                    } 
                    else {
                        //jika barang sudah ada tambah quantity dan totalnya
                        item.quantity++;
                        item.total = item.price * item.quantity;
                        this.quantity++;
                        this.total += item.price;
                        return item;
                    }
                });
            }
        },
        remove(id){
            // ambil item yang di remove berdasakan id nya
            const cartItem = this.items.find((item) => item.id === id);

            //jika item lebih dari 1
            if(cartItem.quantity > 1){
                //telusuri 1 1
                this.items = this.items.map((item) => {
                    // jika bukan barang di klik

                    if(item.id !== id){
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                })
            } else if (cartItem.quantity === 1) {
                //jika barangnya sisa 1

                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        }
    });

    Alpine.store('detail',{
        items:[],
        total: 0,
        quantity: 0,
        add(newItem) {
            console.log(newItem);
        },
       });
});





// Form Validation
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const form  = document.querySelector('#checkoutform');

form.addEventListener('keyup', function () {
    for(let i = 0; i < form.elements.lentgh; i++) {
        if(form.elements[i].value.length !== 0) {
            checkoutButton.classList.remove('disabled');
            checkoutButton.classList.add('disabled');
        } else {
            return false;
        }
    } 
    checkoutButton.disabled = false;
    checkoutButton.classList.remove('disabled');
});

//kirim data ketika tombol checkout diklik 
checkoutButton.addEventListener('click', async function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const objData = Object.fromEntries(data);
    const message = formatMessage(objData);
    window.open('http://wa.me/6285707540327?text=' + encodeURIComponent(message));

    // minta transaction token menggunakan ajax / fetch
    // try{
    //     const response = await fetch('php/placeOrder.php', {
    //         method: 'POST',
    //         body: data,
    //     });
    //     const token = await response.text();
    // } catch(err) {
    //     console.log(err.message);
    // }

    // console.log(token);
    // // window.snap.pay('');
});

// format pesan whatsapp
const formatMessage = (obj) => {
    return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    No.HP: ${obj.phone}
Data Pesanan
    ${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}
   TOTAL: ${rupiah(obj.total)} 
   Terima Kasih.`;
};

// konversi ke rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};
