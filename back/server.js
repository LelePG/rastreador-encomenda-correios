const express = require('express')
const app = express()
const port = 3000
app.use(express.static('../front'))// provê para a aplicação todos os arquivos estáticos no diretório .
app.get('/teste', (req, res) => {
  res.send('Tô funcionando!')
})

app.listen(port, () => {
  console.log(`Acesse http://localhost:${port}`)
})