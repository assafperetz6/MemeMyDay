'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const imgs = getImgs()
    
    const htmlStrs = imgs.map(({ url, id }) => `<img src="${url}" alt="" onclick="onImgSelect(${id})"></img>`).join('')

    elGallery.innerHTML = htmlStrs
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme()
    
    onToggleEditorGalley()
}

function onToggleEditorGalley() {
    const elGallery = document.querySelector('.gallery')
    const elEditor = document.querySelector('.meme-editor')

    elGallery.classList.toggle('hidden')
    elEditor.classList.toggle('hidden')
}