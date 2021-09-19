// This function is needed because Chrome doesn't accept a base64 encoded string
// as value for applicationServerKey in pushManager.subscribe yet
// https://bugs.chromium.org/p/chromium/issues/detail?id=802280
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

// Register a Service Worker.
console.log('sgart:rsw:Registrazione service worker');
navigator.serviceWorker.register('service-worker-push.js');

let pushRegistration = null;

navigator.serviceWorker.ready
    .then(function (registration) {
        console.log('sgart:rsw:ready');
        // salvo la registration
        pushRegistration = registration;

        // Use the PushManager to get the user's subscription to the push service.
        return registration.pushManager.getSubscription()
            .then(async function (subscription) {
                console.log('sgart:rsw:getSubscription');

                if (subscription) {
                    // se la subscription esisteva, la ritorno
                    return subscription;
                }

                // recupero la chiave pubblica dal server
                const response = await fetch('/api/push/public-key');
                const responseJson = await response.json();
                const convertedVapidKey = urlBase64ToUint8Array(responseJson.publicKey);

                // Otherwise, subscribe the user (userVisibleOnly allows to specify that we don't plan to
                // send notifications that don't have a visible effect for the user).
                return registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: convertedVapidKey
                });
            });
    })
    .then(async function (subscription) {
        // uso le Fetch API per salvare su db i dati della subscription
        console.log('sgart:rsw:saving push registration');
        const response = await fetch('/api/push/registration', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(subscription)
        });
        if (response.ok) {
            console.log('sgart:rsw:saved push registration');
        }
    })
    .catch(function (error) {
        console.error('sgart:rsw:saving push registration', error);
    });

const handleUnsubscribe = async () => {
    console.log('sgart:rsw:unsubscribe');

    try {
        const subscription = await pushRegistration.pushManager.getSubscription();
        if (subscription) {
            const success = await subscription.unsubscribe();
            if (success) {
                console.log('sgart:rsw:unsubscribe deleting push registration');
                const response = await fetch('/api/push/registration', {
                    method: 'delete',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ endpoint: subscription.endpoint })
                });
                if (response.ok) {
                    console.log('sgart:rsw:unsubscribe deleting ok');
                }
            }
        }else{
            console.log('sgart:rsw:unsubscribe subscription=null');
        }
    } catch (error) {
        console.error(`sgart:rsw:unsubscribe ${error}`);

    }
};

document.getElementById('btn-push-unsubscribe').addEventListener('click', handleUnsubscribe);