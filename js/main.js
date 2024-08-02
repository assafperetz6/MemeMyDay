'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderGallery()

    resizeCanvas()
    addListeners()

    renderMeme()
}

function addListeners() {
    window.addEventListener('resize', resizeCanvas)
}

function resizeCanvas() {
    let elCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasContainer.clientWidth - 40
    gElCanvas.height = elCanvasContainer.clientHeight - 40
}