const token = require('./token');
const Twitter = require('node-tweet-stream');
const { WebhookClient } = require('discord.js');
const zunesWebhook = new WebhookClient(token.webhook_auth.id, token.webhook_auth.token);
const zunesTwitterBot = new Twitter({
    consumer_key: token.twitter_auth.consumer_key,
    consumer_secret: token.twitter_auth.consumer_key,
    token: token.twitter_auth.token,
    token_secret: token.twitter_auth.token_secret
})

zunesTwitterBot.track('zune15');
zunesTwitterBot.track('zune');
zunesTwitterBot.on('tweet', (tweet) => {
    let embed = {
        color: 0x0099ff,
        title: tweet.user.name + ' posted about #zune or #zune15',
        description: tweet.text,
        url: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
        author: {
            name: tweet.user.screen_name,
            icon_url: tweet.user.profile_image_url_https,
            url: 'https://twitter.com/' + tweet.user.screen_name,
        },
        timestamp: new Date(),
        footer: {
            text: strip_tags(tweet.source)
        },
    };
    try {
        zunesWebhook.send({
            username: '#zune and #zune15',
            embeds: [embed],
        });
    } catch (err) {
        console.log(err)
    }

})

zunesTwitterBot.on('error', (err) => {
    console.log('error: ' + err);
})

//stole this from bisot.xyz
function strip_tags(html, ...args) {
    return html.replace(/<(\/?)(\w+)[^>]*\/?>/g, (_, endMark, tag) => {
        return args.includes(tag) ? '<' + endMark + tag + '>' : '';
    }).replace(/<!--.*?-->/g, '');
}