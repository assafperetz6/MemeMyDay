'use strict'

function onInit() {
    renderGallery()
}

function renderGallery() {
    const elGallery = document.querySelector('.gallery')
    const imgs = getImgs()

    const htmlStr = imgs.map(({ url }) => `<img src="${url}">`).join('')

    elGallery.innerHTML = htmlStr
}

