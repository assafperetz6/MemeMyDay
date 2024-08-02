'use strict'

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()
    addListeners()
}

function addListeners() {

}

function resizeCanvas() {
    let elCanvasContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elCanvasContainer.clientWidth - 40
    gElCanvas.height = elCanvasContainer.clientHeight - 40
}