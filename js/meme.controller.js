'use strict'
const gElCanvas = document.querySelector('.meme-editor canvas')
const gCtx = gElCanvas.getContext('2d')

function onInit() {
    renderGallery()
    addListeners()
    loadMemeToEdit()
    setInitCtxPrefs()
    resizeCanvas()
}

function addListeners() {
    const elGallery = document.querySelector('.gallery')

    window.addEventListener('resize', resizeCanvas)
    elGallery.addEventListener('click', toggleEditorGalley)
}

function setInitCtxPrefs() {
    const { font, strokeStyle, fillStyle } = getUserPrefs()
    gCtx.font = font
    gCtx.strokeStyle = strokeStyle
    gCtx.fillStyle = fillStyle
}

function onToggleMenu() {
    const elMainMenu = document.querySelector('body')

    elMainMenu.classList.toggle('menu-open')
}

function resizeCanvas() {
    const elEditor = document.querySelector('.meme-editor')
    if (elEditor.classList.contains('hidden')) return

    const elCanvasContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elCanvasContainer.clientWidth
    gElCanvas.height = elCanvasContainer.clientHeight

    renderMeme()
}

function resizeCanvasToImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width

    const { clientWidth, clientHeight } = gElCanvas
    setMemeSize({ clientWidth, clientHeight })
}

function renderMeme() {
    const img = getMemeImg()

    drawImg(img.url)
    renderLines()
}

function drawImg(imgUrl) {
    const img = new Image()
    img.src = imgUrl
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onSetLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function renderLines() {
    const { lines, selectedLineIdx } = getMeme()

    if(lines.length < 1) return
    
    lines.forEach(({ txt, font, strokeStyle, fillStyle, linePos }, idx) => {
        const { x, y } = linePos
        gCtx.font = font
        gCtx.lineWidth = 2
        gCtx.strokeStyle = strokeStyle
        gCtx.fillStyle = fillStyle
        gCtx.strokeText(txt, x, y)
        gCtx.fillText(txt, x, y)

        addTxtPlaceholder(lines, selectedLineIdx, linePos)
        
        if(idx === selectedLineIdx) {
            gCtx.strokeRect(x - 10, y - 40, gCtx.measureText(txt || 'Type something...').width + 20, 60)
        }
    })
}

function addTxtPlaceholder(lines, selectedLineIdx) {
    const { x, y } = lines[selectedLineIdx].linePos

    
    if(!lines[selectedLineIdx].txt) {
        gCtx.strokeText('Type something...', x, y)
        gCtx.fillText('Type something...', x, y)
    }
}

// CRUDL

function onAddNewLine() {
    const elTxtInput = document.querySelector('.txt-input')

    elTxtInput.value = addNewLine()
    renderMeme()
    elTxtInput.focus()

}

function onRemoveLine() {
    const elTxtInput = document.querySelector('.txt-input')

    elTxtInput.value = removeLine() || ''
    elTxtInput.focus()
    renderMeme()
}

function onSwitchTitleToEdit() {
    const elTxtInput = document.querySelector('.txt-input')
    const currValue = elTxtInput.value

    elTxtInput.value = switchTitleToEdit() || currValue

    renderMeme()
}