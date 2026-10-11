# GEKKO-Rechner — Ordner zum Veröffentlichen

Dieser Ordner ist so gebaut, dass er unverändert als GitHub-Pages-Seite laufen kann —
dasselbe Muster wie `JaKo-OdyC/gekko-pruefwerkzeug`. **Noch ist nichts veröffentlicht.**

## Was drin ist

| Datei | Zweck |
|---|---|
| `index.html` | Die ganze Anwendung: Rechner, Logo, Arbeitsmappe. Eine Datei, 189 KB |
| `manifest.webmanifest` | Macht die Seite installierbar („Zum Startbildschirm") |
| `sw.js` | Hält die Seite offline verfügbar |
| `zeichen/` | App-Zeichen: der GEKKO-Gecko auf Türkis — `zeichen-192.png`, `zeichen-512.png`, `apple-touch-icon.png` und `favicon-64.png` (letzteres setzt der Bauschritt in die Seite ein, ausgeliefert wird es nicht) |
| `.nojekyll` | Verhindert, dass GitHub Pages den Ordner umbaut |

Die Arbeitsmappe steckt **in** `index.html`. Das ist Absicht: Wer die Seite auf seinen
Rechner speichert, hat die Mappe mit dabei. Ohne Einbettung hätte die gespeicherte Kopie
einen Excel-Knopf, der ins Leere greift.

## Drei Betriebszustände

Die Seite verhält sich unterschiedlich, je nachdem, woher sie kommt — und sie sagt es
auch, in einer Zeile unter den Schaltflächen.

**Im Netz** (`https://…`, im gewöhnlichen Browserfenster): Eingaben werden **nicht**
gespeichert. Jeder Aufruf beginnt bei den Standardwerten. So sieht jeder Betrieb dasselbe,
und niemand erbt fremde Zahlen.

**Auf dem Gerät** (heruntergeladene Datei): Jede Änderung überschreibt die eigenen
Standardwerte. Beim nächsten Öffnen stehen die Betriebszahlen wieder da. „Standardwerte
wiederherstellen" bringt den Auslieferungszustand zurück.

**Als App eingerichtet** (über „Installieren" oder „Zum Home-Bildschirm"): wie auf dem
Gerät — die Eingaben bleiben. Die App lädt über `https://`, gehört aber dem Gerät wie eine
abgelegte Datei.

> Dieser dritte Zustand war zwar gebaut, wurde aber bis zum 11.10.2026 nie erreicht: Die
> Betriebsart-Zeile fragte, ob die Seite aus dem Netz kommt, und das trifft auf die
> installierte App genauso zu. Sie speicherte also und schrieb daneben, sie speichere
> nicht — eine falsche Zusage über Datenverhalten. Jetzt fragt sie, was tatsächlich gilt.

> **Jede gespeicherte Kopie hat ihren eigenen Speicherplatz.** Lokal geöffnete Dateien
> teilen sich einen Herkunftsort; mit einem festen Schlüssel würde eine zweite Kopie die
> Zahlen der ersten lesen. Der Schlüssel hängt deshalb am mitgegebenen Zustand der Kopie.

> **Offen und auf dem Gerät zu prüfen:** Ob der Browser bei einer lokal geöffneten Datei
> überhaupt einen Speicher erlaubt, ist von Browser zu Browser verschieden. Die Seite
> fängt das ab und schreibt in die Betriebsart-Zeile, wenn es nicht geht. Beim ersten
> Herunterladen diese Zeile lesen.

## Veröffentlichen

1. Neues Repo anlegen, etwa `JaKo-OdyC/gekko-rechner`. **Nicht** in `prompt-dash` und
   nicht in ein bestehendes Repo.
2. Inhalt dieses Ordners ins Repo legen (nicht den Ordner selbst — `index.html` muss in
   der Wurzel liegen).
3. Settings → Pages → Source: `main`, Ordner `/`.
4. Nach ein paar Minuten läuft die Seite unter `https://jako-odyc.github.io/gekko-rechner/`.

**Impressumspflicht.** Eine öffentlich zugängliche Seite eines Projektträgers braucht in
Deutschland eine Anbieterkennzeichnung. Die Seite hat derzeit keine: Im Fuß stehen
Fördergeber und Begleitinstitut, aber weder die verantwortliche Stelle noch eine
Kontaktmöglichkeit. Vor der Veröffentlichung zu klären, wer Anbieter ist, und dann
Impressum und Datenschutzhinweis ergänzen. Letzterer ist kurz, weil die Seite nichts
überträgt — aber er fehlt eben auch.

**Diese Datei selbst** enthält interne Abstimmungsvermerke. Vor dem ersten Push prüfen,
ob sie so ins öffentliche Repo soll, oder sie auf das Technische kürzen.

**Vor Schritt 1 zu klären, weil es keine technische Frage ist:** Auf der Seite stehen das
GEKKO-Logo, der Fördergeber und das BIBB. Eine öffentliche Adresse damit ist
Projektkommunikation und gehört in die Abstimmung mit **UG_1 Öffentlichkeitsarbeit**. Im
Kopf der Seite steht derzeit „Entwurf, nicht veröffentlicht"; dieser Vermerk sollte erst
weichen, wenn das geklärt ist.

## Neu bauen

`index.html` wird erzeugt, nicht von Hand bearbeitet. Quelle ist
`../tri/seite_vorlage.html`:

```bash
python ../tri/baue_seite.py ../tri/seite_vorlage.html ../tri/gekko_logo.png \
       index.html "11. Oktober 2026" \
       ../rechner/GEKKO_Vergleichsrechner_Anlass1_Prototyp_2026-10-10_F13.xlsx
```

Das Bauskript bricht ab, wenn ein Verweis in die Seite gerät, der beim Öffnen von einem
fremden Server lädt — geprüft werden `src`, `href`, `srcset`, `poster`, `data`, `action`,
`url(…)` in CSS, `@import` und `http-equiv="refresh"`, mit einfachen, doppelten und **ohne**
Anführungszeichen. Erlaubt sind nur die beiden anklickbaren Verweise zu LinkedIn und
gekko-projekt.de (dazu die eigene Adresse, wenn eine übergeben wurde — sie steht im
Abschnitt „Auf das Gerät holen" zum Abtippen).

Danach läuft eine **zweite Prüfung ohne Mustersuche**: Jede `http`- oder `https`-Adresse in
der fertigen Datei muss auf dieser Liste stehen, sonst Abbruch. Die erste Prüfung kennt nur
die Formen, an die ich gedacht habe; die zweite kennt keine Form. Beide sind mit drei
Gegenproben belegt (unquotiertes `src`, `refresh`-Weiterleitung, ein frei erfundenes
`data-`Attribut — die ersten zwei fängt die Mustersuche, die dritte nur die Gegenprobe).

Der Bauschritt braucht drei Eingänge: Vorlage, Logo und — still im Hintergrund —
`zeichen/favicon-64.png`. Fehlt das Zeichen, bricht er mit einer lesbaren Meldung ab.

**Zur Verbreitung einer neuen Fassung:** Das Dienstskript fragt erst das Netz und nimmt
den Vorrat nur als Rückfall. Jedes Gerät bekommt die neue Fassung also beim nächsten
Aufruf mit Netz von selbst — dafür muss nichts hochgezählt werden.

Die Zahl in `VORRAT` (`gekko-rechner-1` → `gekko-rechner-2`) hat einen anderen Zweck: Sie
erzwingt beim nächsten Besuch einen frischen Vorrat. Nötig, wenn sich die Liste `DATEIEN`
ändert oder wenn ein Vorrat verdorben ist. Gelöscht werden dabei nur die eigenen alten
Vorräte, erkennbar am Präfix `gekko-rechner-` — fremde Anwendungen auf derselben Adresse
bleiben unberührt.

**Welche Arbeitsmappe eingebettet wird**, steht im letzten Argument. Die Entscheidung
zwischen F11 und F13 ist noch offen; hier steckt derzeit F13.

## Geprüft am 11. Oktober 2026

Im Netz (über einen lokalen Server): Manifest eingehängt und gültig, drei Zeichen,
Apple-Zeichen gesetzt, Dienstskript registriert und aktiv, Vorrat mit allen sechs Dateien
gefüllt, nichts gespeichert, „Diese Seite speichern" sichtbar.

Auf dem Gerät (Logik nachgestellt): Eingaben werden abgelegt — auch die Schalterstellungen
und der Kostenmodus —, nach einem Neustart vollständig wiederhergestellt, „Standardwerte
wiederherstellen" setzt alles zurück und leert den Speicher wirklich.

Mappe: aus der ausgelieferten Seite herausgelöst, 68.301 Bytes, bytegleich mit der Datei
im Ordner `rechner`, öffnet als Arbeitsmappe mit elf Blättern, null Formelfehler.
