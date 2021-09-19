const webpush = require('web-push');

const vapidKeys = webpush.generateVAPIDKeys()

console.log("------------------------------------------------------------------------------------------------------");
console.log(`publicKey: ${vapidKeys.publicKey}`);
console.log("------------------------------------------------------------------------------------------------------");
console.log(`privateKey: ${vapidKeys.privateKey}`);
console.log("------------------------------------------------------------------------------------------------------");
