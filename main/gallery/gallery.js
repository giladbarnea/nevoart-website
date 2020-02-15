const GalleryPage = () => {
    async function init() {
        class GalleryImg extends Div {
            constructor(file, caption) {
                super({});
                this.path = null;
                this.index = null;
                this.collection = null;
                this.caption = null;
                if (file !== undefined)
                    this.path = file;
                if (caption !== undefined)
                    this.caption = caption;
                this.click((event) => {
                    console.log('this click:', this);
                    event.stopPropagation();
                    return toggleImgViewer(this);
                });
            }
            src(src) {
                return this.css({backgroundImage:`url(${src})`})
            }
            getLeftImage() {
                let i;
                if (this.index === 0)
                    i = this.collection.length - 1;
                else
                    i = this.index - 1;
                return this.collection[i];
            }
            getRightImage() {
                let i;
                if (this.index === this.collection.length - 1)
                    i = 0;
                else
                    i = this.index + 1;
                return this.collection[i];
            }
        }
        console.log('GalleryPage init');
        const chevronSvg = `<svg version="1.1" id="chevron_right" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 185.343 185.343">
    <path style="fill:#000;"
		  d="M 51.707,185.343
    c -2.741,0-5.493-1.044-7.593-3.149
    c -4.194-4.194-4.194-10.981,0-15.175
	l 74.352-74.347
	L 44.114,18.32
	c -4.194-4.194-4.194-10.987,0-15.175
	c 4.194-4.194,10.987-4.194,15.18,0l81.934,81.934
	c 4.194,4.194,4.194,10.987,0,15.175
	l -81.934,81.939
	C 57.201,184.293,54.454,185.343,51.707,185.343
	Z"/>

</svg>
`;
        function switchToImg(_selectedImg) {
            console.log(`galleryImg.switchToImg(`, _selectedImg);
            selectedImg = _selectedImg;
            imgViewer.caption.text(selectedImg.caption);
            let clone = _selectedImg.e.cloneNode();
            imgViewer.img.wrapSomethingElse(clone);
        }
        async function gotoAdjImg(event) {
            event.stopPropagation();
            if (event.currentTarget.id === 'left_chevron') {
                console.log('left chevron click');
                switchToImg(selectedImg.getLeftImage());
            }
            else {
                console.log('right chevron click');
                switchToImg(selectedImg.getRightImage());
            }
        }
        function closeImgViewer() {
            Body.toggleClass('theater', false);
            // imagesContainer.toggleClass('theater', false);
            Navbar.css({ opacity: 1 });
            imgViewer
                .toggleClass('on', false);
            imgViewerClose.toggleClass('on', false);
            imgViewer.isopen = false;
        }
        function toggleImgViewer(_selectedImg) {
            console.log('galleryImg.toggleImgViewer(', _selectedImg);
            if (imgViewer.isopen)
                return closeImgViewer();
            imgViewerClose.toggleClass('on', true);
            imgViewer.toggleClass('on', true);
            switchToImg(_selectedImg);
            imgViewer.isopen = true;
            Body.toggleClass('theater', true);
            // imagesContainer.toggleClass('theater', true);
            Navbar.css({ opacity: 0 });
        }
        const imgViewer = div({ cls: 'img-viewer' })
            .cacheAppend({
                left: div({ id: 'left_chevron', cls: 'left' }).html(chevronSvg).click(gotoAdjImg),
                img: div({}),
                right: div({ id: 'right_chevron', cls: 'right' }).html(chevronSvg).click(gotoAdjImg),
                caption: div({ id: 'caption' })
            }).click((event) => {
                console.log('imgViewer click, stopping propagation');
                event.stopPropagation();
            });
        imgViewer.isopen = false;
        
        const { "Bio Images": bioImagesData, "Team Photos": teamPhotosData } = await fetchDict("main/gallery/gallery.json");
        function populateArray(data) {
            const arr = [];
            for (let { file, caption } of data) {
                let galleryImg = new GalleryImg(file, caption);
                let cachedImage = CacheDiv[`gallery.${file}`];
                if (cachedImage !== undefined) {
                    galleryImg.wrapSomethingElse(cachedImage.removeAttr('hidden'));
                    console.log(...less(`gallery | "gallery.${file}" loaded from cache`));
                }
                else {
                    let src = `main/gallery/${file}`;
                    galleryImg.src(src);
                }
                arr.push(galleryImg);
            }
            return arr
        }
        const bioImages = populateArray(bioImagesData);
        bioImages.forEach((image, i) => { image.index = i; image.collection = bioImages; })
        const teamPhotos = populateArray(teamPhotosData);
        teamPhotos.forEach((image, i) => { image.index = i; image.collection = teamPhotos; })


        let selectedImg = new GalleryImg();

        DocumentElem
            .click(() => {
                if (!imgViewer.isopen)
                    return;
                console.log('document click, closeImgViewer()');
                closeImgViewer();
            })
            .keydown((event) => {
                if (!imgViewer.isopen)
                    return;
                if (event.key === "Escape")
                    return closeImgViewer();
                if (event.key.startsWith("Arrow")) {
                    if (event.key === "ArrowLeft")
                        return switchToImg(selectedImg.getLeftImage());
                    else if (event.key === "ArrowRight")
                        return switchToImg(selectedImg.getRightImage());
                }
            });
        const imgViewerClose = div({ cls: 'img-viewer-close' }).append(elem({ tag: 'svg' })
            .attr({ viewBox: `0 0 32 32` })
            .append(elem({ tag: 'path', cls: 'upright' }), elem({ tag: 'path', cls: 'downleft' }))).click(closeImgViewer);

        Home.empty().class('gallery-page')
            .append(
                elem({ tag: 'section', cls: 'main-cls page-intro bio-images' }).append(
                    elem({ tag: 'h1', cls: "page-title nine-first", text: 'Bio Images' }),
                    div({ cls: 'img-container edge-to-edge' }).append(
                        ...bioImages)
                ),
                elem({ tag: 'section', cls: 'main-cls team-photos' }).append(
                    elem({ tag: 'h1', cls: "page-title nine-first", text: 'Team Photos' }),
                    div({ cls: 'img-container edge-to-edge' }).append(
                        ...teamPhotos)
                ),
                div({ cls: 'overlay' }),
                imgViewer,
                imgViewerClose
            );
    }
    return { init };
};
