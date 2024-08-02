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
        drawTxt()
    }
}

function drawTxt() {
    gCtx.font = '80px serif'
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 8
    gCtx.strokeText('Hi!', 100, 100)
    gCtx.fillText('Hi!', 100, 100)
}