'use strict'

var gImgs = [ 
                { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['politicians', 'funny']},
                { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['animals', 'cute']},
                { id: 3, url: 'meme-imgs/meme-imgs (various aspect ratios)/drevil.jpg', keywords: ['character', 'funny']}
            ]

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}


function getMeme() {
    return gImgs[0]
}

function setLineTxt(txt) {
    gMeme.lines.push({
        txt,
        size: 20,
        color: 'white'
    })
}