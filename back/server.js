const express = require('express')
const rastrojs = require('rastrojs')
const app = express()
const port = 3000
app.use(express.static(__dirname + '/../front'))// provê para a aplicação todos os arquivos estáticos no diretório .

app.get('/', (req, res) => {
  res.send('ok')
})


app.get('/encomendas', (req, res) => {
  async function rastrearEncomenda() {
    let respostaTotal = []
    for (codigo in req.query) {
      let encomenda = await rastrojs.track(codigo);
      if (encomenda[0].isInvalid) {
        respostaTotal.push(`O código ${encomenda[0].code} é inválido`)
        continue
      }
      let ultimoRastreio = encomenda[0].tracks[encomenda[0].tracks.length - 1]
      let textoResposta = `O objeto de código ${encomenda[0].code} foi visto pela última vez em ${ultimoRastreio.locale} em ${ultimoRastreio.trackedAt.toLocaleString()}, com o status de ${ultimoRastreio.status}.`
      respostaTotal.push(textoResposta)
      //console.log(textoResposta)    
    }
    return respostaTotal
  }

  rastrearEncomenda().then((respostaTotal) => {
    //res.json({a:respostaTotal})//IMPLEMENTAR
    res.send("ok")
  }
  )
})

app.listen(port, () => {
  console.log(`Acesse http://localhost:${port}`)
})