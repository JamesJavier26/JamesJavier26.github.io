document.addEventListener('DOMContentLoaded', () => {
	// Set current year in footer
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Preview modal
	const previewOverlay = document.getElementById('imagePreview');
	const previewImage = document.getElementById('previewImage');
	const previewAlt = document.getElementById('previewAlt');
	const previewClose = document.getElementById('previewClose');
	const previewBackdrop = document.getElementById('previewBackdrop');

	function openPreview(image) {
		console.log('Preview open requested for image:', image && image.src);
		if (!previewOverlay || !previewImage || !previewAlt) {
			console.warn('Preview elements missing:', { previewOverlay, previewImage, previewAlt, previewClose, previewBackdrop });
			return;
		}
		previewImage.src = image.src;
		previewImage.alt = image.alt;
		previewAlt.textContent = image.alt;
		previewOverlay.classList.add('active');
		previewOverlay.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
	}

	function closePreview() {
		console.log('Preview close requested');
		if (!previewOverlay || !previewImage) return;
		previewOverlay.classList.remove('active');
		previewOverlay.setAttribute('aria-hidden', 'true');
		previewImage.src = '';
		previewAlt.textContent = '';
		document.body.style.overflow = '';
	}

	if (previewClose) {
		previewClose.addEventListener('click', closePreview);
	}

	if (previewOverlay) {
		previewOverlay.addEventListener('click', (event) => {
			if (event.target === previewOverlay || event.target === previewBackdrop) {
				closePreview();
			}
		});
	}

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && previewOverlay && previewOverlay.classList.contains('active')) {
			closePreview();
		}
	});

	function attachImagePreviews() {
		const galleries = document.querySelectorAll('.project-gallery');
		console.log('Attaching preview listeners to galleries:', galleries.length);
		galleries.forEach((gallery, index) => {
			gallery.addEventListener('click', (event) => {
				const image = event.target.closest('.project-image');
				console.log('Gallery click:', { index, target: event.target, image });
				if (!image) return;
				openPreview(image);
			});
		});
	}

	attachImagePreviews();
});


