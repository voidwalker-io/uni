⚖️ Recht-Quiz – Web App zur Prüfungsvorbereitung

Eine interaktive Lern-App zur Vorbereitung auf die Rechtsprüfung (Öffentliches Recht, Zivilrecht, EU-Recht usw.).
Die App stellt Wahr/Falsch-Fragen aus einem dynamischen Fragenpool, wertet die Antworten in Echtzeit aus und berechnet eine Note basierend auf dem offiziellen Notenspiegel der Lehrveranstaltung.

✨ Features
Interaktives Quiz: Wahr/Falsch-Fragen aus Altklausuren und einem erweiterbaren Fragenpool.
Flexible Lernsitzungen: Auswahl der Anzahl der Fragen pro Durchlauf.
Sofortiges Feedback:
Anzeige der richtigen Antwort.
Ausführliche, didaktische Erklärung zu jeder Frage.
Notenberechnung: Automatische Berechnung der Gesamtpunkte (0 bis 50) und der Note (1 bis 5).
Lernfortschritt: Speicherung des Status im LocalStorage des Browsers.

🛠 Tech Stack
Backend: Node.js, Express
Frontend: HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
Datenbasis: questions.json (JSON-basiertes Format für Fragen und Erklärungen)
Persistence: LocalStorage API

🚀 Installation & Setup
Voraussetzung: Node.js ist installiert (empfohlen ab Version 18).

1. Repository klonen
   
Lade den Code auf deinen lokalen Rechner:
git clone <DEIN_REPO_URL_HIER_EINFÜGEN>
cd <DEIN_REPO_ORDNER_NAME>

2. Abhängigkeiten installieren

Installiere die benötigten Pakete (Express, etc.):
npm install

3. App starten

Starte den lokalen Server:
node server.js
# oder, falls ein Start-Script definiert ist:
npm start


Öffne danach deinen Browser und gehe auf: http://localhost:3000 (oder den in der Konsole angezeigten Port).

📂 Datenstruktur (questions.json)

Die Fragen werden in der Datei questions.json gespeichert. Das Format sieht wie folgt aus:

[
{
    "id": "Q01",
    "statement": "In den Angelegenheiten der örtlichen Raumplanung (Art 118 Abs. 3 Z 9 B-VG) kann die Landesregierung der Gemeinde Weisungen erteilen.",
    "correctAnswer": false,
    "topic": "Gemeinden und Selbstverwaltung",
    "source": "Fragenpool ÖffR",
    "points": 1,
    "explanation": "Die örtliche Raumplanung gehört zum eigenen Wirkungsbereich der Gemeinden. In diesem Bereich sind Gemeinden weisungsfrei; Bund und Land dürfen nur Rechtsaufsicht ausüben (Kontrolle der Gesetzmäßigkeit), aber keine inhaltlichen Weisungen erteilen."
  }
]


📝 Lizenz

Dieses Projekt wurde für akademische Zwecke erstellt.
