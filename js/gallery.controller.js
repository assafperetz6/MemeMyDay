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
    const elGallery = document.querySelector('.gallery')
    const elEditor = document.querySelector('.meme-editor')

    elGallery.classList.toggle('hidden')
    elEditor.classList.toggle('hidden')
}

function renderMeme() {
    const meme = getMeme()
    const img = getMemeImg()

    drawImg(img.url)
}

function drawImg(imgUrl) {
    const img = new Image()
    img.src = imgUrl

    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}