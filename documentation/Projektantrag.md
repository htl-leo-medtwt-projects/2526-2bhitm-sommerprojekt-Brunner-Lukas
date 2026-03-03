# Projektantrag
## Lukas Brunner | 2BHITM | WebEscape – Gefangen im Netz

---

## 🎮 GRUNDIDEE

**Projektname:** WebEscape – Gefangen im Netz

**Art des Spiels:** Browser-basierter Point-and-Click Escape Room

**Spielidee und zentrales Ziel:**
Du bist auf eine mysteriöse Website gestolpert – und plötzlich wirst du in das Internet hineingezogen. Du befindest dich in einem digitalen Gefängnis aus Daten, Code und verlorenen Netzwerkpaketen. Deine einzige Chance: Löse alle Rätsel in den verschiedenen Räumen und finde den Weg zur Haupttür, bevor das Internet dich für immer einsperrt.

Das zentrale Ziel des Spiels ist es, durch logisches Denken, Beobachtungsgabe und technisches Geschick alle Räume zu durchqueren und am Ende zu entkommen.

**Geschichte:**
Der Spieler erhält zu Beginn eine kurze Einleitung: Er hat versehentlich eine verbotene Seite im Deep Web geöffnet. Ein mysteriöses System hat seine Verbindung gekapert und ihn in eine simulierte digitale Welt gesperrt. Nun muss er Raum für Raum entkommen – jeder Raum repräsentiert eine andere Zone des Internets (z. B. Social Media, Dark Web, Server-Raum). Am Ende wartet die „Haupttür" – der Ausgang zurück in die reale Welt.

---

## 🎮 MECHANIKEN

**Gewinnen & Verlieren:**
Der Spieler gewinnt, wenn er alle Rätsel erfolgreich gelöst und alle Räume durchquert hat. Er verliert, wenn der Countdown abläuft, bevor er entkommen ist. Ein Game-Over-Screen zeigt die verbleibende Zeit und gibt die Möglichkeit, neu zu starten.

**Grundlegende Spielmechanik:**
Das Spiel ist ein klassischer Point-and-Click Escape Room im Browser. Der Spieler befindet sich in einem Raum und muss durch genaues Beobachten, Klicken auf Objekte und Eingeben von Codes weiterkommen. Ist ein Raum abgeschlossen, öffnet sich die Tür zum nächsten. Das Spiel endet erst, wenn alle Räume erfolgreich abgeschlossen wurden und die finale Haupttür geöffnet werden kann.

**Aktionen & Steuerung:**
- **Klicken** auf Objekte im Raum, um Hinweise oder Gegenstände zu erhalten
- **Code-Eingabe** über ein Eingabefeld (ausschließlich numerische Codes)
- **Browser-Inspektor (DevTools / F12):** Versteckte Hinweise sind im HTML/CSS/JavaScript-Code der Seite eingebaut – wer genau schaut, findet sie
- **Browser-Konsole:** Bestimmte Hinweise erscheinen nur in der Console – der Spieler muss aktiv dort nachschauen

**Herausforderungen:**
- Rätsel, deren Lösung sich aus mehreren Hinweisen im Raum zusammensetzt
- Versteckte Hinweise im Quellcode der Seite (HTML-Kommentare, console.log)
- Zeitdruck durch einen sichtbaren Countdown-Timer
- Ablenkungen und Fakeouts – nicht jedes Objekt ist ein echter Hinweis

**Level & Progression:**
Das Spiel ist in mehrere Räume (Level) unterteilt, die thematisch unterschiedlich gestaltet sind:
1. **Raum 1 – Der Login-Screen** *(Tutorial, einfache Einstiegsrätsel)*
2. **Raum 2 – Das Social-Media-Labyrinth** *(mittlere Schwierigkeit)*
3. **Raum 3 – Der Server-Keller** *(schwere Rätsel, viele Hinweise im Code)*
4. **Finale – Die Haupttür** *(Kombination aller gesammelten Codes)*

Die Schwierigkeit steigt von Raum zu Raum. Frühe Räume führen den Spieler sanft an die DevTools-Mechanik heran, spätere Räume setzen dieses Wissen voraus.

**USP – Was macht dieses Spiel besonders?**
Das Spiel soll ein klassischen Escape Room mit Web Technologien verbinden.

**Spielablauf (Skizze):**
```
Start → Intro-Cutscene → Raum 1 → [Rätsel lösen] → Tür öffnet sich
→ Raum 2 → [Rätsel lösen] → Tür öffnet sich
→ Raum 3 → [Rätsel lösen] → Haupttür erscheint
→ Finaler Code eingeben → Entkommen! → Outro & Highscore
                  ↓ (bei Timer = 0)
              Game Over → Neustart
```

---

## 🎮 ZIELGRUPPE

**Altersgruppe:** 12 Jahre und älter

**Spielertyp:**
Das Spiel richtet sich sowohl an Gelegenheitsspieler, als auch an erfahrene Gamer und technikaffine Personen.