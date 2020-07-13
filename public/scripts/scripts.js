const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')


for (let item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

// duas paginas a frente e duas paginas antes
// em casa de haver somente um pagina entre duas ultimas e a página limite
// mostrar também esse numero sem os pontinhos


let totalPages = 20,
    selectedPage = 5,
    pages = [],
    oldPage

for (let currentPage = 1; currentPage <= totalPages; currentPage++) {

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + 2
    const pagesBeforeSelectedPage = currentPage >= selectedPage - 2


    if (firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
       if (oldPage && currentPage - oldPage > 2) {
        pages.push('...')
       }

       if (oldPage && currentPage - oldPage == 2) {
           pages.push(oldPage + 1)
       }
       
        pages.push(currentPage)
        oldPage = currentPage
    }
}

console.log(pages)