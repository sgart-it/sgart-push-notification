self.addEventListener('push', function (event) {

    console.log(`sgart:swp:push event`, event);

    if (!(self.Notification && self.Notification.permission === 'granted')) {
        console.warn(`sgart:swp:push event NOT supported/grated`);
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data.json();
    }

    // formatto la notifica
    var title = data.title || "Sgart Test Push";
    var options = {
        body: `${data.message}\nsent: ${data.dateSent}\nsubscriptionId: ${data.subscriptionId}` || "message empty",
        //tag: 'sgart-push-demo',
        icon: data.icon || "/images/new-notification.png"
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});



self.addEventListener('pushsubscriptionchange', function (event) {
    console.log(`sgart:swp:pushsubscriptionchange`, event);
});


/*
self.addEventListener('push', function (event) {
    console.log('push');

    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    var data = {};
    if (event.data) {
        data = event.data.json();
    }
    var title = data.title || "Sgart Test Push";
    var message = data.message || "Here's something you might want to check out.";
    var icon = "images/new-notification.png";

    var notification = new self.Notification(title, {
        body: message,
        tag: 'simple-push-demo-notification',
        icon: icon
    });

    notification.addEventListener('click', function () {
        if (clients.openWindow) {
            clients.openWindow('https://example.blog.com/2015/03/04/something-new.html');
        }
    });
});
*/