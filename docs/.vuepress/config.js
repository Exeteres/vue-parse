module.exports = {
    locales: {
        "/": {
            lang: "en-US",
            title: "VueParse",
            description: "Vue + Parse"
        },
        "/ru/": {
            lang: "ru-RU",
            title: "VueParse",
            description: "Vue + Parse"
        }
    },
    themeConfig: {
        locales: {
            "/": {
                label: "English",
                nav: [
                    {
                        text: "Guide",
                        link: "/guide/"
                    },
                    {
                        text: "Github",
                        link: "https://github.com/exeteres/vue-parse"
                    }
                ],
                sidebarDepth: 2,
                sidebar: [
                    "/guide/",
                    "/guide/installation",
                    {
                        title: "Usage",
                        collapsable: false,
                        children: [
                            "/guide/usage/queries",
                            "/guide/usage/data-processing",
                            "/guide/usage/parse-sdk",
                            "/guide/usage/models",
                            "/guide/usage/reactivity"
                        ]
                    }
                ]
            },
            "/ru/": {
                label: "Русский",
                nav: [
                    {
                        text: "Руководство",
                        link: "/ru/guide/"
                    }
                ],
                sidebarDepth: 2,
                sidebar: [
                    "/ru/guide/",
                    "/ru/guide/installation",
                    {
                        title: "Использование",
                        collapsable: false,
                        children: [
                            "/ru/guide/usage/queries",
                            "/ru/guide/usage/data-processing",
                            "/ru/guide/usage/parse-sdk",
                            "/ru/guide/usage/models",
                            "/ru/guide/usage/reactivity"
                        ]
                    }
                ]
            }
        }
    }
};
