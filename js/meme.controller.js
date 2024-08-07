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
    
	elGallery.addEventListener('click', toggleEditorGalley)
	window.addEventListener('resize', resizeCanvas)

    gElCanvas.addEventListener('mousedown', onSelectLine)
    gElCanvas.addEventListener('mousemove', onMoveLine)
    document.addEventListener('mouseup', onPlaceLine)

    gElCanvas.addEventListener('touchstart', onSelectLine)
    gElCanvas.addEventListener('touchmove', ev => {
        ev.preventDefault()
        onMoveLine(ev)
    })
    document.addEventListener('touchend', onPlaceLine)
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

    
	gCtx.font = `${size}px ${family}`
	gCtx.lineWidth = 2
	gCtx.strokeStyle = strokeStyle
	gCtx.fillStyle = fillStyle

	if (txt) {
		gCtx.strokeText(txt, x, y)
		gCtx.fillText(txt, x, y)
	} else if (isSelected) {
		gCtx.strokeText('Type something...', x, y)
		gCtx.fillText('Type something...', x, y)
	}

	if (isSelected) {
        const { width } = gCtx.measureText(txt || 'Type something...')

        drawRect({x, y, w: width, h: size, pad: 10})
	}
}

function drawRect({x, y, w, h, pad = 0, strokeStyle = 'black'}) {
	const prevStroke = gCtx.strokeStyle
	gCtx.strokeStyle = strokeStyle
	gCtx.strokeRect(x - pad, y - h, w + pad * 2, h + pad * 2)
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

    elTxtInput.value = txt || elTxtInput.value
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

function onSwitchTitleToEdit() {
	updateTxtInput(switchTitleToEdit())
	renderMeme()
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
    renderMeme()
}

function onMoveLine(ev) {
    if (!gMouseState.isDown) return
    let { offsetX: x, offsetY: y } = ev
    
    if (ev.type === 'touchmove') {
        const touchPos = getTouchPos(ev)
        x = touchPos.x
        y = touchPos.y
    }
    
    moveLine({x, y}, gMouseState.pos)
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

function onChangeFontSize(isIncreased) {
    changeFontSize(isIncreased)
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

// Download and share

function downloadImg(elLink) {
	const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
	elLink.href = imgContent
}
