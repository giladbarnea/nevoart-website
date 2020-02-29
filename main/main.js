const isIphone = window.navigator.userAgent.includes('iPhone');
const DocumentElem = elem({ htmlElement: document });
const Body = elem({ htmlElement: document.body });
const Home = elem({ id: 'home' });
const CacheDiv = elem({ id: 'cache' });
const WindowElem = elem({ htmlElement: window });
WindowElem.isLoaded = false;
WindowElem.promiseLoaded = async function () {
    if (this.isLoaded)
        return true;
    let count = 0;
    while (!this.isLoaded) {
        if (count >= 2000) {
            if (count === 2000)
                console.trace(`WindowElem.promiseLoaded() count: ${count}. Waiting 200ms, warning every 1s.`);
            else if (count % 5 === 0)
                console.warn(`WindowElem.promiseLoaded() count: ${count}. Waiting 200ms, warning every 1s.`);
            await wait(200);
        }
        else {
            await wait(5);
        }
        count++;
    }
    console.log('WindowElem.promiseLoaded() returning true');
    this.isLoaded = true;
    return true;
};
WindowElem.on({
    scroll: (event) => {
        if (Navbar !== undefined) {
            if (window.scrollY > 0) {
                Navbar.removeClass('box-shadow');
            }
            else {
                Navbar.addClass('box-shadow');
            }
        }
    },
    hashchange: (event) => {

        const newURL = event.newURL.replace(window.location.origin + window.location.pathname, "").replace('#', '');
        if (!bool(newURL)) {
            Routing.navigateTo("home");
        }
        else {
            console.log(`%chash change, event.newURL: "${event.newURL}"\n\tnewURL: "${newURL}"`, `color: ${BLUE}`);
            Routing.initPage(newURL);
        }
    },
    load: () => {
        console.log(`%cwindow loaded, window.location.hash: "${window.location.hash}"`, `color: #627E57`);
        WindowElem.isLoaded = true;
        MOBILE = window.innerWidth <= $BP4;
        Navbar = new NavbarElem({
            query: 'div#navbar',
            children: {
                home: '.home',
                research: '.research',
                team: '.team',
                publications: '.publications',
                gallery: '.gallery',
                // contact: '.contact',
            }
        });
        if (window.location.hash !== "")
            fetchDict('main/home/home.json').then(({ logo }) => Navbar.home.attr({ src: `main/home/${logo}` }));
        function cache(file, page) {
            if (!file) return;
            let src;
            if (file.includes('http') || file.includes('www')) {
                src = file;
            }
            else {
                src = `main/${page}/${file}`;
            }
            let imgElem = elem({ htmlElement: new Image() })
                .attr({ src, hidden: "" })
                .on({
                    load: () => {
                        CacheDiv.cacheAppend([[`${page}.${file}`, imgElem]]);
                    }
                });
        }
        async function cacheTeam() {
            console.log(...less('cacheTeam'));
            const data = await fetchDict('main/team/team.json');
            const { team: teamData, alumni: alumniData } = data;
            for (let [_, { image }] of dict(teamData).items())
                cache(image, "team");
            for (let [_, { image }] of dict(alumniData).items())
                cache(image, "team");
        }
        async function cacheGallery() {
            return console.warn('Hi Morki :) Remember to ask shmendrik to fix gallery cache sometime')
            console.log(...less('cacheGallery'));
            let galleryData = await fetchArray("main/gallery/gallery.json");
            const galleryFiles = galleryData.map(d => d.file);
            for (let file of galleryFiles)
                cache(file, "gallery");
        }
        async function cacheResearch() {
            console.log(...less('cacheResearch'));
            const researchData = await fetchDict('main/research/research.json');
            delete researchData["page-intro"];
            for (let [_, { image }] of researchData.items())
                cache(image, "research");
        }
        console.log(...less('waiting 1000ms before caching starts...'));
        wait(1000).then(() => {
            console.log(...less('done waiting, starting caching'));
            if (!window.location.hash.includes('research'))
                cacheResearch();
            if (!window.location.hash.includes('team'))
                cacheTeam();
            if (!window.location.hash.includes('gallery'))
                cacheGallery();
            console.log(...less('done caching'));
        });
    }
});
class NavbarElem extends BetterHTMLElement {
    constructor({ query, children }) {
        super({ query, children });
        for (let pageString of Routing.pageStrings()) {
            this[pageString]
                .click(() => {
                    console.log(`navbar ${pageString} click`);
                    Routing.navigateTo(pageString);
                })
        }
    }
    select(child) {
        for (let pageString of Routing.pageStrings()) {
            let pageElem = this[pageString];
            pageElem.toggleClass('selected', pageElem === child);
        }
    }
    _emphasize(child) {
        for (let pageString of Routing.pageStrings()) {
            let pageElem = this[pageString];
            pageElem.toggleClass('pale', pageElem !== child);
        }
    }
    _resetPales() {
        for (let pageString of Routing.pageStrings()) {
            let pageElem = this[pageString];
            pageElem.removeClass('pale');
        }
    }
}
let Navbar;

const hamburger = elem({
    id: 'hamburger', children: {
        menu_and_logo_container: '.menu-and-logo-container',
        // logo: '.logo',
        items: '.items'
    }
});
/*hamburger.logo.click((event) => {
    event.stopPropagation();
    Routing.navigateTo("home");
});*/
hamburger.items.children('div').forEach((bhe) => {
    bhe.click((event) => {
        event.stopPropagation();
        const innerText = bhe.e.innerText.toLowerCase();
        console.log(`hamburger ${innerText} click`);
        hamburger.removeClass('open');
        Routing.navigateTo(innerText);
    });
});
hamburger.click((event) => {
    console.log('hamburger.click');
    hamburger.toggleClass('open');
    if (hamburger.hasClass('open')) {
        console.log('hamburger opened');
    }
    else {
        console.log('hamburger closed');
    }
});
