const webpush = require('web-push');
const dataService = require('../server/services/dataService');
const settings = require('../settings.json');

webpush.setVapidDetails(
    'https://push-demo.sgart.it',
    settings.push.publicKey,
    settings.push.privateKey
);


const send = async (messages) => {

    console.log(`messages: ${messages}`);

    const subscriptions = (await dataService.getSubscriptions()).data;

    console.log(`Found ${subscriptions.length} subscriptions`);

    for (let m = 0; m < messages.length; m++) {
        const message = messages[m];

        console.log('-----------------------------------------');
        console.log(`Sending message ${m + 1}/${messages.length} with text "${message}" ...`);

        for (let s = 0; s < subscriptions.length; s++) {
            const sub = subscriptions[s];

            console.log(`\n - sending ${s + 1}/${subscriptions.length} subscriptionId: ${sub.subscriptionId} ...`);

            try {
                // dati della subscription del client/browser
                const pushSubscription = {
                    endpoint: sub.endpoint,
                    keys: {
                        p256dh: sub.p256dh,
                        auth: sub.auth
                    }
                };

                // dati da inviare come notifica, 
                // gestita in service-worker-push.js
                const data = {
                    title: 'Sgart Push demo',
                    message: message,
                    icon: "/images/notification.png",
                    dateSent: new Date(),
                    subscriptionId: sub.subscriptionId
                };

                //const sendResult = await webpush.generateRequestDetails(pushSubscription, JSON.stringify(data));
                const sendResult = await webpush.sendNotification(pushSubscription, JSON.stringify(data));
                //console.log('sendResult', sendResult);

                console.log(`   - result statusCode: ${sendResult.statusCode}`);

            } catch (error) {

                if (error.statusCode === 410) {
                    console.log(`\n - removing...`);
                    const deleteResult = await dataService.deleteSubscription(sub.endpoint);
                    if (deleteResult.success) {
                        console.log('   - removed ' + sub.subscriptionId);
                    } else {
                        console.error(`   - removed ${sub.subscriptionId}, message: ${deleteResult.message}`);
                    }
                } else {
                    console.error(`  ***error subscriptionId: ${sub.subscriptionId}, statusCode: ${error.statusCode}, {error}`);
                }
            }

        }
    }
};

console.log('Invia notifiche push prendendo i dati dalle subscription salvate el database');

var args = process.argv.slice(2);
send(args);