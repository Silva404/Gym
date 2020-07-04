const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')


for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

let totalPages = 20,
    selectedPage = 5,
    pages = [],
    oldPage

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

    if (firstAndLastPage || pagesAfterSelectedPage && pagesBeforeSelectedPage) {
        if (oldPage && currentPage - oldPage > 2) {
            pages.push(currentPage)
        }

        oldPage = currentPage
    }
}

console.log(pages)  