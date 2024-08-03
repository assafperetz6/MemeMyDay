'use strict'
const gElCanvas = document.querySelector('.meme-editor canvas')
const gCtx = gElCanvas.getContext('2d')

function onInit() {
    resizeCanvas()
    renderMeme()
}

function addListeners() {
    window.addEventListener('resize', resizeCanvas)
}

function resizeCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elCanvasContainer.clientWidth
    gElCanvas.height = elCanvasContainer.clientHeight
}

function resizeCanvasToImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

    const { clientWidth, clientHeight } = gElCanvas
    setMemeSize({ clientWidth, clientHeight })
}

function renderMeme() {
    const meme = getMeme()
    const img = getMemeImg()

    drawImg(img.url)
}

function drawImg(imgUrl) {
    const img = new Image()
    img.src = imgUrl
    
    img.onload = () => {
        resizeCanvasToImg(img)

        gCtx.fillStyle = 'lightblue'
        gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}