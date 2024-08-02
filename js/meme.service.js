'use strict'

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: []
}
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}


function getMeme(imgIdx = 0) {
    return gImgs[imgIdx]
}

function setLineTxt(txt) {
    gMeme.lines.push({
        txt,
        size: 20,
        color: 'white'
    })
}