# 🧠 SE1 Lernwebsite – Vorbereitung auf die Zwischenklausur

Eine interaktive Lernwebsite für **Software Engineering 1** (Zwischenklausur, Stoff ca. Blatt 1–4, Blatt 5 als Bonus).
Das komplette Lernskriptum mit Musterlösungen und Diagrammen plus Werkzeuge zum aktiven Üben – alles in einer einzigen HTML-Datei, ohne Installation.

## ✨ Bereiche

**Lernen** – Skriptum in 11 Kapiteln: CFG, DFG, PDG, Slicing, SDG, statische/dynamische Analyse, Black-Box-Testen mit JUnit, White-Box-Testen, Selbsttest, Spickzettel. Kapitel lassen sich als erledigt markieren.

**Üben**
- Karteikarten mit Wiederholungsplan (Leitner: wusste ich / unsicher / falsch) und Modus „Definitionen selbst aufschreiben“
- Quiz pro Kapitel mit sofortigem Feedback und Erklärung
- Graph ↔ Code: Kanten von CFG und PDG setzen, aus einem CFG den Code ableiten
- Graph-Slicing: Knoten im PDG/SDG anklicken, prüfen, Zwei-Phasen-Slice (DL1/DL2) Schritt für Schritt
- SDG-Baukasten: Knoten wählen, die sechs Kantenarten setzen, Objekte und Felder
- DEF/USE-Trainer sowie Def-Use-Paare & Datenfluss-Muster
- Testfall-Designer (Äquivalenzklassen, Grenzwerte, V/E/A/R) und JUnit-Lückentexte
- Rechner: Äquivalenzklassen (Weak/Strong/Robust), Grenzwerte, MCDC
- White-Box (Blatt 5): Überdeckung und Mutanten vorhersagen

**Prüfen** – Probeklausur mit 35 Punkten, 100-Minuten-Timer, Auswertung nach Thema und Wiederholungsempfehlungen.

**Fortschritt** – „Wo stehe ich?“, Stand je Thema, alle Übungsaufgaben, 7-Tage-Plan mit Tagesziel.

## 🚀 Starten

```bash
git clone https://github.com/voidwalker-io/uni.git
cd uni
git checkout SE1
python3 -m http.server 8765
```

Dann im Browser `http://localhost:8765` öffnen. Alternativ einfach `index.html` per Doppelklick im Browser öffnen.

## 💾 Speicherung

Der Fortschritt wird im LocalStorage des Browsers gespeichert. Hell- und Dunkelmodus sind umschaltbar, die Seite funktioniert auch am Handy.

## 🛠 Tech Stack

HTML, CSS und JavaScript (Vanilla), Diagramme als SVG, keine Abhängigkeiten außer Google Fonts.

## 📝 Lizenz

Dieses Projekt wurde für akademische Zwecke erstellt.
