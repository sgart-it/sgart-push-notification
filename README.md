# sgart-push-notification
Demo notifiche push in JavaScript (Push API)

https://www.sgart.it/IT/informatica/notifiche-push-nel-browser-push-api/post

# setup
eseguire: **npm install**

## chiave pubblica e privata
Per generare le chiavi pubblica e privata digita: **npm run keys**

rinomina il file **settings-to-rename.json** in **settings.json**

sostituisci i valori in **settings.json**
```
{
    "database": {
        "filename":"/database/sgart-push.db"
    },
    "push": {
        "publicKey":"<publicKey>",
        "privateKey":"<privateKey>"
    }
}
```

# start debug
per il debug aprire 3 console
1. npm start
2. ngrock.bat
3. npm run send "ciao sgart"

# note 
Le notifiche push sono supportate in tutti i moderni browser Chrome, Firefox Edge Chromium, ... (non funzionano su Internet Explorer e il vecchio Edge)

Il sito deve girare in https

Le notifiche push NON sempre vengono inviate a localhost o 127.0.0.1

Il database è basato su sqlite e viene creato al primo avvio

sviluppato con node js v14.17.6

## send
npm run send "messaggio" invia le notifiche push ai dispositivi registrati

## ngrok
Per fare il test con url pubbliche o su mobile, avviare il progetto (npm start o debug) ed eseguire ngrok.bat, poi usare la url pubblica visualizzata

ngrok **non** è compreso nel progetto va scaricato da https://ngrok.com/ e poi modificato il percorso presente in ngrok.bat


# esempio di send
```
sendResult: {
  method: 'POST',
  headers: {
    TTL: 2419200,
    'Content-Length': 241,
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'aes128gcm',
    Authorization: 'vapid t=eyJ0eXAioiJKV1qiLCJhb2ciOiJFUzI1NiJ9.eyJhdWQiOiJodvRwczovL2ZjbS5nb29ndGVhcGlzLmNvbSIsImV4cCI6MTYzMjEyMzIyMSwic3ViIjoiaHR0cHM6Ly9wdXNoLWRlbW8uc2dhcnQuaXQifQ.09NYbdAEvXBlpDqilVGWCAyneW_OoEq8jxBAQTgsOqfC-j3y_LFz9uFmGvsaSaFCaq-n_z1Hl2PGmfrC-8jm5A, k=BN7jNOzRzeZOPm1qZ30EEE3iTkHbl4CadftccdWGvAN1nBDV2lR4QN9spnX8aFiPUX_SPF9Tb4DDZlGw9e23Iog'      
  },
  body: <Buffer 97 7f ac 97 a4 f8 aa 3c 88 35 60 90 56 fb db 77 00 00 10 00 41 04 9f 5e 17 ae 84 75 ce 1c d2 91 b5 9a f1 75 33 01 e4 ff 0e 89 57 19 65 1b 0b 0f 64 75 ... 191 more bytes>,
  endpoint: 'https://fcm.googleapis.com/fcm/send/c-Ze2MTzy1w:APA91bGtXW6g_4VQMEP1T-5-...'
}
```

# comandi di creazione progetto
express sgart-push-notification

cd sgart-push-notification

npm install
