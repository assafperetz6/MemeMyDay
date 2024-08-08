'use strict'

const gImgs = [
    { id: 1, url: 'meme-imgs/meme-imgs (square)/1.jpg', keywords: ['politics', 'trump'] },
    { id: 2, url: 'meme-imgs/meme-imgs (square)/2.jpg', keywords: ['dog', 'animals'] },
    { id: 3, url: 'meme-imgs/meme-imgs (various aspect ratios)/drevil.jpg', keywords: ['funny', 'pop culture'] },
    { id: 4, url: 'meme-imgs/meme-imgs (square)/4.jpg', keywords: ['cute', 'cat'] },
    { id: 5, url: 'meme-imgs/meme-imgs (square)/5.jpg', keywords: ['baby', 'success'] },
    { id: 6, url: 'meme-imgs/meme-imgs (square)/6.jpg', keywords: ['funny', 'history'] },
    { id: 7, url: 'meme-imgs/meme-imgs (square)/7.jpg', keywords: ['funny', 'baby', 'surprising'] },
    { id: 8, url: 'meme-imgs/meme-imgs (square)/8.jpg', keywords: ['pop culture', 'quirky'] },
    { id: 9, url: 'meme-imgs/meme-imgs (square)/9.jpg', keywords: ['funny', 'baby'] },
]

const gSentences = [
	['When you realize it’s Monday tomorrow.'],
	['Me trying to adult:', 'fails miserably.'],
	['That moment when you', 'finally understand the joke.'],
	['When you see your crush', 'and forget how to act normal.'],
	['Me: has a plan', 'Life: laughs.'],
	['When you accidentally', 'open the front camera.'],
	['When you’re trying to be healthy', 'but pizza exists.'],
	['When you find out', 'your favorite show got canceled.'],
	['When you’re trying to save money', 'but there’s a sale.'],
]

const gKeywordSearchCountMap = { politics: 4, funny: 12, cat: 16, baby: 2, animals: 14 }