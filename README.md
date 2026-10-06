# dc2sc

Astro + Starlight + Keystatic у Docker. Локальне середовище для розробки й наповнення сайту.

## Оформлення VoiceBox

Тема міститься в `src/styles/voicebox.css`: світла чорно-біла палітра, великі заголовки, прямі кути, контрастні рамки та червоний акцент активної сторінки. Шрифти Archivo Black, Work Sans і Space Mono завантажуються через Google Fonts; за відсутності мережі та для непідтримуваних символів використовуються системні резервні шрифти. Налаштування підключення — в `astro.config.mjs`.

## Запуск

У цій папці виконайте:

```powershell
docker compose up -d --build
```

- Сайт: http://localhost:4321/
- Редактор: http://localhost:4321/keystatic

Keystatic працює в local mode без авторизації. Порт контейнера доступний лише на цьому комп'ютері. Контент зберігається в `src/content/docs` на хості через bind mount і залишається після видалення контейнера. Нові сторінки автоматично потрапляють у навігацію Starlight. Зміни конфігурації потребують повторного `docker compose up -d --build`.

## Мови

- English (основна): `/`, `/about/` — файли `src/content/docs/*.mdoc`.
- Українська: `/uk/`, `/uk/about/` — файли `src/content/docs/uk/*.mdoc`.
- Deutsch: `/de/`, `/de/about/` — файли `src/content/docs/de/*.mdoc`.

Перемикач у шапці відкриває переклад поточної сторінки. Назви файлів перекладів мають збігатися. У Keystatic усі версії доступні в колекції «Документація — усі мови»; шлях містить префікс `uk/` або `de/`. Якщо перекладу ще немає, Starlight показує англійський текст із повідомленням про відсутній переклад. Нові тексти перекладаються вручну. Старі англійські адреси `/en/` і `/en/about/` перенаправляються на `/` та `/about/`.

## Команди

```powershell
docker compose ps
docker compose logs -f site
docker compose stop
docker compose start
```

```powershell
docker compose exec site npm run build
```

Статичний сайт генерується у `/app/dist`. Редактор виключено з production-збірки. Для публічного розгортання редактора потрібна окрема конфігурація авторизації та сховища; поточний контейнер призначено для локальної роботи.

---

## 🏛️ DC2SC Metadata Architecture: Three-Axis Distinction

Контентна система DC2SC суворо розмежовує три незалежні осі метаданих:

```text
canonicalState ≠ claimState ≠ researchRole
```

### 1. `canonicalState` (Авторитетність та стабільність відносно канону)
- `frozen`: Канонічний корпус, затверджений та незмінний для поточної дослідницької програми.
- `working`: Активні робочі специфікації та дослідницькі моделі в процесі розробки.
- `provisional`: Тимчасові або робочі гіпотези.
- `superseded`: Застарілий або замінений матеріал (наприклад, рання supplier-first онтологія).
- `none`: Нейтральний/службовий контент.

### 2. `claimState` (Статус чинності твердження/пропозиції)
- `active`: Чинна робоча або канонічна теза.
- `superseded`: Теза замінена новою редакцією.
- `rejected`: Емпірично чи логічно відкинута теза/гіпотеза.

### 3. `researchRole` (Епістемічна та методологічна роль артефакту)
- `concept`: Концептуальне введення / базова ідея.
- `hypothesis`: Формалізована дослідницька гіпотеза.
- `analytical_framework`: Структурний/аналітичний фреймворк (наприклад, 7 модулів, failure framework).
- `stress_test_protocol`: Протокол стрес-тестування (GOLIAF).
- `empirical_result`: Емпіричний результат польових випробувань (E1–E5).
- `none`: Службовий контент без епістемічної ролі.

---

### Приклади класифікації:

```yaml
# 1. Frozen Canonical Narrative Module (src/content/research/module-01-*.md)
contentKind: canonical_module
canonicalState: frozen
lifecycleStatus: approved_for_dev
claimState: active
researchRole: analytical_framework
visibility: public
evidenceLevel: E0
```

```yaml
# 2. Working Research Specification (src/content/research/continuous-rights-gates.md)
contentKind: research_spec
canonicalState: working
lifecycleStatus: approved_for_dev
claimState: active
researchRole: analytical_framework
visibility: public
evidenceLevel: E0
```

```yaml
# 3. GOLIAF Stress-Test Material (src/content/goliaf/travel-decision-map.md)
contentKind: goliaf_artifact
canonicalState: working
lifecycleStatus: approved_for_dev
claimState: active
researchRole: stress_test_protocol
visibility: public
evidenceLevel: E0
```

```yaml
# 4. Superseded Legacy Journal Preview (src/content/journal/more-choice-less-voice.md)
contentKind: editorial_preview
canonicalState: superseded
lifecycleStatus: paused
claimState: superseded
researchRole: concept
visibility: internal
indexable: false
includeInSitemap: false
includeInRss: false
```

---

## 🔍 Repository Provenance Status & Verification Boundary (Phase 3A)

Всі 16 публічних записів канону (12 дослідницьких специфікацій / модулів та 4 артефакти GOLIAF) проходять сувору валідацію походження (`validateProvenance()`) на етапі збірки через маніфест `src/data/repository-source-manifest.ts`.

> **Чесне методологічне застереження (Review Status: `partial`):**
> Локальна цілісність вебартефактів, метаданих та зв'язків канону є повністю валідованою. Проте пряма автоматична синхронізація із зовнішнім сховищем Google Drive у цьому ізольованому локальному середовищі не проводилася і не декларується як верифікована третіми сторонами. Усі публічні сторінки чесно відображають цей статус через компонент `<SourceProvenance />`.

---

## 🎨 Media Constitution: Five-Axis Distinction (Phase 3B.0.1)

Для уникнення змішування типу знань, ролі, походження та авторитету, кожен візуальний та медіа-артефакт розкладається на **5 ортогональних осей**:

| Вісь метаданих | Що саме визначає | Допустимі значення |
|---|---|---|
| **`epistemicBasis`** | На якому типі знання ґрунтується зміст | `conceptual` (концептуальний горизонт E0), `analytical` (структурний/ігровий аналіз), `empirical` (емпіричні спостереження E3–E5), `methodological` (процедурні специфікації), `editorial_context` (контекстні бріфи) |
| **`representationRole`** | Яку функцію візуал виконує в аргументації | `structural_model`, `distinction_matrix`, `argument_contrast`, `workflow_scenario`, `empirical_metric`, `literature_adaptation`, `red_team_challenge`, `failure_analysis`, `constitutional_boundary`, `reader_prompt`, `research_handoff` |
| **`provenanceMode`** | Звідки походить даний візуал | `canonical_direct` (буквальний рендер канону), `canonical_derived` (похідна інтерпретація), `literature_adapted`, `data_derived`, `editorial_original` |
| **`artifactRole`** | Яким медіа-примітивом/контейнером є об'єкт | `diagram`, `table`, `matrix`, `timeline`, `chart`, `callout`, `prompt`, `image` |
| **`authority`** | Чи визначає об'єкт канон чи лише пояснює його | `canonical` (виключно для `canonical_direct`), `derived_noncanonical` (похідні візуали з обов'язковим бейджем *"Derived research representation"*), `historical_contrast` |

### Конституційні правила:
1. **Заборона декоративної авторитетності**: Будь-який графік зі статусом `epistemicBasis: 'empirical'` зобов'язаний містити верифікований `dataMethod`, датасет та рівень E3–E5. Створення вигаданих ілюстративних чисел суворо заборонено.
2. **Контракт доступності**: Складні візуали (`diagram`, `matrix`, `timeline`, `chart`) вимагають докладного `altText` (≥15 символів) та структурованого текстового еквівалента `accessibleEquiv`.

---

## 📊 Чотиризначна модель обліку Discovery та Маршрутів

```text
Raw index count ≠ public discovery count ≠ published editorial count ≠ canonical research count
```

| Рівень обліку | Кількість | Призначення та пояснення |
|---|---|---|
| **Astro static routes** | **30** | Усі скомпільовані статичні HTML-сторінки (включно з головною, перекладами, GOLIAF, каноном та службовими сторінками) |
| **Pagefind raw documents** | **32** | Повний обсяг згенерованого Pagefind пошукового корпусу (включає `404.html` та локалізовані сторінки) |
| **Public discovery manifest** | **16** | Точний універсум затверджених публічних досліджень (`/search-index.json`): 12 research специфікацій + 4 GOLIAF артефакти |
| **User-visible search** | **Gated** | Користувацький пошук фільтрується за маніфестом, відсікаючи фікстури, чернетки та заблокований корпус |

---

## 🛡️ Операційний статус системи

```text
DC2SC local research / editorial operating system:
PASS — operational and canonical integrity established

Public production operations:
NOT YET IN SCOPE

External publishing:
NOT AUTHORIZED

Live data collection / comments / login / payment:
NOT IMPLEMENTED
```



