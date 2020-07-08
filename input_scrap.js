const request = require("request-promise")
const cheerio = require("cheerio")


exports.go = async(uris) => {
    let time;
    let d = new Date()
    time = d.getHours() + ":"+ d.getMinutes();
    let all_data = []
    for(let uri of uris) {
        let response = await request({
            uri: uri,
            headers: {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,es;q=0.8"
            },
            gzip: true
        })

        let $ = cheerio.load(response)
        const title = $(' #productTitle').text().split("-")[0].trim();
        const price = $('#price .priceBlockBuyingPriceString').text().trim();

        all_data.push({
            time,
            title,
            price
        })
    }
    console.log("value scrapping done")

    return all_data;

}
