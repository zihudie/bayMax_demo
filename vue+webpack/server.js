const express = require("express")
const app = express()
const path = require('path')
const fs = require('fs')
app.use(express.static(path.resolve(__dirname, './dist')))
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})
app.use("/module1", (req, res, next) => {
  console.log(req.originalUrl, req.baseUrl, JSON.stringify(req))
})
app.listen(8082, (err) => {
  if (err) {
    console.log("errr", err)
  }
  console.log(`server is running :8082 `)
});
