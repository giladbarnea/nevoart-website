const TeamPage = () => {
    async function init() {
        console.log('TeamPage init');
        class Person extends Div {
            constructor(image, name, role, role2, thesis, thesis2, email) {
                super({cls: 'person'});
                // this.thesis = thesis;
                // this.email = email;
                let mailto = "mailto:" + email + "?Subject=Hello";
                let imgElem;
                if (typeof image === 'string') {
                    let cachedImage = CacheDiv[`team.${image}`];
                    if (cachedImage !== undefined) {
                        let hidden = cachedImage.attr('hidden');
                        imgElem = cachedImage.removeAttr('hidden');
                    } else {
                        imgElem = img({src: `main/team/${image}`});
                    }
                } else {
                    imgElem = image;
                }

                if (email) {
                    this.append(
                        imgElem,
                        elem({tag: 'h3', text: name, cls: "name"}),
                        elem({tag: 'h6', text: role, cls: "role"}),
                        anchor({text: email, cls: "role", href: mailto})                    )
                } else if (thesis) {
                    this.append(
                        imgElem,
                        // elem({tag: 'h3', text: name, cls: "name"}),
                        // elem({tag: 'h6', text: role, cls: "role"}),
                        // elem({tag: 'h6', text: thesis, cls: "thesis"})

                        elem({tag: 'h3', text: name, cls: "name"}),
                        div({ cls: 'thesis-block' }).append(
                            elem({tag: 'h6', text: role, cls: "role"}),
                            elem({tag: 'h6', text: thesis, cls: "thesis"})
                        )
                    )   
                    if (thesis2) {
                        this.append(
                            div({ cls: 'thesis-block' }).append(
                                elem({tag: 'h6', text: role2, cls: "role"}),
                                elem({tag: 'h6', text: thesis2, cls: "thesis"})
                            )
                        )
                    } 
                } else {
                    this.append(
                        imgElem,
                        elem({tag: 'h3', text: name, cls: "name"}),
                        elem({tag: 'h6', text: role, cls: "role"}),
                    )
                }
                // this.append(
                //     imgElem,
                //     elem({tag: 'h3', text: name, cls: "name"}),
                //     elem({tag: 'h6', text: role, cls: "role"}),
                //     anchor({text: email, cls: "role", href: mailto}),
                //     elem({tag: 'h6', text: thesis, cls: "thesis"})
                // )
            }
        }

        class Team extends Array {
            constructor() {
                super();
                this._push = super.push;
            }
        }

    
        const imgs = new Set();

        function containerFactory({containerData, team}) {
            let index = 0;
            for (let [name, {image, role, role2, thesis, thesis2, email}] of dict(containerData).items()) {
                if (imgs.has(image)) {
                    image = img({src: `main/team/${image}`});
                } else {
                    imgs.add(image);
                }
                let person = new Person(image, name, role, role2, thesis, thesis2, email);
                team.push(person);
                index++;
            }
            const grid = div({cls: "member-container edge-to-edge"}).append(...team);
            return grid;
        }

        const {alumni: alumniData, team: teamData} = await fetchDict('main/team/team.json');
        const team = new Team();
        const alumni = new Team();
        const teamContainer = containerFactory({containerData: teamData, team: team});
        const alumniContainer = containerFactory({containerData: alumniData, team: alumni});
        Home.empty().class('team-page')
            .append(
                elem({tag: 'section', cls: 'main-cls page-intro active-memebers'}).append(
                    elem({tag: 'h1', cls: "page-title nine-first", text: 'Active Lab Members'}),
                    teamContainer
                ),
                elem({tag: 'section', cls: 'main-cls alumni'}).append(
                    elem({tag: 'h1', cls: "page-title nine-first", text: 'Alumni'}),
                    alumniContainer
                )
            );
    }

    return {init};
};
