// const cache_name = "static-cache";
// const cache_urls = [
//   "/",
//   "/index.html",
//   "/static/js/main.js",
//   "/static/js/chunk.js",
//   "/static/css/main.css",
//   "https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
//   "/home",
//   "/about",
//   "/contactus",
//   "/buyermain",
//   "/f/dashboard",
// ];

// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     caches.open(cache_name).then((cache) => {
//       return cache.addAll(cache_urls);
//     })
//   );
// });

// self.addEventListener("activate", (e) => {
//   console.log("Sw is activated " + e);
// });

// self.addEventListener("fetch", (e) => {
//   if (!navigator.onLine) {
//     e.respondWith(
//       caches.match(e.request).then((res) => {
//         if (res) {
//           return res;
//         }
//         let requestUrl = e.request.clone();
//         fetch(requestUrl);
//       })
//     );
//   }
// });
