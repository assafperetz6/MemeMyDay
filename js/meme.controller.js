'use strict'
const gElCanvas = document.querySelector('.meme-editor canvas')
const gCtx = gElCanvas.getContext('2d')

function onInit() {
	renderGallery()
	addListeners(gElCanvas)
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

	elStrokeClr.value = lines[selectedLineIdx].strokeStyle
	elFillClr.value = lines[selectedLineIdx].fillStyle
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
	const elTxtInput = document.querySelector('.meme-editor .txt-input')

	elTxtInput.value = removeLine() || ''
	elTxtInput.focus()
	renderMeme()
}

// EDIT

function onSwitchTitleToEdit() {
	const elTxtInput = document.querySelector('.meme-editor .txt-input')
	const currValue = elTxtInput.value

	elTxtInput.value = switchTitleToEdit() || currValue
	renderMeme()
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
