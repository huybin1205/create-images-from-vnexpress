const CreateImage = require('./create-image');
const VnExpress = require('./news/vnexpress');
const express = require('express');
const app = express();
const fs = require('fs')
const generator = async () => {
    console.log('START');
    let vnExpress = new VnExpress();
    let news = await vnExpress.get();

    let createImage = new CreateImage();
    // let images = [];
    for (const feed of news) {
        // images.push(await createImage.create(feed.img, feed.title, feed.description));
        const buffer = await createImage.create(feed.img, feed.title, feed.description);
        fs.writeFileSync('./images/'+feed.title+'.png',buffer);
    }
    console.log('End');
    // let facebook = new Facebook(process.env.ACCESS_TOKEN, process.env.GROUP_ID);

    // if (process.env.PAGE_ID) {
    //     facebook.postAsPage(process.env.PAGE_ID)
    // }
    // facebook.postNews(images);
};

app.get('/', (req, res) => {
    generator(); //no need wait done and no need return anything
    res.send('Done')
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});