'use strict'
let gMeme

const gPrefs = {
	font: '40px workSans',
	strokeStyle: 'black',
	fillStyle: 'white',
}
const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function loadMemeToEdit() {
	gMeme = loadFromStorage('memeToEdit') ||
    {
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
    if(gMeme.lines.length < 1) addNewLine()
	gMeme.lines[gMeme.selectedLineIdx].txt = txt

	_saveCurrMeme()
}

function getUserPrefs() {
	return gPrefs
}

// CRUDL

function addNewLine() {
	const { font, strokeStyle, fillStyle } = gPrefs
	if(gMeme.lines >= 1) return
	
	let line = {
		txt: '',
		font,
		strokeStyle,
		fillStyle,
		linePos: { x: 50, y: 100 },
	}
	gMeme.lines.push(line)

    if(gMeme.lines.length === 2) line.linePos = { x: 50, y: 300 }
    else if(gMeme.lines.length > 2) line.linePos = { x: 50, y: 200 }
    gMeme.selectedLineIdx = gMeme.lines.length - 1

    _saveCurrMeme()
    return line.txt
}

function removeLine() {
	const lineIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineIdx, 1)
    gMeme.selectedLineIdx = Math.max(0, lineIdx - 1)

    _saveCurrMeme()

    if(gMeme.lines.length < 1) return
    return gMeme.lines[gMeme.selectedLineIdx].txt
}

function switchTitleToEdit() {
    if(gMeme.lines.length <= 1) return

	const { selectedLineIdx, lines } = gMeme
	if(!gMeme.lines[selectedLineIdx].txt) removeLine()
    gMeme.selectedLineIdx++

    if(gMeme.selectedLineIdx >= lines.length) gMeme.selectedLineIdx = 0

    return lines[gMeme.selectedLineIdx].txt
}