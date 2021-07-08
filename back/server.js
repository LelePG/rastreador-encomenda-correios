const express = require('express')
const app = express()
const port = 3000
app.use(express.static(__dirname+ '/../front'))// provê para a aplicação todos os arquivos estáticos no diretório .

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/encomendas', (req, res) => {
  for (codigo in req.query){
    console.log(codigo)
  }
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Acesse http://localhost:${port}`)
})