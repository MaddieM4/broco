({
    baseUrl: ".",
    paths: {
        "broco": "src"
    },
    name: "demo",
    include: [
        'broco/modules/get',
        'broco/modules/set',
        'broco/modules/clear'
    ],
    out: "optimized/demo.js"
})
