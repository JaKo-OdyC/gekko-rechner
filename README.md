# GEKKO-Rechner — Ab wann lohnt sich in der Logistik ein Weiterbildungsmentor?

**Entwurfsstand. Nicht freigegeben.** Diese Seite trägt den Vermerk „Entwurf, nicht
veröffentlicht" sichtbar im Kopf. Sie ist technisch erreichbar, aber inhaltlich nicht
abgestimmt: Eine Anbieterkennzeichnung und ein Datenschutzhinweis fehlen noch. Bitte die
Adresse nicht weiterverbreiten, solange der Vermerk im Kopf steht.

→ https://jako-odyc.github.io/gekko-rechner/

## Was die Seite rechnet

Eine **Schwelle**, keine Ersparnis: Was müsste in einem Betrieb im Jahr eintreten, damit
sich die Stunden eines Weiterbildungsmentors rechnen? Drei Wege zur selben Schwelle —
vermiedene Neueinstellungen, Ausfalltage in der Gruppe, Ausfalltage je Beschäftigtem. Einer
davon genügt; sie zählen nicht zusammen.

Die Seite behauptet **keine Wirkung**. Ob ein Weiterbildungsmentor diese Schwellen
erreicht, ist nicht belegt — die Begleitforschung des Bundesinstituts für Berufsbildung
weist dazu ausdrücklich keine Effektgrößen aus. Jeder Eingabewert ist in der Quellentabelle
am Fuß der Seite als Referenzwert, Ableitung oder offengelegte Annahme ausgewiesen, mit
Fundstelle.

## Was sie mit Daten tut

Nichts, was den Nutzer betrifft. Sie rechnet ausschließlich im Browser, lädt von fremden
Servern nichts nach — Logo, Zeichen und Arbeitsmappe liegen in der Datei selbst — und setzt
keine Cookies.

Über diese Adresse aufgerufen wird **nichts gespeichert**: Jeder Aufruf beginnt bei den
Vorbelegungen. Wer die Seite herunterlädt oder als App einrichtet, dessen Eingaben bleiben
**auf dem eigenen Gerät** und werden nicht übertragen. Die Seite sagt in einer eigenen
Zeile unter den Schaltflächen, in welchem der drei Zustände sie gerade ist. „Standardwerte
wiederherstellen" löscht die gespeicherten Werte.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | die ganze Anwendung: Rechner, Logo, eingebettete Excel-Arbeitsmappe |
| `manifest.webmanifest` | macht die Seite installierbar („Zum Startbildschirm") |
| `sw.js` | hält die Seite offline verfügbar; Netz zuerst, Vorrat als Rückfall |
| `zeichen/` | App-Zeichen in 192 und 512 Pixeln sowie für iOS |
| `.nojekyll` | verhindert, dass GitHub Pages den Ordner umbaut |

`index.html` wird **erzeugt, nicht von Hand bearbeitet** — aus einer Vorlage, die das
Bauskript prüft: Gerät ein Verweis in die Seite, der beim Öffnen von einem fremden Server
lädt, bricht der Bau ab.

## Zum Projekt

Entstanden im Verbundvorhaben GEKKO — Qualifizierung und Etablierung von
Weiterbildungsmentorinnen und -mentoren. Gefördert vom Bundesministerium für Bildung,
Familie, Senioren, Frauen und Jugend; wissenschaftlich-administrativ begleitet vom
Bundesinstitut für Berufsbildung.

Die Seite ist eine Überschlagsrechnung und kein Wirkungsnachweis. Sie ersetzt keine
betriebswirtschaftliche oder rechtliche Beratung.
