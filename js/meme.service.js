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
	gMeme.lines[gMeme.selectedLineIdx].txt = txt

	_saveCurrMeme()
}

function getUserPrefs() {
	return gPrefs
}

// CRUD

// CREATE

function addNewLine() {
	const { font, strokeStyle, fillStyle } = gPrefs
	if (gMeme.lines >= 1) return

	let line = {
		txt: '',
		font,
		strokeStyle,
		fillStyle,
		linePos: { x: 50, y: 100 },
		scale: null,
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
