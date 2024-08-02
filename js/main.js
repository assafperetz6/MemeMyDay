'use strict'

var gImgs = []
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'some text', // save and update txt while typing
            size: 20, // get font size from gCTX object
            color: 'red'
        }
    ]
}
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}

