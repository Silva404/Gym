const formDelete = document.querySelector('#form-delete')
formDelete.addEventListener('submit', e => {
    const confirmation = confirm('Deseja realmente apagar seu perfil ?')

    if (!confirmation) {
        event.preventDefault()
    }
})