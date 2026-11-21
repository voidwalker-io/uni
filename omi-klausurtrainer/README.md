# OMI Klausurtrainer

Interaktive Lernseite zur VO **Objektorientierte Modellierung und Implementierung (OMI)**: Das komplette Lernskriptum ist in kurze Lerneinheiten aufgeteilt und um Lerntools ergänzt, mit denen man sich in fünf Tagen auf die Klausur (Closed Book, 100 Minuten) vorbereitet.

## Funktionen

- **Skriptum:** 49 Lerneinheiten in vier Teilen (OOP in Java, Entwurfsprinzipien, UML, Entwurfsmuster) mit Codebeispielen, UML-Diagrammen, Vergleichstabellen und Klausurfallen
- **Lernkarten:** 58 Karten mit Spaced Repetition (Leitner-Boxen)
- **Quiz:** 44 Fragen (Multiple Choice, Richtig/Falsch, Lückentext), jede mit Erklärung
- **Code-Ausgabe-Trainer:** Polymorphie, Overloading/Overriding, statische Bindung
- **Muster-Erkenner:** Szenario lesen, dann passendes Pattern oder verletztes Prinzip wählen
- **LCOM-Rechner** und **UML-Notations-Trainer**
- **Probeklausur:** 10 Aufgaben, 100-Minuten-Timer, Selbstbewertung und Note nach VO-Schlüssel
- 5-Tage-Lernplan, Liste der Schwachstellen, Volltextsuche, Cheat-Sheet, Hell- und Dunkelmodus

Der Fortschritt wird im `localStorage` des Browsers gespeichert.

## Lokal starten

Die Seite lädt `content.json` und `data.json` per `fetch`, deshalb braucht sie einen einfachen Webserver. Direkt per `file://` geöffnet funktioniert sie nicht:

```bash
cd omi-klausurtrainer
python3 -m http.server 8000
```

Danach http://localhost:8000 öffnen.

## Dateien

| Datei | Inhalt |
| --- | --- |
| `index.html` | Seite, Styles und gesamte Logik (ohne Build-Schritt) |
| `content.json` | Lerneinheiten des Skriptums und Probeklausur |
| `data.json` | Lernkarten, Quizfragen, Trainer-Aufgaben, Lernplan |
