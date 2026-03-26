async function initPush(publicKey){

const register = await navigator.serviceWorker.register("/sw.js");

const permission = await Notification.requestPermission();

if(permission !== "granted") return;

const subscription = await register.pushManager.subscribe({

  userVisibleOnly: true,

  applicationServerKey: publicKey

});

await fetch("/subscribe",{

  method:"POST",

  headers:{
    "Content-Type":"application/json"
  },

  body:JSON.stringify(subscription)

});

}