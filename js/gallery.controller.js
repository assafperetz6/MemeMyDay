'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const imgs = getImgs()

    const htmlStr = imgs.map(({ url, id }) => `<img src="${url}" onclick="onCreateMeme(${id - 1})">`).join('')

    elGallery.innerHTML = htmlStr
}

function onCreateMeme(imgIdx) {
    loadMeme(imgIdx)
    renderMeme(imgIdx)
    onToggleGalleryEditor()
}

function onToggleGalleryEditor() {
    const elGallery = document.querySelector('.gallery')
    const elMemeEditor = document.querySelector('.meme-editor')

    if(elGallery.style.display === 'none') {
        elGallery.style.display = 'grid'
        elMemeEditor.style.display = 'none'
    }
    else {
        elGallery.style.display = 'none'
        elMemeEditor.style.display = 'grid'
    }
}