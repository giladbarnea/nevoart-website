const Routing = (() => {
    function getPageObj(key) {
        switch (key) {
            case "research":
                return ResearchPage;
            case "team":
                return TeamPage;
            case "publications":
                return PublicationsPage;
            case "gallery":
                return GalleryPage;
            case "contact":
                return ContactPage;
        }
    }
    function pageStrings() {
        return ["home", "research", "team", "publications", "gallery", "contact"];
    }
    async function initPage(url) {
        console.log(`%cRouting.initPage(url: "${url}")`, `color: ${BLUE}`);
        if (bool(url)) {
            if (pageStrings().slice(1).includes(url)) {
                console.log(`\t%cvalid url ("${url}"), calling pageObj().init()`, `color: ${BLUE}`);
                // if (url === "gallery")
                //     Footer.attr({ hidden: '' });
                // else
                    // Footer.removeAttr('hidden');
                // FundingSection.attr({ hidden: '' });
                const pageObj = getPageObj(url);
                pageObj().init();
                if (Navbar === undefined)
                    await WindowElem.promiseLoaded();
                Navbar.select(Navbar[url]);
            }
            else {
                console.log(`%cRouting.initPage(), bad url, not in pageStrings(): "${url}". Calling Routing.navigateTo("home")`, `color: ${BLUE}`);
                Routing.navigateTo("home");
            }
        }
        else {
            console.log('\t%cempty url, calling HomePage().init()', `color: ${BLUE}`);
            HomePage().init();
        }
    }
    function navigateTo(url) {
        if (url.startsWith('#')) {
            throw new Error(`navigateTo(url) bad url: "${url}"`);
        }
        let href = url === "home" ? '' : `#${url}`;
        console.log(`%cRouting.navigateTo(url: "${url}") clicking fake <a href="${href}">`, `color: ${BLUE}`);
        anchor({ href }).appendTo(Body).click().remove();
    }
    let lastPage = window.location.hash.slice(1);
    console.log(`%cRouting() root, window.location: ${window.location}\ncalling initPage(lastPage = "${lastPage}")`, `color: ${BLUE}`);
    initPage(lastPage);
    return { initPage, navigateTo, pageStrings };
})();
