'use strict'

const gImgs = [{ id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] }]
const gMeme = {
	selectedImgId: 1,
	selectedLineIdx: 0,
	lines: [
		{
			txt: 'I sometimes eat Falafel',
			size: 20,
			color: 'red',
		},
	],
}

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
    return gMeme
}

function getMemeImg() {
    return gImgs.find(({ id }) => id === gMeme.selectedImgId)
}