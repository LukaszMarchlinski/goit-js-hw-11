export { onScroll, onTopBtn };

const topBtn = document.querySelector('.btn-to-top');

window.addEventListener('scroll', onScroll);
topBtn.addEventListener('click', onTopBtn);

function onScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        topBtn.classList.add('btn-to-top-visible');
    }
     if (scrolled > coords) {
      topBtn.classList.remove('btn-to-top-visible');
     }
}

function onTopBtn() {
    if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
    }
}