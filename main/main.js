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
                'print-services': '.print-services',
                'design-services': '.design-services',
                about: '.about',
                faq: '.faq',
                contact: '.contact',
            }
        });
        if (window.location.hash !== "")
            fetchDict('main/home/home.json').then(({ logo }) => Navbar.home.attr({ src: `main/home/${logo}` }));
        function cache(file, page) {
            if (!file) return;
            let src;
            // DON'T change string to 'https'
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
                        console.log('done loading: ',`${page}.${file}`);
                    }
                });
        }
        // Removed old caching functions for non-existent pages
        console.log(...less('caching disabled for now - will be re-implemented when needed'));
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
        const innerText = bhe.e.innerText;
        let route;
        switch (innerText) {
            case 'דף הבית': route = 'home'; break;
            case 'שירותי הדפסה': route = 'print-services'; break;
            case 'שירותי עיצוב': route = 'design-services'; break;
            case 'אודות': route = 'about'; break;
            case 'שאלות ותשובות': route = 'faq'; break;
            case 'צור קשר': route = 'contact'; break;
            default: route = 'home';
        }
        console.log(`hamburger ${innerText} click, routing to ${route}`);
        hamburger.removeClass('open');
        Routing.navigateTo(route);
        Body.toggleClass('theater');
    });
});
hamburger.click((event) => {
    console.log('hamburger.click');
    hamburger.toggleClass('open');
    Body.toggleClass('theater');
    if (hamburger.hasClass('open')) {
        console.log('hamburger opened');
    }
    else {
        console.log('hamburger closed');
    }
});
