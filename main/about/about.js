const AboutPage = () => {
    async function init() {
        console.log('AboutPage.init()');
        
        const pageContent = div({ cls: 'page-content' })
            .append(
                elem({ tag: 'h1', text: 'אודות' }),
                paragraph({ text: 'דף זה יפותח בקרוב...' })
            );
        
        Home.empty().class('about-page').append(pageContent);
    }
    return { init };
}; 