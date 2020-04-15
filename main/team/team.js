const TeamPage = () => {
    async function init() {
        console.log('TeamPage init');
        // let ROWSIZE = 4;
        // if (window.innerWidth >= $BP1) {
        // }
        // else {
        //     ROWSIZE = 4;
        // }
        class Person extends Div {
            constructor(image, name, role, thesis, email) {
                super({cls: 'person'});
                this.thesis = thesis;
                this.email = email;
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
                this.append(
                    imgElem,
                    elem({tag: 'h3', text: name, cls: "name"}),
                    elem({tag: 'h6', text: role, cls: "role"}),
                    anchor({text: email, cls: "role", href: mailto}),
                    elem({tag: 'h6', text: thesis, cls: "thesis"})
                )
                    .click((event) => {
                        console.log('person click, stopping prop and toggling expando');
                        event.stopPropagation();
                        // expando.toggle(this);
                    });
            }

            // focus() {
            //     return this.removeClass('unfocused');
            // }
            // unfocus() {
            //     return this.addClass('unfocused');
            // }
            // indexInRow() {
            //     return this.index % ROWSIZE;
            // }
            // row() {
            //     return int(this.index / ROWSIZE);
            // }
            // *yieldIndexesBelow() {
            //     for (let i = this.row() + 1; i <= this.group.length / ROWSIZE; i++) {
            //         for (let j = 0; j < ROWSIZE && i * ROWSIZE + j < this.group.length; j++) {
            //             yield [i, j];
            //         }
            //     }
            // }
            // pushTeamBelow() {
            //     for (let [i, j] of this.yieldIndexesBelow()) {
            //         this.group[i * ROWSIZE + j].css({ gridRow: `${i + 2}/${i + 2}` });
            //     }
            // }
            // pullbackTeamBelow() {
            //     for (let [i, j] of this.yieldIndexesBelow()) {
            //         this.group[i * ROWSIZE + j].uncss("gridRow");
            //     }
            // }
            // squeezeExpandoBelow() {
            //     let rightmostPersonIndex = Math.min((ROWSIZE - 1) + this.row() * ROWSIZE, this.group.length - 1);
            //     this.group[rightmostPersonIndex].after(expando);
            // }
        }

        class Team extends Array {
            constructor() {
                super();
                this._push = super.push;
            }

            // push(person) {
            //     let length = this._push(person);
            //     let index = length - 1;
            //     person.index = index;
            //     person.group = this;
            //     return index;
            // }
            // static unfocusOthers(person) {
            //     for (let p of [...team, ...alumni]) {
            //         if (p !== person) {
            //             p.unfocus();
            //         }
            //     }
            // }
            // static focusOthers(person) {
            //     for (let p of [...team, ...alumni]) {
            //         if (p !== person) {
            //             p.focus();
            //         }
            //     }
            // }
        }

        // class Expando extends Div {
        //     constructor() {
        //         super({ id: 'person_expando' });
        //         this.owner = null;
        //         this
        //             .click((event) => {
        //             console.log('expando click, stopping propagation');
        //             event.stopPropagation();
        //         })
        //             .append(elem({ tag: 'svg' })
        //             .id('svg_root')
        //             .attr({ viewBox: '0 0 15 15' })
        //             .append(elem({ tag: 'path', cls: 'upright' }), elem({ tag: 'path', cls: 'downleft' }))
        //             .click((event) => {
        //             console.log('svg click, stopping prop and closing');
        //             event.stopPropagation();
        //             this.close();
        //         }))
        //             .cacheAppend({
        //             cv: div({ cls: 'cv' }),
        //             email: div({ cls: 'email' })
        //         });
        //     }
        //     async toggle(pressed) {
        //         if (this.owner === null) {
        //             Team.unfocusOthers(pressed);
        //             await this.pushAfterAndExpand(pressed);
        //             this.ownPopulateAndPosition(pressed);
        //             return;
        //         }
        //         if (this.owner === pressed) {
        //             this.close();
        //             return;
        //         }
        //         this.owner.unfocus();
        //         pressed.focus();
        //         if (this.owner.group === pressed.group) {
        //             if (this.owner.row() !== pressed.row()) {
        //                 this.collapse();
        //                 await this.pushAfterAndExpand(pressed);
        //             }
        //             this.ownPopulateAndPosition(pressed);
        //         }
        //         else {
        //             this.collapse();
        //             await this.pushAfterAndExpand(pressed);
        //             this.ownPopulateAndPosition(pressed);
        //         }
        //     }
        //     async pushAfterAndExpand(pressed) {
        //         pressed.pushTeamBelow();
        //         pressed.squeezeExpandoBelow();
        //         await wait(0);
        //         this.expand();
        //     }
        //     ownPopulateAndPosition(pressed) {
        //         this.owner = pressed;
        //         this.setHtml();
        //         this.setGridColumn();
        //     }
        //     collapse() {
        //         this.removeClass('expanded').addClass('collapsed').remove();
        //         this.owner.pullbackTeamBelow();
        //     }
        //     expand() {
        //         this.removeClass('collapsed').addClass('expanded');
        //     }
        //     close() {
        //         this.collapse();
        //         Team.focusOthers(this.owner);
        //         this.owner = null;
        //     }
        //     setGridColumn() {
        //         let gridColumn;
        //         switch (this.owner.indexInRow()) {
        //             case 0:
        //                 gridColumn = '1/3';
        //                 break;
        //             case 1:
        //                 gridColumn = '2/4';
        //                 break;
        //             case 2:
        //             case 3:
        //                 gridColumn = '3/5';
        //                 break;
        //         }
        //         this.css({ gridColumn });
        //     }
        //     setHtml() {
        //         this.cv.html(this.owner.cv);
        //         this.email.html(`Email: <a target="_blank" href="mailto:${this.owner.email}">${this.owner.email}</a>`);
        //         showArrowOnHover(this.email.children('a'));
        //     }
        // }
        const imgs = new Set();

        function containerFactory({containerData, team}) {
            let index = 0;
            for (let [name, {image, role, thesis, email}] of dict(containerData).items()) {
                if (imgs.has(image)) {
                    image = img({src: `main/team/${image}`});
                } else {
                    imgs.add(image);
                }
                let person = new Person(image, name, role, thesis, email);
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
        // DocumentElem
        //     .click(() => {
        //     console.log('DocumentElem click');
        //     if (expando.owner !== null)
        //         expando.close();
        // })
        //     .keydown(keyboardNavigation);
        // function keyboardNavigation(event) {
        //     if (event.key === "Escape" && expando.owner !== null)
        //         return expando.close();
        //     if (event.key.startsWith("Arrow") && expando.owner !== null) {
        //         if (event.key === "ArrowRight") {
        //             let nextPerson = expando.owner.group[expando.owner.index + 1];
        //             if (nextPerson === undefined)
        //                 expando.toggle(expando.owner.group[0]);
        //             else
        //                 expando.toggle(nextPerson);
        //         }
        //         if (event.key === "ArrowLeft") {
        //             let prevPerson = expando.owner.group[expando.owner.index - 1];
        //             if (prevPerson === undefined)
        //                 expando.toggle(expando.owner.group[expando.owner.group.length - 1]);
        //             else
        //                 expando.toggle(prevPerson);
        //         }
        //     }
        // }
    }

    return {init};
};
