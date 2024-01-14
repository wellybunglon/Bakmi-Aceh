// Toggle class active untuk bakmimenu
const navbarNav = document.querySelector

('.navbar-nav');
//ketika menu di klik//
document.querySelector('#bakmimenu').onclick = () => {
    navbarNav.classList.toggle('active');
};

//toggle class active untuk shopping cart
const shoppingCart = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart-button').onclick = (e) => {
    shoppingCart.classList.toggle('active');
    e.preventDefault();
}

// toggle class active untuk search form //
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');

document.querySelector('#search-button').onclick = (e) => {
    searchForm.classList.toggle('active');
    searchBox.focus();
    e.preventDefault();
};

// klik di luar element//
const bakmimenu = document.querySelector('#bakmimenu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.addEventListener('click', function(e){
    if(!bakmimenu.contains(e.target) && !navbarNav.contains(e.target)) {
         navbarNav.classList.remove('active');
    }
    if(!sb.contains(e.target) && !searchForm.contains(e.target)) {
         searchForm.classList.remove('active');
    }
    if(!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
         shoppingCart.classList.remove('active');
    }
})

// modal box
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');


itemDetailButtons.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal.style.display = 'flex';
        e.preventDefault();
    };
})

const itemDetailModal2 = document.querySelector('#item-detail-modal2');
const itemDetailButtons2 = document.querySelectorAll('.item-detail-button2');

itemDetailButtons2.forEach((btn) => {
    btn.onclick = (e) => {
        itemDetailModal2.style.display = 'flex';
        e.preventDefault();
    };
})


// Klik Tombol Close modal
document.querySelector('.modal .close-icon').onclick = (e) => {
    itemDetailModal.style.display = 'none';
    e.preventDefault();
};

document.querySelector('.modal2 .close-icon').onclick = (e) => {
    itemDetailModal2.style.display = 'none';
    e.preventDefault();
};

document.querySelector('.modal #close-detail').onclick = () => {
    itemDetailModal.style.display = 'none';
};

document.querySelector('.modal2 #close-detail').onclick = () => {
    itemDetailModal2.style.display = 'none';
};


//klik diluar modal
window.onclick = (e) =>{
    if (e.target === itemDetailModal) {
        itemDetailModal.style.display= 'none';
    }
};

window.onclick = (e) =>{
    if (e.target === itemDetailModal2) {
        itemDetailModal2.style.display= 'none';
    }
};
