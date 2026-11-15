const CACHE = "calistenia-v3";
const FILES = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./img/Bodyweight_Squat_0.jpg", "./img/Bodyweight_Squat_1.jpg", "./img/Bodyweight_Walking_Lunge_0.jpg", "./img/Bodyweight_Walking_Lunge_1.jpg", "./img/Butt_Lift_Bridge_0.jpg", "./img/Butt_Lift_Bridge_1.jpg", "./img/Freehand_Jump_Squat_0.jpg", "./img/Freehand_Jump_Squat_1.jpg", "./img/Incline_Push-Up_0.jpg", "./img/Incline_Push-Up_1.jpg", "./img/Inverted_Row_0.jpg", "./img/Inverted_Row_1.jpg", "./img/Mountain_Climbers_0.jpg", "./img/Mountain_Climbers_1.jpg", "./img/Plank_0.jpg", "./img/Plank_1.jpg", "./img/Push-Ups_With_Feet_Elevated_0.jpg", "./img/Push-Ups_With_Feet_Elevated_1.jpg", "./img/Pushups_0.jpg", "./img/Pushups_1.jpg", "./img/Side_Bridge_0.jpg", "./img/Side_Bridge_1.jpg", "./img/Single_Leg_Glute_Bridge_0.jpg", "./img/Single_Leg_Glute_Bridge_1.jpg", "./img/Superman_0.jpg", "./img/Superman_1.jpg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(r => {
      const copy = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return r;
    }).catch(() => caches.match(e.request).then(m => m || caches.match("./index.html")))
  );
});
