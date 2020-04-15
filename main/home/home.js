const HomePage = () => {
    async function init() {
        const data = await fetchDict('main/home/home.json');
        const aboutText = elem({ query: "#about > .about-text" });
        aboutText.append(elem({ tag: 'h3', text: data["about-text"] }));
        if (!MOBILE) {
            let i = 0;
            for (let [title, { date, content, links }] of dict(data.news).items()) {
                let item = { title, date, content, links, radio: div({ cls: 'radio' }), index: i };
                i++;
            }
        }
        const researchSnippet = elem({ query: "#research_snippet" });
        const researchSnippetData = data["research-snippet"];
        for (let snippet of researchSnippetData) {
            researchSnippet.append(paragraph({ text: snippet }))
        }

        const interests = elem({ query: "#interests" });
        const interestsData = data["interests"];
        for (let interest of interestsData) {
            interests
                .append(
                    div({ cls: 'bullet-container' })
                        .append(
                            div({ cls: 'bullet' })
                                .append(
                                    div({ cls: 'inner-bullet' })
                                ),
                            paragraph({ text: interest })
                        )
                )
        }

        const researchProjects = elem({ query: "#research-projects" });
        const researchProjectsData = data["researchProjects"];
        for (let [i, researchProject] of enumerate(researchProjectsData)) {
            researchProjects
                .append(
                    elem({ tag: 'a', cls: 'research-block' })
                        .append(
                            elem({ tag: 'h3', text: researchProject }),
                            paragraph({ cls: 'readmore', text: 'Read more →' })
                        )
                        .click((event) => {
                            ResearchPage().init(i);
                            history.pushState(null, null, '#research');
                            Navbar.select(Navbar.research);
                            Body.addClass('permalink');
                        })
                );
        }
        
        const bio = elem({ query: "#short-bio" });
        const bioData = data["bio"];
        bio.append(paragraph({ text: bioData }))
    }
    return { init };
};
