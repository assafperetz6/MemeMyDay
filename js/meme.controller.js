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
    // strokeText()
}

function drawImg(imgUrl) {
    const img = new Image()
    img.src = imgUrl
    
    if(img.complete) {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    else {
        img.onload = () => {
            resizeCanvasToImg(img)
            gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        }
    }
}

function onSetLineTxt(txt) {
    let txtWidth = gCtx.measureText(txt).width
    setLineTxt(txt, gCtx.font, gCtx.fillStyle, { x: 100, y: 100, width: txtWidth })
    renderMeme()
    gCtx.fillStyle = 'White'
    gCtx.font = "50px sans-serif";
    gCtx.strokeText(txt, 100, 100)
    gCtx.fillText(txt, 100, 100)
}

