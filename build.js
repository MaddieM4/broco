({
    baseUrl: ".",
    paths: {
        "broco": "src"
    },
    name: "demo",
    include: [
        'broco/modules/get',
        'broco/modules/set',
        'broco/modules/clear',
        'broco/modules/motd',
        'broco/modules/load',
        'broco/modules/help'
    ],
    out: "optimized/demo.js"
})
