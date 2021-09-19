const rastrojs = require('rastrojs')
const fs = require('fs')
const path = require("path");

fs.readFile(path.resolve(__dirname, "encomendas.txt"), 'utf-8', function (err, data) {
	if (err) {
		throw err
	}

	listaDeEncomendas = data.trim().split("\n")
	async function rastreioGeral(listaDeEncomendas) {
		listaDeEncomendas.forEach(async encomenda => {
			await rastrearEncomenda(encomenda)
		})
		console.log("Suas encomendas foram rastreadas!!")
	}
	rastreioGeral(listaDeEncomendas)
});

async function rastrearEncomenda(codigo) {
	let encomenda = await rastrojs.track(codigo);
	if (encomenda[0].isInvalid) {
		console.log(`O código ${encomenda[0].code} é inválido.`)
		return
	}
	const ultimoPontoRegistrado = encomenda[0].tracks.length - 1
	const ultimoRastreio = encomenda[0].tracks[ultimoPontoRegistrado]
	let resposta
	if (encomenda[0].isDelivered) {
		resposta = `O objeto de código ${encomenda[0].code} foi entregue. Parabéns.`
	} else {
		resposta = `O objeto de código ${encomenda[0].code} foi visto pela última vez em ${ultimoRastreio.locale} em ${ultimoRastreio.trackedAt.toLocaleString()}, com o status de ${ultimoRastreio.status}.`
	}
	console.log(resposta)
}
