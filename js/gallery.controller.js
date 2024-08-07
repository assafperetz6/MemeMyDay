'use strict'

function renderGallery() {
    const imgs = getImgs()
    const htmlStrs = imgs.map(({ url, id }) => `<img src="${url}" alt="" onclick="onImgSelect(${id})"></img>`).join('')
    
    const elGallery = document.querySelector('.gallery')

    elGallery.innerHTML = htmlStrs
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
}

function toggleEditorGalley() {
    const elGallery = document.querySelector('.gallery-container')
    const elEditor = document.querySelector('.meme-editor')

    elGallery.classList.toggle('hidden')
    elEditor.classList.toggle('hidden')
}

function onGenerateRandMeme() {
    // debugger
    const { id } = getRandImg()

    setImg(id)
    createRandMeme(id)
    renderMeme()
    toggleEditorGalley()
}