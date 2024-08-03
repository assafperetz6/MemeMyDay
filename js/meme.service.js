'use strict'

const gImgs = [
    { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['funny', 'cat'] },
    { id: 3, url: 'meme-imgs/meme-imgs (various aspect ratios)/003.jpg', keywords: ['funny', 'cat'] }
]
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

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

function getMeme() {
    return gMeme
}

function getMemeImg() {
    return gImgs.find(({ id }) => id === gMeme.selectedImgId)
}

function setMemeSize(size) {
    gMeme.size = size
}