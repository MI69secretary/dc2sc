# 🚀 DC2SC Academic Research OS — Швидкий старт за 10 хвилин

Повний посібник із розгортання академічної платформи досліджень, наукового журналу, CMS Keystatic, LaTeX PDF компілятора, MCP-сервера для штучного інтелекту та інтеграції з Google Drive / Perplexity.

---

## ⚡ 1. Розгортання за 1 команду (Docker / Local)

### Варіант А: Через Docker Compose (Рекомендовано)
```bash
# 1. Склонуйте або розархівуйте репозиторій
cd dc2sc

# 2. Скопіюйте шаблон змінних середовища
cp .env.example .env

# 3. Запустіть контейнер
docker compose up -d
```
Сайт миттєво доступний за адресою: **`http://localhost:4321`**

### Варіант Б: Локально через Node.js (v20+)
```bash
npm install
npm run dev
```

---

## 🌐 2. Ключові точки доступу платформи

| Сервіс / Розділ | URL | Опис |
| :--- | :--- | :--- |
| **Головний портал** | `http://localhost:4321/` | Академічний журнал, канон досліджень, мовний селектор (UK/EN/DE) |
| **Панель управління (Admin)** | `http://localhost:4321/admin` | Центр генерації LaTeX, студія Gemini AI, монітор Perplexity |
| **Keystatic CMS** | `http://localhost:4321/keystatic` | Візуальний редактор 24 колекцій (статті, інваріанти, паспорти медіа) |
| **Студія діаграм та дизайн-система** | `http://localhost:4321/diagrams.md` | Специфікація 6 векторних архетипів та кольорових токенів |
| **PDF-видання статей** | `http://localhost:4321/pdf/` | 7 згенерованих препринтів з формулами та верифікаційними марками |
| **Пошуковий індекс (API)** | `http://localhost:4321/search-index.json` | Повнотекстовий JSON API індекс для AI та пошуку |

---

## 🔌 3. Підключення AI через Model Context Protocol (MCP)

Сервер **DC2SC MCP** (`src/mcp/server.mjs`) дозволяє AI-асистентам (Claude Code, Claude Desktop, Cursor, ChatGPT, Antigravity) читати статті, генерувати діаграми та залишати рецензії.

### Для Claude Desktop / Claude Code:
Додайте у ваш `%APPDATA%\Claude\claude_desktop_config.json` (або `~/Library/Application Support/Claude/...` на macOS):

```json
{
  "mcpServers": {
    "dc2sc-academic": {
      "command": "node",
      "args": [
        "/ШЛЯХ_ДО_ПРОЄКТУ/dc2sc/src/mcp/server.mjs"
      ]
    }
  }
}
```

### Для Cursor / Windsurf:
1. Відкрийте `Settings` ➔ `Features` ➔ `MCP`.
2. Натисніть **Add New MCP Server**.
3. Назва: `dc2sc-research`.
4. Команда: `node src/mcp/server.mjs`.

### Доступні інструменти MCP:
- `list_articles` — список статей журналу та модулів.
- `read_article` — читання повного тексту статті разом із формулами LaTeX.
- `publish_article` — публікація або оновлення статті з перевіркою конституційних меж.
- `generate_vector_diagram` — генерація векторного SVG та паспорта через Gemini AI.
- `add_discussion_or_comment` — додавання наукового зауваження або рецензії.
- `sync_and_rebuild_artifacts` — перегенерація PDF та синхронізація перекладів.

---

## 📡 4. Підключення Perplexity AI для автопошуку публікацій

Налаштуйте регулярний таск (Cron / n8n / Make / Perplexity):
1. **Запит Perplexity:** *"Find latest research papers and discussions on buyer coordination, demand pooling and choice vs voice."*
2. **Webhook POST:** `http://localhost:4321/api/ingest-signal`
3. **JSON тіло:**
```json
{
  "author": "@vitalikbuterin",
  "sourcePlatform": "twitter",
  "title": "Quadratic Coordination and Buyer Rights",
  "summary": "Buyer-side market formation requires robust cryptographic commitments.",
  "keyQuote": "Volume without representation leads to scale capture.",
  "originalUrl": "https://x.com/vitalikbuterin/status/1838920194829"
}
```
Ендпоінт автоматично визначить номер модуля (1–7), розрахує `relevanceScore` та додасть статтю в чергу републікації Keystatic!

---

## 📂 5. Синхронізація з Google Drive

1. Запустіть скрипт сканування та генерації маніфесту:
```bash
node src/lib/generate-drive-manifest.mjs
```
2. Маніфест буде збережено в `src/data/drive-repository-manifest.json` та синхронізовано з телеметрією сайту.

---

## 📐 6. Компіляція LaTeX та PDF статей

Для перегенерації публікаційних PDF-видань з рендерингом KaTeX:
```bash
node src/lib/generate-article-pdfs.mjs
```
Усі готові PDF автоматично зберігаються в папку `public/pdf/`.

---

## 🛡️ 7. Тести безпеки та цілісності (Fail-Closed)

Запуск набору з 8 негативних тестів безпеки та конституційної дисципліни меж:
```bash
node src/lib/run-negative-tests.mjs
```
Результат: **8/8 PASS**.
