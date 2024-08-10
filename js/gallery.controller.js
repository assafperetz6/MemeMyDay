'use strict'

function renderGallery(imgs = getImgs()) {
	const userUploadBtn = `<div class="upload-file-container flex justify-center align-center">
								<svg xmlns="http://www.w3.org/2000/svg" height="200px" viewBox="0 0 24 24" width="200px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21.02 5H19V2.98c0-.54-.44-.98-.98-.98h-.03c-.55 0-.99.44-.99.98V5h-2.01c-.54 0-.98.44-.99.98v.03c0 .55.44.99.99.99H17v2.01c0 .54.44.99.99.98h.03c.54 0 .98-.44.98-.98V7h2.02c.54 0 .98-.44.98-.98v-.04c0-.54-.44-.98-.98-.98zM16 9.01V8h-1.01c-.53 0-1.03-.21-1.41-.58-.37-.38-.58-.88-.58-1.44 0-.36.1-.69.27-.98H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8.28c-.3.17-.64.28-1.02.28-1.09-.01-1.98-.9-1.98-1.99zM15.96 19H6c-.41 0-.65-.47-.4-.8l1.98-2.63c.21-.28.62-.26.82.02L10 18l2.61-3.48c.2-.26.59-.27.79-.01l2.95 3.68c.26.33.03.81-.39.81z"/></svg>
								<input type="file" id="fileUpload" accept="image/*" / onchange="onUploadFile(this)">
							</div>`
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

	resizeCanvas()
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
	const img = new Image()
	img.src = URL.createObjectURL(el.files[0])
	const newImgObj = {
		id: gImgs.at(-1).id + 1,
		url: img.src
	}
	gImgs.push(newImgObj)
	setImg(newImgObj.id)

	img.onload = renderMeme()

	showMemeEditor()
}
