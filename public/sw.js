self.addEventListener("push", event => {

  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: "New notification",
    icon: data.image,
    image: data.image,
    data: {
      url: data.url   // store url
    }
  });

});


self.addEventListener("notificationclick", event => {

  event.notification.close();

  const url = event.notification.data.url;

  if(url){
    event.waitUntil(
      clients.openWindow(url)
    );
  }

});