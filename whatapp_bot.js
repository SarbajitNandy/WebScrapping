const puppeteer = require("puppeteer");

const json2String = (list_of_obj) => {
    let str = "";
    for(let item of list_of_obj) {
        for(const [key, value] of Object.entries(item)) {
            str += `${key} : ${value} \n`
        }
    }
    return str;
}

const json2StringTyper = async(input_field, page, list_of_obj) => {
    let str = "";
    for(let item of list_of_obj) {
        for(const [key, value] of Object.entries(item)) {
            // str += `${key} : ${value}`
            console.log(`${key} : ${value}`)
            await input_field.type(`${key} : ${value}`);
            await page.keyboard.down('Shift');
            await page.keyboard.press('Enter');
            await page.keyboard.up('Shift');
        }
    }
    // return str;
}


exports.getTarget = async () => {
    const uri = 'https://web.whatsapp.com';
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(uri);
    // await page.screenshot({path: 'example.png'});
    await page.waitForSelector("span[title='Memo']");

    const target = await page.$("span[title='Memo']")

    console.log("returning target")
    return {browser,target, page};

    // await target.click();
    // const input_field = await page.$(
    //     "#main > footer > div._3ee1T._1LkpH.copyable-area > div._3uMse > div > div._3FRCZ.copyable-text.selectable-text"
    // );
    // // await browser.waitForTarget(() => false)
    // // await browser.close();

    // await input_field.type("Magic happens");
    // await page.keyboard.press("Enter")

    // await browser.waitForTarget(() => false)
    // await browser.close();
}   

exports.whatAppWritter = async (target, page, data) => {
    console.log("writting target")

    await target.click();
    const input_field = await page.$(
        "#main > footer > div._3ee1T._1LkpH.copyable-area > div._3uMse > div > div._3FRCZ.copyable-text.selectable-text"
    );

    // const inp += ut_data = json2String(data);
        
    await json2StringTyper(input_field, page, data);

    // console.log("input data", input_data)
    // await input_field.type(input_data);
    await page.keyboard.press("Enter")
    console.log("writting finished")


    // await browser.waitForTarget(() => false)
    // await browser.close();

    
}

// this.getTarget()


// console.log(json2String([
//     {
//         name: "sarbajit",
//         title: "nandy"
//     },
//     {
//         name: "shalmoli",
//         title: "neogi"
//     }
// ]))