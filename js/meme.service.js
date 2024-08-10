'use strict'
let gMeme

const gPrefs = {
	font: { size: 30, family: 'impact' },
	strokeStyle: '#0b0a0a',
	fillStyle: '#ffffff',
}

function loadMemeToEdit(savedMeme) {
	gMeme = savedMeme || loadFromStorage('memeToEdit') || createNewMeme()
	_saveCurrMeme()
}

function createNewMeme() {
	gMeme = {
		selectedImgId: 2,
		selectedLineIdx: 0,
		lines: [],
		size: {},
	}
}

function _saveCurrMeme() {
	saveToStorage('memeToEdit', gMeme)
}

function getMeme() {
	return gMeme
}

function getMemeImg() {
	return gImgs.find(({ id }) => id === gMeme.selectedImgId)
}

function getRandImg() {
    return gImgs[getRandomInt(0, gImgs.length)]
}

function setImg(imgId) {
	gMeme.selectedImgId = imgId

	_saveCurrMeme()
}

function setMemeSize(size) {
	gMeme.size = size

	_saveCurrMeme()
}

function setLineTxt(txt) {
	if (gMeme.lines.length < 1 || gMeme.selectedLineIdx < 0) addNewLine()

	const { lines, selectedLineIdx } = gMeme

	if (selectedLineIdx < 0) lines.at(-1).txt = txt
	else lines[selectedLineIdx].txt = txt

	_saveCurrMeme()
}

function getCurrLineTxt() {
	const { lines, selectedLineIdx } = gMeme
	return lines[selectedLineIdx].txt
}

function getCurrLineSize() {
	const { lines, selectedLineIdx } = gMeme

	if (!lines[selectedLineIdx]) return gPrefs.font.size
	return lines[selectedLineIdx].font.size
}

function getUserPrefs() {
	return gPrefs
}

function isHoverTitle(mousePos) {
	const { lines } = gMeme
	const hoveredTitle = lines.find(line => compareMousePosToTitle(mousePos, line))

	return hoveredTitle
}

function selectLine(mousePos) {
	const { lines } = gMeme
	const selectedLineIdx = lines.findIndex(line => compareMousePosToTitle(mousePos, line))

	gMeme.selectedLineIdx = selectedLineIdx

	_saveCurrMeme()

	if (selectedLineIdx >= 0) return lines[selectedLineIdx].txt
	else return null
}

function compareMousePosToTitle(mousePos, { linePos, txt, font }) {
	const pad = 10
	const lineWidth = getLineWidth(txt, font)

	return (
		mousePos.x >= linePos.x - pad &&
		mousePos.x <= linePos.x - pad + lineWidth + pad * 2 &&
		mousePos.y <= linePos.y + pad * 1.5 &&
		mousePos.y >= linePos.y - font.size - pad / 2
	)
}

function dragLine(currPos, prevPos) {
	const { lines, selectedLineIdx } = gMeme
	if (!lines[selectedLineIdx]) return

	const { linePos } = lines[selectedLineIdx]
	const mouseDistance = { x: currPos.x - prevPos.x, y: currPos.y - prevPos.y }

	linePos.x += mouseDistance.x
	linePos.y += mouseDistance.y

	_saveCurrMeme()
}

function moveLine(ev) {
	const { lines, selectedLineIdx } = gMeme
	if (!lines[selectedLineIdx]) return

	const { linePos } = lines[selectedLineIdx]
	const step = 5

	switch (ev.key) {
		case 'ArrowUp':
			linePos.y -= step
			break

		case 'ArrowDown':
			linePos.y += step
			break

		case 'ArrowRight':
			linePos.x += step
			break

		case 'ArrowLeft':
			linePos.x -= step
			break
	}
	_saveCurrMeme()
}

function createRandMeme(imgId) {
	gMeme.selectedImgId = imgId
	gMeme.selectedLineIdx = 0
	gMeme.lines = []

	let line = getRandLine()

	line.forEach((slice) => addNewLine(slice))
}

function getRandLine() {
	return gSentences[getRandomInt(0, gSentences.length)]
}

function getLineWidth(txt, font) {
	const { size, family } = font
	const prevFont = gCtx.font
	
	gCtx.font = `${size}px ${family}`
	const lineWidth = gCtx.measureText(txt).width
	
	gCtx.font = prevFont
	return lineWidth
}

// CRUD

// CREATE

function addNewLine(txt = 'Something') {
	const { font, strokeStyle, fillStyle } = gPrefs
	const { size, family } = font

	if (gMeme.lines >= 1) return

	let line = {
		txt,
		font: { size, family },
		strokeStyle,
		fillStyle,
		linePos: { x: 10, y: 100 },
	}
	gMeme.lines.push(line)

	if (gMeme.lines.length === 2) line.linePos = { x: 30, y: 350 }
	else if (gMeme.lines.length > 2) line.linePos = { x: 30, y: 250 }
	gMeme.selectedLineIdx = gMeme.lines.length - 1

	_saveCurrMeme()
	return line.txt
}

// REMOVE

function removeLine() {
	const lineIdx = gMeme.selectedLineIdx
	gMeme.lines.splice(lineIdx, 1)
	gMeme.selectedLineIdx = Math.max(0, lineIdx - 1)

	_saveCurrMeme()

	if (gMeme.lines.length < 1) return
	return gMeme.lines[gMeme.selectedLineIdx].txt
}

// EDIT

function alignSelectedLine(alignDir, canvasWidth) {
	const { lines, selectedLineIdx } = gMeme
	const { linePos, txt, font } = lines[selectedLineIdx]
	const lineWidth = getLineWidth(txt, font)
	const pad = 12
	switch (alignDir) {
		case 'left':
			linePos.x = pad
			break

		case 'center':
			linePos.x = canvasWidth / 2 - lineWidth / 2
			break

		case 'right':
			linePos.x = canvasWidth - lineWidth - pad
			break
	}
	_saveCurrMeme()
}

function changeFont(font) {
	const { lines, selectedLineIdx } = gMeme

	lines[selectedLineIdx].font.family = font

	_saveCurrMeme()
}

function changeFontSize(value) {
	const { lines, selectedLineIdx } = gMeme

	if (typeof value !== 'boolean') {
		if (!lines[selectedLineIdx]) gPrefs.font.size = +value
		else lines[selectedLineIdx].font.size = +value
	}
	else {
		if (!lines[selectedLineIdx]) value ? gPrefs.font.size++ : gPrefs.font.size--
		else
			value
				? lines[selectedLineIdx].font.size++
				: lines[selectedLineIdx].font.size--
	}
	_saveCurrMeme()
}

function setFillColor(color) {
	const { lines, selectedLineIdx } = gMeme

	lines[selectedLineIdx].fillStyle = `${color}`
	_saveCurrMeme()
}

function setStrokeColor(color) {
	const { lines, selectedLineIdx } = gMeme

	lines[selectedLineIdx].strokeStyle = `${color}`
	_saveCurrMeme()
}

function switchTitleToEdit() {
	if (gMeme.lines.length <= 1) return

	const { selectedLineIdx, lines } = gMeme
	if (!gMeme.lines[selectedLineIdx].txt) removeLine()
	gMeme.selectedLineIdx++

	if (gMeme.selectedLineIdx >= lines.length) gMeme.selectedLineIdx = 0

	return lines[gMeme.selectedLineIdx].txt
}