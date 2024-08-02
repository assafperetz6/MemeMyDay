'use strict'

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