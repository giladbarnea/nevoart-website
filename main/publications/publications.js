const PublicationsPage = () => {
    class Publication extends Div {
        constructor(title, year, creds, mag, link, journal) {
            super({ cls: 'publication' });
            function _openLink() {
                if (link.includes('http') || link.includes('www'))
                    window.open(link);
                else
                    window.open(`main/publications/${link}`);
            }
            this.year = year;
            this.cacheAppend({
                content: div({ cls: "content-div" }).cacheAppend({
                    titleContent: div({ cls: "title" }).cacheAppend({
                        title: paragraph({ text: title, cls: "publication-title bold" }),
                        journal: paragraph({ id: "journal-banner" , text: journal , cls: "bold" })
                    }),
                    creds: div({ text: creds, cls: "creds" }),
                    year: span({ text: ` (${year})`, cls: "year" }),
                    mag: span({ text: mag, cls: "mag" }),
                    
                }),
            }).click(_openLink);
        }
    }
    class Journal extends Anchor {
        constructor(title, link) {
            super({ cls: 'journal', href: link });
            this.text(title);
            this.target('_blank');
        }
    }
    async function init() {
        console.log('PublicationsPage init');
        const { selected: selectedData, publications: publicationsData, journals: journalsData } = await fetchDict('main/publications/publications.json');
        const publications = [];
        const selected = [];
        const journals = [];
        for (let title of selectedData) {
            let { year, creds, mag, link, journal } = publicationsData[title];
            selected.push(new Publication(title, year, creds, mag, link, journal));
        }
        for (let [title, { year, creds, mag, link, journal }] of dict(publicationsData).items()) {
            publications.push(new Publication(title, year, creds, mag, link, journal));
        }
        for (let [title, { link }] of dict(journalsData).items()) {
            journals.push(new Journal(title, link));
        }
        
        const yearToPublication = {};
        for (let publication of publications) {
            if (publication.year in yearToPublication) {
                yearToPublication[publication.year].push(publication);
            }
            else {
                yearToPublication[publication.year] = [publication];
            }
        }
        const years = [];
        const selectedPublicationsElem = div({ cls: 'year' }).append(elem({ tag: 'h3' }).text('Selected Publications'));
        for (let publication of selected) {
            selectedPublicationsElem.append(publication);
        }
        years.push(selectedPublicationsElem);
        for (let year of Object.keys(yearToPublication).reverse()) {
            let yearDiv = div({ cls: 'year' }).append(elem({ tag: 'h3' }).text(year), ...yearToPublication[year]);
            years.push(yearDiv);
        }

        Home.empty().class('publications-page')
            .append(
                elem({ tag: 'section', cls: 'main-cls page-intro' }).append(
                    elem({ tag: 'h1', cls: 'page-title nine-first', text: 'Publications' })    
                ), elem({ tag: 'section', cls: 'main-cls' }).append(
                    div({ cls: 'publications-container nine-first' }).append(...years),
                    div({ cls: 'side-bar scientific-journals' }).append(
                        elem({ tag: 'h3', text: 'Scientific Journals' }),
                        ...journals)
                )
            );
    }
    return { init };
};
