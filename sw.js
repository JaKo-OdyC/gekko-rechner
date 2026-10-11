// Dienstskript: haelt die Seite offline verfuegbar.
// Die Seite ist eine einzige Datei ohne Nachladungen, deshalb genuegt ein kleiner Vorrat.
var MARKE = "gekko-rechner-";     // alle Vorraete dieser Anwendung beginnen so
var VORRAT = MARKE + "1";         // bei einer neuen Fassung hochzaehlen
var DATEIEN = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./zeichen/zeichen-192.png",
  "./zeichen/zeichen-512.png",
  "./zeichen/apple-touch-icon.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(VORRAT).then(function(v){ return v.addAll(DATEIEN); })
    .then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(namen){
    // Nur die EIGENEN alten Vorraete wegwerfen. Auf einer gemeinsamen Adresse wie
    // jako-odyc.github.io liegen die Vorraete anderer Projekte im selben Herkunftsort;
    // ein pauschales Aufraeumen wuerde fremde Anwendungen offline unbrauchbar machen.
    return Promise.all(namen.filter(function(n){ return n.indexOf(MARKE) === 0 && n !== VORRAT; })
                            .map(function(n){ return caches.delete(n); }));
  }).then(function(){ return self.clients.claim(); }));
});

// Erst das Netz, dann der Vorrat: So bekommt jedes Geraet beim naechsten Aufruf mit
// Netz die neue Fassung und kommt ohne Netz trotzdem an die Seite.
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  var adresse = new URL(e.request.url);
  if(adresse.origin !== self.location.origin) return;   // Fremdes nicht anfassen

  e.respondWith(
    fetch(e.request).then(function(antwort){
      // NUR erfolgreiche eigene Antworten ablegen. Ohne diese Pruefung landet eine
      // 404-Seite oder die Anmeldeseite eines Gaeste-WLANs im Vorrat und ersetzt
      // dort die gute Seite - dauerhaft, denn offline faellt die Pruefung weg.
      if(antwort && antwort.ok && antwort.type === "basic"){
        var kopie = antwort.clone();
        e.waitUntil(caches.open(VORRAT).then(function(v){ return v.put(e.request, kopie); }));
      }
      return antwort;
    }).catch(function(){
      return caches.match(e.request).then(function(treffer){
        if(treffer) return treffer;
        // Fuer Seitenaufrufe die Startseite aus dem Vorrat nachreichen,
        // damit die App auch unter einer anderen Adresse offline oeffnet.
        if(e.request.mode === "navigate") return caches.match("./index.html");
        return Response.error();
      });
    })
  );
});
