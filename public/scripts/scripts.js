const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')


for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

let totalPages = 20,
    selectedPage = 6,
    pages = [],
    oldPage

// [1,...,13,14,15,16,17,...,20]


for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterCurrentPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2
    if ( firstAndLastPage || pagesAfterCurrentPage && pagesBeforeSelectedPage ) {
        if (oldPage && currentPage - oldPage > 2) {
            pages.push('...')
        }

        if (oldPage && currentPage - oldPage == 2) {
            pages.push(currentPage - 1)
        }

        pages.push(currentPage)

        oldPage = currentPage
    }
}
console.log(pages) 