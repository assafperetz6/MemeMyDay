'use strict'
let gElCanvas
let gCtx

function renderMeme(imgIdx) {
    const meme = getMeme(imgIdx)
    const elImg = createImg(meme.url)

    gMeme.elSelectedImg = elImg
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    elImg.onload = () => {
        resizeCanvas(elImg)
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    }
}

function renderImg() {
    const { elSelectedImg: img } = gMeme
    gCtx.drawImage(img, 0, 0, img.naturalHeight, img.naturalWidth)
}

function createImg(memeUrl) {
    const elImg = new Image()
    elImg.src = memeUrl

    return elImg
}

function onSetLineTxt() {
    const elTxtInput = document.querySelector('.txt-input')

    renderImg(createImg())
    setLineTxt(elTxtInput.value)
}

function setLineTxt(txt = 'Enter Text here') {
    gCtx.font = '80px serif'
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 8
    
    gCtx.strokeText(txt, 100, 100)
    gCtx.fillText(txt, 100, 100)
}