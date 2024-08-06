'use strict'
let gMeme

const gPrefs = {
	font: { size: 40, family: 'workSans' },
	strokeStyle: '#0b0a0a',
	fillStyle: '#ffffff',
}
const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function loadMemeToEdit() {
	gMeme = loadFromStorage('memeToEdit') || {
		selectedImgId: 2,
		selectedLineIdx: 0,
		lines: [],
		size: {},
	}
	_saveCurrMeme()
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

function setImg(imgId) {
	gMeme.selectedImgId = imgId

	_saveCurrMeme()
}

function setMemeSize(size) {
	gMeme.size = size

	_saveCurrMeme()
}

function setLineTxt(txt) {
	if (gMeme.lines.length < 1) addNewLine()

	const { lines, selectedLineIdx } = gMeme

	lines[selectedLineIdx].txt = txt

	_saveCurrMeme()
}

function getCurrLineTxt() {
	const { lines, selectedLineIdx } = gMeme
	return lines[selectedLineIdx].txt
}

function getUserPrefs() {
	return gPrefs
}

function selectLine(mousePos) {
	const { lines } = gMeme
	const selectedLineIdx = lines.findIndex(({ txt, linePos, font }) => {
		const pad = 10
		const lineWidth = gCtx.measureText(txt).width

		return  mousePos.x >= linePos.x - pad &&
				mousePos.x <= linePos.x - pad + lineWidth + pad * 2 &&
				mousePos.y <= linePos.y + pad * 2 &&
				mousePos.y >= linePos.y - font.size
	})

	gMeme.selectedLineIdx = selectedLineIdx

	if (selectedLineIdx >= 0) return lines[selectedLineIdx].txt
}

function moveLine(currPos, prevPos) {
	const { lines, selectedLineIdx} = gMeme
	if (!lines[selectedLineIdx]) return
	
	const { linePos } = lines[selectedLineIdx]
	const mouseDistance = { x: currPos.x - prevPos.x, y: currPos.y - prevPos.y }

	linePos.x += mouseDistance.x
	linePos.y += mouseDistance.y
}

// CRUD

// CREATE

function addNewLine() {
	const { font, strokeStyle, fillStyle } = gPrefs
	if (gMeme.lines >= 1) return

	let line = {
		txt: 'Something',
		font,
		strokeStyle,
		fillStyle,
		linePos: { x: 50, y: 100 }
	}
	gMeme.lines.push(line)

	if (gMeme.lines.length === 2) line.linePos = { x: 50, y: 300 }
	else if (gMeme.lines.length > 2) line.linePos = { x: 50, y: 200 }
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

function changeFontSize(isIncreased) {
	const { lines, selectedLineIdx } = gMeme

	isIncreased ? lines[selectedLineIdx].font.size++ : lines[selectedLineIdx].font.size--

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
