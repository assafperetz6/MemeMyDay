'use strict'

var gImgs = [ 
    { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['politicians', 'funny']},
    { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['animals', 'cute']},
    { id: 3, url: 'meme-imgs/meme-imgs (various aspect ratios)/drevil.jpg', keywords: ['character', 'funny']},
    { id: 4, url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: ['character', 'funny']},
    { id: 5, url: 'meme-imgs/meme-imgs (various aspect ratios)/5.jpg', keywords: ['character', 'funny']},
    { id: 6, url: 'meme-imgs/meme-imgs (square)/6.jpg', keywords: ['character', 'funny']},
    { id: 7, url: 'meme-imgs/meme-imgs (square)/7.jpg', keywords: ['character', 'funny']},
    { id: 8, url: 'meme-imgs/meme-imgs (square)/8.jpg', keywords: ['character', 'funny']},
    { id: 9, url: 'meme-imgs/meme-imgs (square)/9.jpg', keywords: ['character', 'funny']},
    { id: 10, url: 'meme-imgs/meme-imgs (square)/10.jpg', keywords: ['character', 'funny']},
    { id: 11, url: 'meme-imgs/meme-imgs (square)/11.jpg', keywords: ['character', 'funny']},
    { id: 12, url: 'meme-imgs/meme-imgs (square)/12.jpg', keywords: ['character', 'funny']},
    { id: 13, url: 'meme-imgs/meme-imgs (square)/13.jpg', keywords: ['character', 'funny']},
    { id: 14, url: 'meme-imgs/meme-imgs (square)/14.jpg', keywords: ['character', 'funny']},
    { id: 15, url: 'meme-imgs/meme-imgs (square)/15.jpg', keywords: ['character', 'funny']},
    { id: 16, url: 'meme-imgs/meme-imgs (square)/16.jpg', keywords: ['character', 'funny']},
    { id: 17, url: 'meme-imgs/meme-imgs (square)/17.jpg', keywords: ['character', 'funny']},
    { id: 18, url: 'meme-imgs/meme-imgs (square)/18.jpg', keywords: ['character', 'funny']}
]



var gMeme = {
    elSelectedImg: null,
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        { txt: ''}
    ]
}
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}


function getImgs() {
    return gImgs
}

function getMeme(imgIdx = 0) {
    return gImgs[imgIdx]
}

function loadMeme(imgIdx) {
    const img = gImgs.find(({ id }) => id === imgIdx)
    gMeme.elSelectedImg = img
}

function renderImg() {
    const { elSelectedImg: img } = gMeme
    gCtx.drawImage(img, 0, 0, img.naturalHeight, img.naturalWidth)
}

function setLineTxt(txt = 'Enter Text here') {
    gCtx.font = '80px serif'
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 8
    
    gCtx.strokeText(txt, 100, 100)
    gCtx.fillText(txt, 100, 100)
}