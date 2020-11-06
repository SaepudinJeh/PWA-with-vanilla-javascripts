const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BDgaQ0RPKaNbgUAck8a9Uv1fPloMt6ILpC_FckrjW8MDZW3UyrJ2qBCHFDRz6VYRFYTOHe-J9wD69IOaOPFDlcQ",
    "privateKey": "xteGiQpZeeD-b6B1f30562RAXc4CYK-TbrCyuTxfrOg"
};


webPush.setVapidDetails(
    'mailto: example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubcription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/e6l7Bh93WCs:APA91bFH56Ipcm8XQNwPEu2ycuCe7jCC_PQduUnPTgzxDoKTmx-aT-lHf5jtJfLh5OQenvPWggJ6fyIDxuUI3VuiJUXBqG_AA8IHH1wFq7N2rLlj7FMsoGtsmFHw7ucxnqQkmo4Hcyrs",
    "keys": {
        "p256dh": "BCceCq9Lun962XdkCvx85UQi0zOSqWUwSQLR0NnGgMsHQQ+S80U7zVqXlu9h/03Z8zgvxlfUtz/oYO1VfVKY+F0=",
        "auth": "9k5QCFmZBR0UKVsPVUF7Vw=="
    }
};

const payload = "Ini adalah notifikasi sederhana dari Subscribe ke layanan FCM!"

const options = {
    gcmAPIKey: "511344127256",
    TTL: 60
}

webPush.sendNotification(
    pushSubcription,
    payload,
    options
);