'use strict'
let gElCanvas
let gCtx


function paintCanvas() {
    gCtx.fillStyle = 'red'
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function renderMeme() {
    const meme = getMeme()
    
    drawImg(meme.url)
}

function drawImg(memeUrl) {
    const elImg = new Image()
    elImg.src = memeUrl
    
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    }
}

function onSetLineTxt() {
    const elTxtInput = document.querySelector('.txt-input')

    setLineTxt(elTxtInput.value)
}

function drawTxt(txt) {
    gCtx.font = '80px serif'
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 8

    gCtx.strokeText(txt, 100, 100)
    gCtx.fillText(txt, 100, 100)
}