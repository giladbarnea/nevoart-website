const ResearchPage = () => {
    async function init(selectedIndex) {
        console.log('ResearchPage init, selectedIndex: ', selectedIndex);
        const data = await fetchDict('main/research/research.json');
        const pageIntro = data['page-intro'];
        delete data['page-intro'];
        const articles = [];
        let emptied = false;
        for (let [i, [title, { image, text, caption }]] of enumerate(data.items())) {
            let imgElem = undefined;
            if (image) {
                let cachedImage = CacheDiv[`research.${image}`];
                if (cachedImage !== undefined) {
                    imgElem = cachedImage.removeAttr('hidden');
                }
                else {
                    let src;
                    // DON'T change string to 'https'
                    if (image.includes('http') || image.includes('www')) {
                        src = image;
                    }
                    else {
                        src = `main/research/${image}`;
                    }
                    imgElem = img({ src });
                }
                imgElem.class('two-thirds');
            }
            let article = elem({ tag: 'section', cls: 'main-cls' })
                .cacheAppend({
                    title: elem({ tag: 'h2', cls: 'first-third', text: title }),
                    text: paragraph({ cls: "text two-thirds" }).html(text),
                    caption: elem({ tag: 'h6', cls: 'two-thirds', text: caption })
                });
            if (imgElem){
                article.cacheAppend({img: imgElem})
            }
            articles.push(article);
            if (!emptied) {
                Home.empty();
                emptied = true;
            }

        }
        Home.class('research-page')
            .append(
                elem({ tag: 'section', cls: 'main-cls page-intro' }).append(
                    elem({ tag: 'h1', cls: 'page-title nine-first', text: 'Research' })
                    // elem({ tag: 'p', cls: 'nine-first', text: pageIntro })
                ),
                ...articles
            );
        if (selectedIndex !== undefined) {
            const selectedArticle = articles[selectedIndex];
            const howFar = selectedIndex / articles.length;
            selectedArticle.e.scrollIntoView({ behavior: "smooth", });
            await wait(howFar * 1000);
            selectedArticle.title.addClass('highlighted');
            await wait(600);
            selectedArticle.title.removeClass('highlighted');
        }
    }
    return { init };
};
