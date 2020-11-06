window.addEventListener('DOMContentLoaded', () => {
    const elm = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elm);

    regisServiceWorker();
    requestPermission();
})

// Register ServiceWorker
function regisServiceWorker() {
    if('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('../sw.js')
                .then( () => {
                    console.log('Registrasi SW berhasil');
                })
                .catch( () => {
                    console.log('Registrasi SW gagal');
                })
        })
    } else {
        console.log("Browser belum mendukung SW");
    }
}


function requestPermission() {
    if('Notification' in window) {
        Notification.requestPermission().then( result => {
            if (result === 'denied') {
                console.log('Notifikasi tidak dijinkan');
                return;
            } else if (result === 'default') {
                console.error('Menutup dialog notifikasi');
            } 

            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then( reg => {
                    reg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array('BDgaQ0RPKaNbgUAck8a9Uv1fPloMt6ILpC_FckrjW8MDZW3UyrJ2qBCHFDRz6VYRFYTOHe-J9wD69IOaOPFDlcQ')
                    })
                    .then( subscribe => {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    })
                    .catch( err => {
                        console.error('Tidak dapat melakukan subscribe ', err.message);
                    })
                })
            }
        })
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const ouputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        ouputArray[i] = rawData.charCodeAt(i);
    }
    return ouputArray;
}