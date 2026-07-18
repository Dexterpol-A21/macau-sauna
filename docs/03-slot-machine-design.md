# Smart Match — Diseño Funcional v2.1

> **Versión**: 2.1 — Slot Machine de 3 carretes con símbolos de cartas, siempre gana  
> **Fecha**: Jul 16, 2026  
> **Decisión final**: Slot machine de 3 carretes con íconos de poker (♠ ♥ ♦ ♣) que simula un jackpot real.  
>   El resultado siempre es una combinación ganadora (3 símbolos iguales).  
>   Cada combinación corresponde a un premio fijo (free service o descuento).  
>   El administrador siempre sabe qué premio recibe el cliente = fácil de gestionar.

---

## 🎯 CONCEPTO FINAL

```
┌─────────────────────────────────────────────────────┐
│          ★  WIN A FREEBIE  ★                        │
│   Celebrate our new sauna opening —                 │
│   pull the lever & match the symbols!               │
│                                                     │
│   ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│   │    ♦     │  │    ♣     │  │    ♠     │        │
│   │  REEL 1  │  │  REEL 2  │  │  REEL 3  │        │
│   │    ♥     │  │    ♥     │  │    ♥     │ ← ALL ♥ │
│   │    ♠     │  │    ♦     │  │    ♦     │        │
│   └──────────┘  └──────────┘  └──────────┘        │
│        🎰 PULL THE LEVER 🎰            ║           │
│                                                     │
│   ┌─────────────────────────────────────────────┐  │
│   │  🎉 JACKPOT! You won:                       │  │
│   │  ♥ ♥ ♥ — Free Head Massage (230 MOP value) │  │
│   │  [Claim Now → WhatsApp]                     │  │
│   └─────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Reglas del juego

1. **3 carretes**, cada uno muestra símbolos de poker: ♠ ♥ ♦ ♣
2. Cada símbolo tiene su propio color (no rojo/negro genérico, sino los accent colors del sitio)
3. El usuario jala la palanca → los 3 carretes giran como slot machine real
4. Se detienen uno por uno (delay escalonado: reel 1 → reel 2 → reel 3)
5. **SIEMPRE** caen en 3 símbolos iguales (simula jackpot)
6. Dependiendo del símbolo que salió, es el premio

### Correspondencia Símbolo → Premio

| Símbolo | Color | Premio | Valor |
|---------|-------|--------|-------|
| ♠ (Spade) | `#C9A84C` (Gold) | **10% OFF** first visit | — |
| ♥ (Heart) | `#FF1493` (Pink Neon) | **Free Head Massage** | 230 MOP |
| ♦ (Diamond) | `#4ADE80` (Green) | **Free Reflexology** | 230 MOP |
| ♣ (Club) | `#FB923C` (Orange) | **Free Back Rub** | 298 MOP |

**Alternativa (más premios):** 5 símbolos con 5 premios distintos.

| Símbolo | Color | Premio | Valor |
|---------|-------|--------|-------|
| ♠ | `#C9A84C` | **10% OFF** | — |
| ♥ | `#FF1493` | **Free Head Massage** | 230 MOP |
| ♦ | `#4ADE80` | **Free Reflexology** | 230 MOP |
| ♣ | `#FB923C` | **Free Back Rub** | 298 MOP |
| ★ (Star) | `#C026FF` | **Free Manicure** | 220 MOP |

---

## 🎞️ CÓMO FUNCIONA CADA CARRETE

### Estructura de la tira

Cada carrete contiene 12+ posiciones con una mezcla de los símbolos.  
La tira se repite varias veces (COPIES=5) para que el giro sea largo y dramático.

```
Posición:  0   1   2   3   4   5   6   7   8   9  10  11
Reel 1:   ♠   ♥   ♦   ♣   ★   ♠   ♥   ♦   ♣   ★   ♠   ♥
Reel 2:   ♥   ♦   ♣   ★   ♠   ♥   ♦   ♣   ★   ♠   ♥   ♦
Reel 3:   ♦   ♣   ★   ♠   ♥   ♦   ♣   ★   ♠   ♥   ♦   ♣
```

Cada carrete tiene la misma secuencia pero **rotada** (offset diferente) para que visualmente no sean idénticos mientras giran. Pero la lógica garantiza que **siempre paren en el mismo símbolo en los 3**.

### Lógica del "siempre gana"

```ts
// 1. Se elige aleatoriamente un símbolo ganador
const winningSymbol = pickRandom(SYMBOLS);

// 2. Para cada carrete, se calcula en qué posición de la tira está ese símbolo
//    (como la tira se repite 5 veces, hay múltiples posiciones válidas)

// 3. Se calcula el targetY para que cada carrete aterrice en ese símbolo

// 4. Los carretes frenan con delay escalonado (0s, 0.3s, 0.6s)
//    → efecto dramático de slot machine real
```

### Animación por carrete

```ts
transition: {
  type: "spring",
  stiffness: 35,
  damping: 9,
  mass: 1.8,
  delay: reelIdx * 0.35,  // reel 0 frena primero, reel 2 al final
}
```

Esto produce el clásico efecto:
1. Reel 1 se detiene — "va ♥..."
2. Reel 2 se detiene — "¡va ♥ también!"
3. Reel 3 frenando... frenando... — "¡♥! ¡JACKPOT!"

---

## 🎨 COLORES POR SÍMBOLO

Cada símbolo tiene un color único (los accent colors del sitio):

| Símbolo | Color hex | Nombre |
|---------|-----------|--------|
| ♠ | `#C9A84C` | Gold |
| ♥ | `#FF1493` | Pink Neon |
| ♦ | `#4ADE80` | Green |
| ♣ | `#FB923C` | Orange |
| ★ | `#C026FF` | Violet |

Cada celda del carrete muestra el símbolo en su color + un borde sutil del mismo color:

```
┌──────────┐
│          │
│    ♥     │  ← símbolo en #FF1493
│          │
└──────────┘
  borde: #FF149330
  bg: gradiente oscuro
```

---

## 🎉 PANTALLA DE RESULTADO (JACKPOT)

Cuando los 3 carretes muestran el mismo símbolo:

```
┌──────────────────────────────────────────┐
│                                          │
│           🎉  JACKPOT!  🎉              │
│                                          │
│           ♥     ♥     ♥                 │
│                                          │
│     You won: FREE HEAD MASSAGE           │
│     (230 MOP value — yours today!)       │
│                                          │
│     Show this screen at reception or     │
│     claim via WhatsApp now.              │
│                                          │
│     ┌──────────────────────────┐        │
│     │  💬 Claim via WhatsApp   │        │
│     └──────────────────────────┘        │
│                                          │
│         🎰 PULL AGAIN 🎰                │
│                                          │
└──────────────────────────────────────────┘
```

### Sonido del jackpot

- Durante el giro: ratchet continuo (ya existe)
- Al frenar reel 1: tick
- Al frenar reel 2: tick
- Al frenar reel 3 y coincidir: **fanfarria de jackpot** (3 tonos ascendentes + ding largo)
- Confeti dorado

---

## 📐 LAYOUT

```
┌──────────────────────────────────────────────┐
│  ★  CELEBRATE OUR NEW OPENING  ★            │
│  Win a free VIP extra — just pull the lever  │
│                                              │
│  ┌─ Bulbs top ─────────────────────────────┐│
│  │                                          ││
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ║  🟡  ││
│  │  │  ♠   │  │  ♥   │  │  ♦   │  ║      ││
│  │  │      │  │      │  │      │  ║ LEVER││
│  │  │  ♥   │  │  ♦   │  │  ♣   │  ║      ││
│  │  │      │  │      │  │      │  ║      ││
│  │  │  ♦   │  │  ♣   │  │  ★   │  ║      ││
│  │  └──────┘  └──────┘  └──────┘  ║      ││
│  │   REEL 1    REEL 2    REEL 3   ╚══════││
│  │                                          ││
│  ├─ Bulbs bottom ───────────────────────────┤│
│  │         Macau · 12 Partner Venues        ││
│  └──────────────────────────────────────────┘│
│                                              │
│  ┌─── RESULT CARD (slide-up) ──────────────┐│
│  │  🎉 JACKPOT! ♥ ♥ ♥                      ││
│  │  Free Head Massage · Claim Now →         ││
│  └──────────────────────────────────────────┘│
└──────────────────────────────────────────────┘
```

---

## 🧩 IMPLEMENTACIÓN

### Componentes existentes (se modifican)

| Archivo | Cambio |
|---------|--------|
| `SlotMatch.tsx` | Reemplazar `VenueRow` por `SymbolCell`. 3 carretes en vez de 1. Lógica "siempre matching". Resultado muestra premio, no venue. |
| `SlotLever.tsx` | Sin cambios. |
| `SlotBulbs.tsx` | Sin cambios. |
| `useSlotSound.ts` | Añadir `playJackpot()` (arpegio de 3 tonos + ding). |

### Lo que se elimina

- Código de venue reel (ya no se usa para venues)
- `ResultCard` de venue (se reemplaza por `JackpotCard` de premio)

### Lo nuevo

- `SymbolCell`: celda que muestra un símbolo de poker con su color
- `JackpotCard`: card de resultado que muestra el premio ganado
- Lógica `pickWinningSymbol()` que elige símbolo + premio juntos

---

## 🔄 FLUJO COMPLETO

```
1. IDLE
   → 3 carretes quietos mostrando mezcla de símbolos
   → Palanca arriba con glow pulsante
   → Texto: "Pull the lever — match 3 symbols to win!"
   → Bulbs tenues

2. USER PULLS LEVER
   → Palanca baja
   → Sonido: click
   → Se elige winningSymbol aleatoriamente

3. SPINNING
   → Los 3 carretes giran con motion blur
   → Bulbs parpadeando
   → Sonido: ratchet continuo

4. REEL 1 STOPS (~2.0s)
   → Motion blur off
   → Muestra el winningSymbol
   → Sonido: tick

5. REEL 2 STOPS (~2.35s)
   → Muestra el MISMO winningSymbol
   → Sonido: tick
   → Usuario piensa: "¡va matching!"

6. REEL 3 SLOWING (~2.7s)
   → Desacelera, tick-tick-tick...
   → Se detiene en el MISMO símbolo
   → Sonido: ¡JACKPOT fanfarria!

7. RESULT
   → Los 3 símbolos brillan simultáneamente
   → Confeti dorado
   → JackpotCard se revela con slide-up
   → Muestra: "🎉 JACKPOT! ♥♥♥ — Free Head Massage"
   → CTA: "Claim Now → WhatsApp"
   → Palanca sube lentamente

8. READY
   → Máquina lista para otro pull
```

---

## 📊 VENTAJAS DE ESTE DISEÑO

| Ventaja | Detalle |
|---------|---------|
| **Auténtico** | 3 carretes con símbolos = casino real. Matching symbols = jackpot. |
| **Emocionante** | La pausa entre reel 1, reel 2, y reel 3 genera hype máximo |
| **Control total** | El admin SIEMPRE sabe qué premio da. Fácil de gestionar. |
| **Siempre gana** | El cliente nunca se va con las manos vacías |
| **Compartible** | Screenshot de "♥♥♥ JACKPOT!" es oro para WhatsApp |
| **Reutiliza código** | Palanca, bulbs, sonido — todo lo ya construido se mantiene |
| **Simple** | 4-5 premios fijos, sin lógica compleja de matching |
