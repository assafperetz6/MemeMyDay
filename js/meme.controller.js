'use strict'
let gElCanvas
let gCtx

function renderMeme(imgIdx) {
    const meme = getMeme(imgIdx)
    
    drawImg(meme.url)
}

function drawImg(memeUrl) {
    const elImg = new Image()
    elImg.src = memeUrl

    gMeme.elSelectedImg = elImg
    
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)

    elImg.onload = () => {
        resizeCanvas(elImg)
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    }
}

function onSetLineTxt() {
    const elTxtInput = document.querySelector('.txt-input')

    renderImg()
    setLineTxt(elTxtInput.value)
}