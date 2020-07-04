const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')


for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

let totalPages = 20,
    selectedPage = 15,
    pages = [],
    oldPage

// [1,...,13,14,15,16,17,...,20]

// const pagesAfterCurrentPage = currentPage >= selectedPage + 2
// const pagesBeforeSelectedPage = currentPage <= selectedPage - 2

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    if (currentPage = 1 || currentPage == 20) {
        pages.push(currentPage)
    }
}
console.log(pages)