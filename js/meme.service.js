'use strict'
let gMeme

const gPrefs = {
	font: { size: 40, family: 'workSans' },
	strokeStyle: '#0b0a0a',
	fillStyle: '#ffffff',
}
const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
const gSentences = ['When you realize it’s Monday tomorrow.',
					'Me trying to adult: fails miserably.',
					'That moment when you finally understand the joke.',
					'When you see your crush and forget how to act normal.',
					'Me: has a plan Life: laughs.',
					'When you accidentally open the front camera.',
					'When you’re trying to be healthy but pizza exists.',
					'When you realize you’ve been talking for 30 minutes and no one was listening.',
					'When you find out your favorite show got canceled.',
					'When you’re trying to save money but there’s a sale.'
				]

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

function getCurrLineSize() {
	const { lines, selectedLineIdx } = gMeme
	
	if(!lines[selectedLineIdx]) return gPrefs.font.size
	return lines[selectedLineIdx].font.size
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

	_saveCurrMeme()

	if (selectedLineIdx >= 0) return lines[selectedLineIdx].txt
}

function dragLine(currPos, prevPos) {
	const { lines, selectedLineIdx} = gMeme
	if (!lines[selectedLineIdx]) return
	
	const { linePos } = lines[selectedLineIdx]
	const mouseDistance = { x: currPos.x - prevPos.x, y: currPos.y - prevPos.y }

	linePos.x += mouseDistance.x
	linePos.y += mouseDistance.y

	_saveCurrMeme()
}

function moveLine(ev) {
	const { lines, selectedLineIdx} = gMeme
	if (!lines[selectedLineIdx]) return
	
	const { linePos } = lines[selectedLineIdx]
	const step = 5

	switch (ev.key) {
		case 'ArrowUp':
			linePos.y -= step
			break;
		
		case 'ArrowDown':
			linePos.y += step
			break;

		case 'ArrowRight':
			linePos.x += step
			break;

		case 'ArrowLeft':
			linePos.x -= step
			break;
	}
	_saveCurrMeme()
}

function createRandMeme(imgId) {
	gMeme.selectedImgId = imgId
	gMeme.selectedLineIdx = 0

	gMeme.lines = [{
		txt: getRandLine(),
		strokeStyle: gPrefs.strokeStyle,
		fillStyle: gPrefs.fillStyle,
		font: { ...gPrefs.font, size: 20 },
		linePos: { x: 50, y: 100 }
	}]
}

function getRandLine() {
	return gSentences[getRandomInt(0, gSentences.length)]
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

function alignSelectedLine(alignDir, canvasWidth) {
	const { lines, selectedLineIdx } = gMeme
	const { linePos, txt } = lines[selectedLineIdx]
	const lineWidth = gCtx.measureText(txt).width
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
		else value ? lines[selectedLineIdx].font.size++ : lines[selectedLineIdx].font.size--
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
