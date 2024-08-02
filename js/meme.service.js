'use strict'

var gImgs = [ 
                { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['politicians', 'funny']},
                { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['animals', 'cute']}
            ]
            
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
