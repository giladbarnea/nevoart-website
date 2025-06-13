const PrintServicesPage = () => {
    async function init() {
        console.log('PrintServicesPage.init()');
        
        class PrintService extends Div {
            constructor(image, name, description, price) {
                super({cls: 'print-service'});
                
                let imgElem;
                if (image) {
                    imgElem = img({src: `main/print-services/${image}`});
                } else {
                    // Placeholder div for image
                    imgElem = div({cls: 'service-image-placeholder'});
                }

                this.append(
                    imgElem,
                    elem({tag: 'h3', text: name, cls: "service-name"}),
                    elem({tag: 'p', text: description, cls: "service-description"}),
                    elem({tag: 'h6', text: price, cls: "service-price"})
                );
            }
        }

        // Placeholder print services data
        const printServices = [
            new PrintService(null, 'פליירים', 'הדפסת פליירים איכותית על נייר מבריק או מט', 'החל מ-₪50'),
            new PrintService(null, 'כרטיסי ביקור', 'כרטיסי ביקור מעוצבים ומקצועיים', 'החל מ-₪80'),
            new PrintService(null, 'חוברות', 'הדפסת חוברות עם כריכה רכה או קשה', 'החל מ-₪120'),
            new PrintService(null, 'בנרים', 'בנרים גדולים לפרסום ואירועים', 'החל מ-₪200'),
            new PrintService(null, 'מעטפות', 'מעטפות מותאמות אישית למשלוח', 'החל מ-₪60'),
            new PrintService(null, 'מדבקות', 'מדבקות בכל הגדלים והצורות', 'החל מ-₪40')
        ];

        const servicesContainer = div({cls: "services-container edge-to-edge"}).append(...printServices);
        
        Home.empty().class('print-services-page')
            .append(
                elem({tag: 'section', cls: 'main-cls page-intro'}).append(
                    elem({tag: 'h1', cls: "page-title nine-first", text: 'שירותי הדפסה'}),
                    paragraph({cls: 'nine-first', text: 'אנחנו מציעים מגוון רחב של שירותי הדפסה איכותיים לכל צרכיכם'}),
                    servicesContainer
                )
            );
    }

    return {init};
}; 