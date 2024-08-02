'use strict'

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const imgs = getImgs()

    const htmlStr = imgs.map(({ url, id }) => `<img src="${url}" onclick="renderMeme(${id - 1})">`).join('')

    elGallery.innerHTML = htmlStr
}

