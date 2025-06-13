const DesignServicesPage = () => {
    async function init() {
        console.log('DesignServicesPage.init()');
        
        const pageContent = div({ cls: 'page-content' })
            .append(
                elem({ tag: 'h1', text: 'שירותי עיצוב' }),
                paragraph({ text: 'דף זה יפותח בקרוב...' })
            );
        
        Home.empty().class('design-services-page').append(pageContent);
    }
    return { init };
}; 