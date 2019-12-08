const ResearchPage = () => {
    async function init(selectedIndex) {
        console.log('ResearchPage init, selectedIndex: ', selectedIndex);
        const data = await fetchDict('main/research/research.json');
        const articles = [];
        let emptied = false;
        for (let [i, [title, { image, text, circle, caption }]] of enumerate(data.items())) {
            let imgElem;
            let cachedImage = CacheDiv[`research.${image}`];
            if (cachedImage !== undefined) {
                imgElem = cachedImage.removeAttr('hidden');
            }
            else {
                let src;
                if (image.includes('http') || image.includes('www')) {
                    src = image;
                }
                else {
                    src = `main/research/${image}`;
                }
                imgElem = img({ src });
            }
            imgElem.class('two-thirds');
            let article = elem({ tag: 'section', cls: 'main-cls'})
                .cacheAppend({
                title: elem({ tag: 'h2', cls: 'first-third', text: title }),
                text: paragraph({ cls: "text, two-thirds" }).html(text),
                img: imgElem,
                caption: elem({tag: 'h6', cls: 'two-thirds', text: caption})
            });
            articles.push(article);
            if (!emptied) {
                Home.empty();
                emptied = true;
            }
            Home.class('research-page').append(article);
        }
        if (selectedIndex !== undefined) {
            const selectedArticle = articles[selectedIndex];
            const howFar = selectedIndex / articles.length;
            selectedArticle.e.scrollIntoView({ behavior: "smooth",  });
            await wait(howFar * 1000);
            selectedArticle.title.addClass('highlighted');
            await wait(600);
            selectedArticle.title.removeClass('highlighted');
        }

    }
    return { init };
};
