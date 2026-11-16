
let personagem = document.getElementById("refem")
let inimigo = document.getElementById("inimigo1")
let gameover = document.getElementById("gameover")
let fundo1 = document.getElementById("fundo1")
let fundo2 = document.getElementById("fundo2")
let item = document.getElementById("item")

let contador = 0
let textopontuacao = document.getElementById("pontuacao")
let botaoReiniciar = document.getElementById("reiniciar")
let botaoReiniciar2 = document.getElementById("reiniciar2")

let itemDisponivel = true
let jogoIniciado = false
let personagemEscolhido = 0
let tempoRestante = 10

function selecionarPersonagem(numero) {

    if (jogoIniciado) {
        return
    }

    personagemEscolhido = numero

    document.getElementById("opcao1").classList.remove("selecionado")
    document.getElementById("opcao2").classList.remove("selecionado")

    if (numero == 1) {

        personagem.src = "imagens/refem.gif"

        personagem.classList.remove("personagem-feminina")

        document.getElementById("opcao1").classList.add("selecionado")

    } else {

        personagem.src = "imagens/refemF.gif"

        personagem.classList.add("personagem-feminina")

        document.getElementById("opcao2").classList.add("selecionado")

    }

    document.getElementById("mensagem").innerHTML = "PERSONAGEM SELECIONADO"
}

function iniciarJogo() {

    if (personagemEscolhido == 0 || jogoIniciado) {
        return
    }

    jogoIniciado = true

    document.getElementById("lobby").style.display = "none"

    personagem.style.display = "block"

    fundo1.style.animation = "moverFundo 55s linear infinite"
    fundo2.style.animation = "moverFundo2 55s linear infinite"

    inimigo.style.animation = "animacaoInimigo 2s infinite linear"

    item.style.animation = "animacaoItem 3s infinite linear"
}

function pular() {

    if (!jogoIniciado) {
        return
    }

    if (personagem.classList.contains("pulo")) {
        return
    }

    personagem.classList.add("pulo")

    setTimeout(function() {
        personagem.classList.remove("pulo")
    }, 500)
}

document.addEventListener("keydown", function(event) {

    if (!jogoIniciado) {

        if (event.key === "1") {
            selecionarPersonagem(1)
        }

        if (event.key === "2") {
            selecionarPersonagem(2)
        }

        if (event.key === "Enter") {
            iniciarJogo()
        }

    } else {

        if (event.code === "Space") {

            event.preventDefault()

            pular()
        }
    }
})

let colisao = setInterval(function() {

    if (!jogoIniciado) {
        return
    }

    let posInimigo = inimigo.offsetLeft
    let posPersonagem = personagem.offsetTop

    if (posInimigo > 0 && posInimigo <= 120 && posPersonagem > 280) {

        jogoIniciado = false

        gameover.style.visibility = "visible"
        botaoReiniciar.style.visibility = "visible"

        inimigo.style.animation = "none"
        inimigo.style.left = posInimigo + "px"

        personagem.classList.remove("pulo")
        personagem.style.animationPlayState = "paused"
        personagem.style.top = posPersonagem + "px"

        item.style.animation = "none"

        fundo1.style.animationPlayState = "paused"
        fundo2.style.animationPlayState = "paused"

        if (personagemEscolhido == 1) {

            personagem.src = "imagens/perdeu.png"

        } else {

            personagem.src = "imagens/refemF_nocauteada.png"

        }

        personagem.style.width = "300px"

        clearInterval(temporizador)
        clearInterval(colisao)
        clearInterval(colisaoitem)
    }

}, 10)

let colisaoitem = setInterval(function() {

    if (!jogoIniciado) {
        return
    }

    if (
        personagem.offsetLeft + personagem.offsetWidth > item.offsetLeft &&
        personagem.offsetLeft < item.offsetLeft + item.offsetWidth &&
        personagem.offsetTop + personagem.offsetHeight > item.offsetTop &&
        personagem.offsetTop < item.offsetTop + item.offsetHeight &&
        itemDisponivel
    ) {

        contador++

        textopontuacao.innerHTML = `Pontos: ${contador}`

        itemDisponivel = false

        item.style.animation = "none"
        item.style.visibility = "hidden"

        setTimeout(function() {

            if (!jogoIniciado) {
                return
            }

            item.style.animation = "animacaoItem 3s infinite linear"

            item.style.visibility = "visible"

            itemDisponivel = true

        }, 10)
    }

}, 10)

function reiniciarJogo() {

    location.reload()
}

let temporizador = setInterval(function() {

    if (!jogoIniciado) {
        return
    }

    tempoRestante--

    document.getElementById("tempo").innerHTML =
        `Tempo: ${tempoRestante}`

    if (tempoRestante <= 0) {

        jogoIniciado = false

        clearInterval(temporizador)
        clearInterval(colisao)
        clearInterval(colisaoitem)

        personagem.style.visibility = "hidden"
        inimigo.style.visibility = "hidden"
        item.style.visibility = "hidden"

        fundo1.style.animationPlayState = "paused"
        fundo2.style.animationPlayState = "paused"

        textopontuacao.style.visibility = "hidden"

        let tempo = document.getElementById("tempo")

        tempo.style.visibility = "hidden"

        document.getElementById("final").style.visibility = "visible"

        document.getElementById("pontuacaofinal").innerHTML =
            `Pontuação final: ${contador}`

        botaoReiniciar2.style.visibility = "visible"
    }

}, 1000)

console.log("Topo do inimigo:", inimigo.offsetTop)
console.log("Topo do personagem:", personagem.offsetTop)
console.log("Altura do personagem:", personagem.offsetHeight)
console.log("Altura do inimigo:", inimigo.offsetHeight)
console.log("Altura do item:", item.offsetHeight)
