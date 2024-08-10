'use strict'
const gElCanvas = document.querySelector('.meme-editor canvas')
const gCtx = gElCanvas.getContext('2d')

const gMouseState = { isDown: false, pos: { x: null, y: null } }

function onInit() {
	renderGallery()
	addListeners(gElCanvas)
	loadMemeToEdit()
	setInitCtxPrefs()
	resizeCanvas()
}

function addListeners() {
	const elGallery = document.querySelector('.gallery')
    
	elGallery.addEventListener('click', ev => {
        if (ev.target.tagName == 'IMG') showMemeEditor()
    })

	window.addEventListener('resize', resizeCanvas)

    gElCanvas.addEventListener('mousemove', onHoverOverTitle)
    gElCanvas.addEventListener('mousedown', onSelectLine)
    gElCanvas.addEventListener('mousemove', onDragLine)
    document.addEventListener('mouseup', onPlaceLine)

    gElCanvas.addEventListener('touchstart', onSelectLine)
    gElCanvas.addEventListener('touchmove', ev => {
        ev.preventDefault()
        onDragLine(ev)
    })
    document.addEventListener('touchend', onPlaceLine)

    document.addEventListener('keydown', (ev) => {
        const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
        const elTxtInput = document.querySelector('.meme-editor .txt-input')
        if (!arrowKeys.includes(ev.key) || document.activeElement === elTxtInput) return

        ev.preventDefault()
        onMoveLine(ev)
    })
    
    const elShareBtn = document.querySelector('.share')
    elShareBtn.addEventListener("click", async () => {

        try {
            await navigator.share({
                title: 'test',
                text: 'This is a test share',
                url: 'https://www.google.com/'
            })
            showUserMsg('Meme shared succesfully!')
        } catch (err) {
            showUserMsg(`Error: ${err}`)
        }
    })
}

function setInitCtxPrefs() {
	const { font, strokeStyle, fillStyle } = getUserPrefs()
	const { size, family } = font

	gCtx.font = `${size}px ${family}`
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
	setCurrColors()
}

function drawImg(imgUrl) {
	const elImg = new Image()
	elImg.src = imgUrl

    if (elImg.complete) {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
    else {
        elImg.onload = () => {
            gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
            gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
            renderMeme()
        }
    }
}

function onSetLineTxt(txt) {
	setLineTxt(txt)
	renderMeme()
}

function renderLines() {
	const { lines, selectedLineIdx } = getMeme()

	if (lines.length < 1) return

	lines.forEach((line, idx) => renderLine(line, idx === selectedLineIdx))
}

function renderLine(line, isSelected) {
	const { txt, font, strokeStyle, fillStyle, linePos } = line
	const { x, y } = linePos
	const { size, family } = font
    const { width: canvasWidth } = gElCanvas
    
	gCtx.font = `${size}px ${family}`
	gCtx.lineWidth = 2
	gCtx.strokeStyle = strokeStyle
	gCtx.fillStyle = fillStyle

	if (txt) {
		gCtx.strokeText(txt, x, y, canvasWidth)
		gCtx.fillText(txt, x, y, canvasWidth)
	} else if (isSelected) {
		gCtx.strokeText('Type something...', x, y, canvasWidth)
		gCtx.fillText('Type something...', x, y, canvasWidth)
	}

	if (isSelected) {
        const { width } = gCtx.measureText(txt || 'Type something...')

        drawRect({x, y, w: width, h: size, pad: 10})
	}
}

function drawRect({x, y, w, h, pad = 0, strokeStyle = 'black'}) {
	const prevStroke = gCtx.strokeStyle
	gCtx.strokeStyle = strokeStyle
	gCtx.strokeRect(x - pad, y - h - pad / 2, w + pad * 2, h + pad * 2)
	gCtx.strokeStyle = prevStroke
}

function setCurrColors() {
	const elStrokeClr = document.querySelector('.stroke-color')
	const elFillClr = document.querySelector('.fill-color')
	const { lines, selectedLineIdx } = getMeme()

	if (lines.length < 1) return

	elStrokeClr.value = lines[selectedLineIdx]?.strokeStyle || '#000000'
	elFillClr.value = lines[selectedLineIdx]?.fillStyle || '#ffffff'
}

function updateTxtInput(txt) {
    const elTxtInput = document.querySelector('.meme-editor .txt-input')

    elTxtInput.value = txt || ''
}

function updateCurrFontSize() {
    const elfontSizeInput = document.querySelector('.txt-input.font-size-input')

    elfontSizeInput.value = getCurrLineSize()
}

// CRUD

// CREATE

function onAddNewLine() {
	const elTxtInput = document.querySelector('.meme-editor .txt-input')

	elTxtInput.value = addNewLine()
	renderMeme()
	elTxtInput.focus()
}

// DELETE

function onRemoveLine() {
	updateTxtInput(removeLine() || '')
	renderMeme()
}

// EDIT

function onAlign(alignDir) {
    alignSelectedLine(alignDir, gElCanvas.clientWidth)
    renderMeme()
}

function onSwitchTitleToEdit() {
	updateTxtInput(switchTitleToEdit())
	renderMeme()
}

function onHoverOverTitle(ev) {
    const elCanvasContainer = document.querySelector('.canvas-container')
    let { offsetX: x, offsetY: y } = ev

    if (isHoverTitle({ x, y })) elCanvasContainer.style.cursor = 'pointer'
    else elCanvasContainer.style.cursor = 'default'
}

function onSelectLine(ev) {
    
    let { offsetX: x, offsetY: y } = ev
    gMouseState.isDown = true

    if (ev.type === 'touchstart') {
        const touchPos = getTouchPos(ev)
        x = touchPos.x
        y = touchPos.y
    }

    gMouseState.pos = { x, y }

    updateTxtInput(selectLine({ x, y }))
    updateCurrFontSize()
    renderMeme()
}

function onDragLine(ev) {
    if (!gMouseState.isDown) return
    let { offsetX: x, offsetY: y } = ev
    
    if (ev.type === 'touchmove') {
        const touchPos = getTouchPos(ev)
        x = touchPos.x
        y = touchPos.y
    }
    
    dragLine({x, y}, gMouseState.pos)
    gMouseState.pos = { x, y }
    renderMeme()
}

function getTouchPos(ev) {
    const { scrollX, scrollY } = window
    const { left, top } = gElCanvas.getBoundingClientRect()
    const calcPosX = ev.touches[0].clientX - (scrollX + left)
    const calcPosY = ev.touches[0].clientY - (scrollY + top)
    const touchPos = { x: calcPosX, y: calcPosY}
    
    return touchPos
}

function onPlaceLine() {
    gMouseState.isDown = false
    gMouseState.pos = { x: null, y: null }
}

function onMoveLine(ev) {
    moveLine(ev)
    renderMeme()
}

function onChangeFont(font) {
    changeFont(font)
    renderMeme()
}

function onChangeFontSize(value) {
    changeFontSize(value)
    updateCurrFontSize()
	renderMeme()
}

function onSetFillColor(color) {
	setFillColor(color)
	renderMeme()
}

function onSetStrokeColor(color) {
	setStrokeColor(color)
	renderMeme()
}

//_____________________________

// Save, Download and share

function downloadImg(elLink) {
	const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
	elLink.href = imgContent
}

function onSaveMeme() {
    const thumbnail = gElCanvas.toDataURL('image/png')

    saveMeme(thumbnail)
    showUserMsg()
}

function showUserMsg(msg = 'Meme saved') {
    const elUserMsg = document.querySelector('.user-msg')

    elUserMsg.innerHTML = msg


    elUserMsg.style.visibility = 'visible'
    elUserMsg.style.opacity = 1
    
    setTimeout(() => elUserMsg.style.opacity = 0, 1500)
    setTimeout(() => elUserMsg.style.visibility = 'hidden', 2000)
}