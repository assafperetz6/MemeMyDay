'use strict'

const gMeme = {
	selectedImgId: 3,
	selectedLineIdx: 0,
	lines: [
		{
			txt: 'I sometimes eat Falafel',
			size: 20,
			color: 'red',
		},
	],
    size: {}
}

const gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
    return gMeme
}

function getMemeImg() {
    return gImgs.find(({ id }) => id === gMeme.selectedImgId)
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function setMemeSize(size) {
    gMeme.size = size
}

function setLineTxt(txt, size, color, linePos) {
    gMeme.lines[0] = {...gMeme.lines[0], txt, size, color, linePos}
}