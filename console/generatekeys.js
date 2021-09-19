const webpush = require('web-push');

const {publicKey, privateKey} = webpush.generateVAPIDKeys()

console.log("------------------------------------------------------------------------------------------------------");
console.log(`publicKey: ${publicKey}`);
console.log("------------------------------------------------------------------------------------------------------");
console.log(`privateKey: ${privateKey}`);
console.log("------------------------------------------------------------------------------------------------------");
