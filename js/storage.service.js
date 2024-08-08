'use strict'

function loadFromStorage(key) {
    const valueStr = localStorage.getItem(key)
    return JSON.parse(valueStr)
}

function saveToStorage(key, value) {
    const valueStr = JSON.stringify(value)
    localStorage.setItem(key, valueStr)
}

function saveMeme(memeThumbnail) {
	let savedMemes = loadFromStorage('savedMemes') || []
	
	savedMemes.push({gMeme, memeThumbnail})
	saveToStorage('savedMemes', savedMemes)
}

function loadSavedMemes() {
	return loadFromStorage('savedMemes')
}