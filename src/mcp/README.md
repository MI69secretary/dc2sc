# DC2SC Model Context Protocol (MCP) Server

Цей MCP-сервер дозволяє AI-асистентам (**Claude Desktop, Claude Code, ChatGPT, Cursor, Windsurf, Antigravity**) напряму взаємодіяти з дослідницьким репозиторієм DC2SC:
- 📖 **Читати статті, канонічні модулі та формальні інваріанти LaTeX**.
- ✍️ **Публікувати нові статті та дослідження** з автоматичною валідацією меж та автогенерацією PDF.
- 💬 **Додавати рецензії, зауваження та коментарі** у шар курованих дискусій (`discussions`).
- ⚡ **Синхронізувати переклади та PDF** однією командою.

---

## 🛠️ Доступні інструменти (MCP Tools)

1. `list_articles` — Список усіх статей журналу, модулів досліджень та нотаток GOLIAF.
2. `read_article(slug, collection)` — Читання повного тексту статті разом із метаданими та KaTeX-формулами.
3. `publish_article(slug, title, dek, body, whatThisDoesNotClaim, ...)` — Публікація або оновлення статті журналу з перевіркою конституційних меж та автоматичною збіркою PDF.
4. `add_discussion_or_comment(id, type, topic, body, author)` — Додавання наукових заперечень, контрприкладів та питань рецензента.
5. `list_mathematical_invariants` — Отримання формальних LaTeX-інваріантів з модулів 01–07.
6. `sync_and_rebuild_artifacts` — Перегенерація PDF-видань, синхронізація перекладів (`uk/en/de`) та оновлення Google Drive маніфесту.
7. `verify_system_integrity` — Запуск тестів безпеки та валідації 24 колекцій Keystatic.

---

## ⚙️ Як підключити Claude Desktop

Додайте конфігурацію до файлу `claude_desktop_config.json`:
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "dc2sc-research": {
      "command": "node",
      "args": [
        "C:\\Users\\mytha\\Documents\\Codex\\2026-09-17\\new-chat\\outputs\\dc2sc\\src\\mcp\\server.mjs"
      ]
    }
  }
}
```

---

## ⚙️ Як підключити Cursor / Windsurf

У налаштуваннях Cursor (`Settings` -> `Features` -> `MCP`):
1. Натисніть **Add New MCP Server**.
2. **Name:** `dc2sc-research`
3. **Type:** `command`
4. **Command:** `node src/mcp/server.mjs` (або повний шлях до `src/mcp/server.mjs`).

---

## ⚙️ Як підключити ChatGPT (Custom GPT / Actions)

Для підключення ChatGPT використовуйте REST API адаптер, який працює на сервері проекту (`http://localhost:4321/api/...`):
- `POST /api/update-all` — Синхронізація та збірка.
- `POST /api/generate-pdfs` — Генерація PDF.
- `GET /search-index.json` — Семантичний пошук по статтях.
- `GET /rss.xml` — Стрічка публікацій.
