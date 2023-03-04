const fs = require('fs');
const path = require('path');
const staticPath = path.join(__dirname, '../static');
const {
    createSSRApp
} = require('vue');
const {
    renderToString
} = require('@vue/server-renderer');
const vueComp = createSSRApp({
    data() {
        return {
            message: "ssr"
        }
    },
    template: `<div><h1>{{message}}</h1></div>`
})
const initRouter = (app) => {
    app.all(["/", "/about"], (req, res) => {
        const html = fs.readFileSync('./src/template/index.html', 'utf-8');
        res.setHeader("Content-Type", "text/html");
        res.send(html);
    });
    app.get('/ssr', async (req, res) => {
        const html = await renderToString(vueComp);
        res.send(html);
    })
    app.all("/*.js", (req, res) => {
        const filePath = path.join(staticPath, req.path);
        res.setHeader("Content-Type", "text/javascript");
        res.send(fs.readFileSync(filePath, "utf-8"));
    })
    app.all("/*.css", (req, res) => {
        const filePath = path.join(staticPath, req.path);
        res.setHeader("Content-Type", "text/css");
        res.send(fs.readFileSync(filePath, "utf-8"));
    })
    app.get("/api/data", (req, res) => {
        res.json({
            data: "数据"
        })
    })
}

module.exports = initRouter;