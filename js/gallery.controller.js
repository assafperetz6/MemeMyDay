'use strict'

function renderGallery(imgs = getImgs()) {
	const userUploadBtn = '<div class="upload-file-container flex justify-center align-center"><input type="file" id="fileUpload" accept="image/*" / onchange="onUploadFile(this)"></div>'
	const htmlStrs = userUploadBtn + imgs
		.map(
			({ url, id }) =>
				`<img src="${url}" alt="" onclick="onImgSelect(${id})"></img>`
		)
		.join('')
	const elGallery = document.querySelector('.gallery')

	elGallery.innerHTML = htmlStrs
}

function onShowSavedMemes() {
	renderSavedMemes()
	showGallery(true)
}

function renderSavedMemes() {
	const savedMemes = loadSavedMemes() || []
	const htmlStrs = savedMemes
		.map(({ memeThumbnail }, idx) => {
			return `<div class="saved-meme-container">
                    <span class="btn delete-meme flex justify-center align-center" onclick="onDeleteMeme(${idx})">X</span>
                    <img src="${memeThumbnail}" alt="" onclick="onRenderSavedMeme(${idx})"></img>
                </div>`
		})
		.join('')
	const elGallery = document.querySelector('.gallery')

	elGallery.innerHTML =
		htmlStrs || '<h2>There are currently no saved memes</h2>'

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

function onFilterGallery(filterTxt) {
    const normalizedTxt = filterTxt.toLowerCase()
	const imgs = getImgs()
	const filteredImgs = imgs.filter(({ keywords }) =>
		keywords.find((keyword) => keyword.includes(normalizedTxt))
	)

	renderGallery(filteredImgs)
}

function onClearSearchBar() {
	const elSearchBar = document.getElementById('search-input')
	elSearchBar.value = ''

    renderGallery()
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

function onDeleteMeme(memeIdx) {
	let savedMemes = loadSavedMemes()

	savedMemes.splice(memeIdx, 1)

	saveToStorage('savedMemes', savedMemes)
	renderSavedMemes()
}

function onUploadFile(el) {
    const img = el.files[0]
    const reader = new FileReader()

	reader.onload = ev => {
		drawImg(ev.target.result)
		showMemeEditor()
	}
	reader.readAsDataURL(img)
}