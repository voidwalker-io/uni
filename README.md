⚖️ Recht-Quiz – Web App zur Prüfungsvorbereitung<br>

Eine interaktive Lern-App zur Vorbereitung auf die Rechtsprüfung (Öffentliches Recht, Zivilrecht, EU-Recht usw.).<br>
Die App stellt Wahr/Falsch-Fragen aus einem dynamischen Fragenpool, wertet die Antworten in Echtzeit aus und berechnet eine Note basierend auf dem offiziellen Notenspiegel der Lehrveranstaltung.<br>

✨ Features<br>
Interaktives Quiz: Wahr/Falsch-Fragen aus Altklausuren und einem erweiterbaren Fragenpool.<br>

Flexible Lernsitzungen: Auswahl der Anzahl der Fragen pro Durchlauf.<br>

Sofortiges Feedback:<br>
Anzeige der richtigen Antwort.<br>
Ausführliche, didaktische Erklärung zu jeder Frage.<br>
Notenberechnung: Automatische Berechnung der Gesamtpunkte (0 bis 50) und der Note (1 bis 5).<br>
Lernfortschritt: Speicherung des Status im LocalStorage des Browsers.<br>

🛠 Tech Stack<br>
Backend: Node.js, Express<br>
Frontend: HTML5, CSS3 (Vanilla), JavaScript (Vanilla)<br>
Datenbasis: questions.json (JSON-basiertes Format für Fragen und Erklärungen)<br>
Persistence: LocalStorage API<br>

🚀 Installation & Setup<br>
Voraussetzung: Node.js ist installiert (empfohlen ab Version 18).<br>
   
1. Repository klonen<br>
   
Lade den Code auf deinen lokalen Rechner:<br>
git clone https://github.com/voidwalker-io/uni.git<br>
cd uni<br>

2. Abhängigkeiten installieren<br>

Installiere die benötigten Pakete (Express, etc.):<br>
npm install<br>

3. App starten<br>

Starte den lokalen Server:<br>
node server.js<br>
oder, falls ein Start-Script definiert ist:<br>
npm start<br>


Öffne danach deinen Browser und gehe auf: http://localhost:3000 (oder den in der Konsole angezeigten Port).<br>

📂 Datenstruktur (questions.json)<br>

Die Fragen werden in der Datei questions.json gespeichert. Das Format sieht wie folgt aus:<br>

[<br>
{<br>
    "id": "Q01",<br>
    "statement": "In den Angelegenheiten der örtlichen Raumplanung (Art 118 Abs. 3 Z 9 B-VG) kann die Landesregierung der Gemeinde Weisungen erteilen.",<br>
    "correctAnswer": false,<br>
    "topic": "Gemeinden und Selbstverwaltung",<br>
    "source": "Fragenpool ÖffR",<br>
    "points": 1,<br>
    "explanation": "Die örtliche Raumplanung gehört zum eigenen Wirkungsbereich der Gemeinden. In diesem Bereich sind Gemeinden weisungsfrei; Bund und Land dürfen nur Rechtsaufsicht ausüben (Kontrolle der Gesetzmäßigkeit), aber keine inhaltlichen Weisungen erteilen."<br>
  }<br>
]<br>


📝 Lizenz<br>

Dieses Projekt wurde für akademische Zwecke erstellt.
