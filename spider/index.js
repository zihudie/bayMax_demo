var superagent = require("superagent")
var async = require("async")
var cheerio = require('cheerio')
var http = require('http')
var url = require('url');
let fs = require("fs")
let path = require("path")
let timeline = []
let n = 0
var cnodeUrl = 'https://cnodejs.org/';
console.log(1111)
    // http.createServer((req, res) => {
    //     var concurrencyCount = 0
    //     fetchUrl = function (url, callback) {
    //         // delay 的值在 2000 以内，是个随机的整数
    //         var delay = parseInt((Math.random() * 10000000) % 2000, 10);
    //         concurrencyCount++;
    //         console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
    //         setTimeout(function () {
    //             concurrencyCount--;
    //             console.log("***********",'获得了'+concurrencyCount)
    //             callback(null, url + ' html content');

    //         }, delay);
    //     }
    //     var urls = [];
    //     for (var i = 0; i < 30; i++) {
    //         urls.push('http://datasource_' + i);
    //     }

    //     async.mapLimit(urls,  function (url, callback) {
    //         fetchUrl(url, callback);
    //       }, function (err, result) {
    //         console.log('final:');
    //         console.log(result);
    //       });

    // }).listen(8981)

    // ?tab=all&page=5
    http.createServer((req, res) => {
        superagent
            .get(cnodeUrl)
            .end((err, firstResult) => {
                if (err) {
                    console.error('error....', err)
                }
                var getData = function (page, callback) {
                    n++
                    let params = {
                        'page': page,
                        'tab': 'all'
                    }
                    timeline[page] = new Date().getTime();
                    console.log('现在的并发数是', n, '，正在抓取的是', page);
                    superagent
                        .get('https://cnodejs.org/')
                        .set({
                            'Referrer': 'www.baidu.com',
                            'Content-Type': 'text/plain; charset=UTF-8'
                        })
                        .query({
                            params: JSON.stringify(params)
                        })
                        .end(function (err, obj) {
                            n--
                            console.log('抓取', page, '结束，耗时：', new Date().getTime() - timeline[page], '毫秒');

                            // console.log('释放了并发数后，当前并发数：', n)
                            if (err) return null
                            var $ = cheerio.load(obj.text)
                            var items = []
                            var baseUrl = 'https://cnodejs.org/topic'
                            $('#topic_list .topic_title').each(function (idx, element) {
                                var $element = $(element);
                                items.push({
                                  title: $element.attr('title'),
                                  href: url.resolve(baseUrl,$element.attr('href'))
                                });
                              });
                            callback(null, items)
                        })
                }
                var pages = []
                for (var i = 0; i < 8; i++) {
                    pages.push(i)
                }
                async.mapLimit(pages, 2, function (page, callback) {
                    // console.log('offset.....',offset)
                    getData(page, callback)
                }, function (err, result) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain; charset=UTF-8'
                    });

                    fs.writeFile('data.js', JSON.stringify(result), err1 => {
                        console.log("success....")
                        console.log(result.length)
                    })

                    res.end(JSON.stringify(result))

                })
            })


    }).listen(8801)