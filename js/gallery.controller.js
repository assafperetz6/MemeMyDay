'use strict'

function renderGallery() {
    const imgs = getImgs()
    const htmlStrs = imgs.map(({ url, id }) => `<img src="${url}" alt="" onclick="onImgSelect(${id})"></img>`).join('')
    const elGallery = document.querySelector('.gallery')

    elGallery.innerHTML = htmlStrs
}

function onShowSavedMemes() {
    renderSavedMemes()
    showGallery(true)
}

function renderSavedMemes() {
    const savedMemes = loadSavedMemes() || []
    const htmlStrs = savedMemes.map(({ memeThumbnail }, idx) => `<img src="${memeThumbnail}" alt="" onclick="onRenderSavedMeme(${idx})"></img>`).join('')
    const elGallery = document.querySelector('.gallery')

    elGallery.innerHTML = htmlStrs || '<h2>There are currently no saved memes</h2>'

    if (elGallery.classList.contains('hidden')) showGallery()
}

function onRenderSavedMeme(idx) {
    const savedMemes = loadSavedMemes()

    loadMemeToEdit(savedMemes[idx].gMeme)
    renderMeme()
}

function onImgSelect(imgId) {
    createNewMeme()
    setImg(imgId)
    renderMeme()
}

function showGallery(isSavedMemes) {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.meme-editor')
    
    if (!isSavedMemes) renderGallery()
    
    elGallery.classList.remove('hidden')
    elEditor.classList.add('hidden')
}

function showMemeEditor() {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.meme-editor')

    elEditor.classList.remove('hidden')
    elGallery.classList.add('hidden')
}

function onGenerateRandMeme() {
    const { id } = getRandImg()

    setImg(id)
    createRandMeme(id)
    renderMeme()
    showMemeEditor()
}