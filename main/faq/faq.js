const FaqPage = () => {
    async function init() {
        console.log('FaqPage.init()');
        
        const pageContent = div({ cls: 'page-content' })
            .append(
                elem({ tag: 'h1', text: 'שאלות ותשובות' }),
                paragraph({ text: 'דף זה יפותח בקרוב...' })
            );
        
        Home.empty().class('faq-page').append(pageContent);
    }
    return { init };
}; 