const {go} = require("./input_scrap");
const { getTarget, whatAppWritter } = require("./whatapp_bot");

const uris = [
    "https://www.amazon.in/LG-inch-55cm-LCD-Monitor/dp/B01IBM5V66/",
    "https://www.amazon.in/Logitech-G102-Optical-Gaming-Mouse/dp/B01MYPU20Z/"
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const driver = async() => {

    const {target, browser, page} = await getTarget();

    let pre=[] , curr =[];
    // await setInterval(async()=>{
    //     curr = await go(uris);

    //     console.log(curr)
        
    //     if (curr.length!==pre.length) {
    //         await whatAppWritter(target, page, curr);
    //     } else {
    //         let filter_data = []
    //         for(let i=0; i<curr.length;i++) {
    //             if (curr[i].price !== pre[i].price) {
    //                 filter_data.push(curr[i]);
    //             }
    //         }
    //         await whatAppWritter(target, page, curr);
    //     }
    // }, 10000);

    while(true) {
        curr = await go(uris);

        // console.log("pre", pre)
        // console.log("curr", curr)
        
        if (curr.length!==pre.length) {
            await whatAppWritter(target, page, curr);
        } else {
            let filter_data = []
            for(let i=0; i<curr.length;i++) {
                if (curr[i].price !== pre[i].price) {
                    filter_data.push(curr[i]);
                }
            }
            if (filter_data.length) await whatAppWritter(target, page, filter_data);
            else console.log("No New Information")
        }

        pre = curr;
        console.log("sleeping")
        await sleep(1000000);
    }

    // setInterval(() => {
    //     console.log("start")
    //     curr = await go(uris);

    //     if (curr.length!==pre.length) {
    //         await whatAppWritter(target, curr);
    //     } else {
    //         let filter_data = []
    //         for(let i=0; i<curr.length;i++) {
    //             if (curr[i].price !== pre[i].price) {
    //                 filter_data.push(curr[i]);
    //             }
    //         }
    //         await whatAppWritter(target, curr);
    //     }

    //     console.log("end")
    // }, 10000);
    console.log("closing browser")
    // await browser.waitForTarget(() => false)
    await browser.close();
}


driver()