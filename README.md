# Pokedex PWA

Aplikacja typu Full-Stack pełniąca funkcję nowoczesnego katalogu Pokemonów. Stworzona na zaliczenie przedmiotu, zrealizowana zgodnie ze wszystkimi wymogami.

## Zrealizowane wymagania

### 3.5 Zaawansowany Walidator Formularza

- Walidacja **wielu reguł**: sprawdzana jest długość nazwy (min. 3), użyto **wyrażeń regularnych (RegEx)** do sprawdzenia proprawności adresu e-mail.
- Hasło posiada złożone wymogi: min. 8 znaków, wielkie/małe litery, min. jedna cyfra, min. jeden znak specjalny.
- Walidator na żywo sprawdza też, czy pole "Potwierdź hasło" odpowiada oryginalnie wpisanemu hasłu.
- Użytkownik nie otrzyma dostępu do aplikacji z danymi, dopóki walidacja nie przejdzie pozytywnie po stronie czystego JavaScriptu.

### 4.0 - Aplikacja wykorzystująca API

- Aplikacja po pomyślnej walidacji dołącza żądanie na serwer, po czym przechodzi na dashboard z listingiem Pokemonów.
- Dane w czasie rzeczywistym zaczytywane są z **wymaganego zewnętrznego API** (`pokeapi.co`).
- Odpowiednio wydobywane są endpointy oraz identyfikatory duszki (API URL) potrzebne do załadowania dla nich oficjalnych grafik tzw. `artworks`.

### 4.5 - Strona PWA

- Aplikacja została zbudowana jako **Progressive Web App (PWA)**.
- Zaimplementowano plik `manifest.json`.
- Wykorzystana została dedykowana wtyczka Next-PWA ułatwiająca render offline (wsparta przez serwer Webpack w środowisku wg wbudowanego skryptu startowego paczki).
- Przeglądarki systemowe pozwalają na deweloperską **instalację** programu w formie skrótu na ekranie.

### 5.0 - Aplikacja w Node.js (Przetwarzanie API na własnym serwerze)

- Projekt korzysta z frameworka `Next.js`, mającym **wbudowane środowisko po stronie Node.js**.
- Rejestracja trafia asynchronicznie przez żądanie typu `POST` poprzez funkcję Fetch, na własny, odseparowany **własny plik serwerowy/API** w folderze routes (`src/app/api/register/route.ts`).
- Skrypt w samym Node.js sprawdza przesłany JSON i od siebie wysyła flagę akceptacji.

---

## 🛠 Instalacja i uruchomienie

Aplikacja wykorzystuje środowisko **Node.js** i managera pakietów **npm**.

1. Otwórz wiersz poleceń z poziomu folderu głównego `pokedex`.
2. Zaktualizuj i pobierz paczki poprzez menedżer komendą:

```bash
npm install
```

3. Uruchom serwer developerski z trybem PWA / Webpacka:

```bash
npm run dev
```

4. Przejdź w przeglądarce pod wygenerowany link deweloperski, najczęściej to:

```
http://localhost:3000
```

## 🎨 Wykorzystana Paleta Technologii Full-Stack

- **React 19 & Next.js 16 (App Router)**
- **Środowisko Node.js**
- **Tailwind CSS 4.0**
- **TypeScript**
- **next-pwa**
