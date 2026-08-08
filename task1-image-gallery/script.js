const filterButtons = document.querySelectorAll('.filter-btn')
const galleryItems = document.querySelectorAll('.gallery-item')
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('selectedFilter');
    if (saved) {
        document.querySelector(`[data-filter="${saved}"]`)?.click();
    }
});
filterButtons.forEach(button => {

    button.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active')
        button.classList.add('active')
        const filterValue = button.getAttribute('data-filter')
        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category')
            localStorage.setItem('selectedFilter', filterValue);
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.style.display = 'block'
            }
            else {
                item.style.display = 'none'
            }
        })
    })
})

function getVisibleItems() {
    return Array.from(galleryItems).filter(item => item.style.display !== 'none');
}

galleryItems.forEach(item => {
    const img = item.querySelector('img');
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;

        const visibleItems = getVisibleItems();
        currentIndex = visibleItems.indexOf(item);
    });
});


closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

nextBtn.addEventListener('click', () => {
    const visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleItems.length;
    lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
});

prevBtn.addEventListener('click', () => {
    const visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return;
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
});