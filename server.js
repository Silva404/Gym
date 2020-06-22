// usando o express
const express = require('express')
const nunjucks = require('nunjucks')
const videos = require('./data')
const { query } = require('express')


// atrelando o express a bind
const server = express()

server.use(express.static('public'))

// parametros('view engine', 'ja diz qual o tipo do meu arquivo')
server.set('view engine', 'njk')


//configuração do nunjucks pra usar o express como servidor
nunjucks.configure('views', {
    express: server,
    noCache: true,
    autoescape: false
})


0
// renderizar minhas paginas html e dar um dominio a elas
server.get('/', (req, res) => {
    const data = {
        name: 'Breno Silva',
        role: 'Estudante - Rockeseat',
        description: `Programador fullstack, focado em ampliar o conhecimento.
            <br>
            Colaborador da
            <a href="https://rockeseat.com" target="_blank">Rockeseat</a>`,
        links: [
            { name: 'Github', url: 'https://github.com/Silva404' },
            { name: 'Linkedin', url: 'https://www.linkedin.com/in/breno-silva-3604461a5/' }
        ]
    }
    res.render('home', { data })
})

server.get('/portfolio', (req, res) => {
    res.render('portfolio', { items: videos })
})

server.get('/about', (req, res) => {
    const data = {
        imgUrl: 'https://camo.githubusercontent.com/268b1344409fac98c4eeda520482b6910c4ddcba/68747470733a2f2f73746f726167652e676f6f676c65617069732e636f6d2f676f6c64656e2d77696e642f626f6f7463616d702d6c61756e6368626173652f6c6f676f2e706e67',
        name: 'Breno Silva',
        role: 'Estudante - Rockeseat',
        description: 'Levando você do zero a júnior em tempo recorde, <br> venha já embarcar nesse foguete e atinga o próximo nível',
        links: [
            { name: 'Github', url: 'https://github.com/Silva404' },
            { name: 'Linkedin', url: 'https://www.linkedin.com/in/breno-silva-3604461a5/' }
        ]
    }

    res.render('about', { data })
})



server.get('/video', (req, res) => {
    const id = req.query.id

    const video = videos.find(video => { return video.id == id })

    // if (!video) {
    //     return res.send('Não foi possível achar seu arquivo.')
    // }

    return res.render('video', { item: video })
})

server.get("/courses/:id", function (req, res) {
    const id = req.params.id;

    return res.send(`O id fornecido na rota é: ${id}`);
});


// escutando a porta do servidor
server.listen(4000, () => {
    console.log('Servidor ligado!')
})