'use strict'
const gElCanvas = document.querySelector('.meme-editor canvas')
const gCtx = gElCanvas.getContext('2d')

function onInit() {
    resizeCanvas()
    renderMeme()
}

function resizeCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elCanvasContainer.clientWidth
    gElCanvas.height = elCanvasContainer.clientHeight
}

function resizeCanvasToImg(img) {
    const elCanvasContainer = document.querySelector('.canvas-container')

    elCanvasContainer.style.width = img.naturalWidth
    elCanvasContainer.style.height = img.naturalHeight

    resizeCanvas()
}

function renderMeme() {
    const meme = getMeme()
    const img = getMemeImg()

    drawImg(img.url)
}

function drawImg(imgUrl) {
    const img = new Image()
    img.src = imgUrl

    resizeCanvasToImg(img)
    img.onload = () => gCtx.drawImage(img, 0, 0)
}