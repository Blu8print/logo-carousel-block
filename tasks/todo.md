# Production Readiness – v1.1.0

## Issues Found

| File | Problem |
|------|---------|
| `logo-carousel-block.php` | `VERSION` const was `1.0.4` (should be `1.1.0`) |
| `logo-carousel-block.php` | `Plugin URI` / `Author URI` missing `https://` |
| `logo-carousel-block.php` | No `load_plugin_textdomain()` call |
| `block.json` | Version `1.0.2`, title "KJ Logo Scroller", category `kj-logo-scroller`, textdomain `kj-logo-scroller`, block name `kj/logo-scroller` — all old KJ branding |
| `index.js` | All 30+ `__()` calls used textdomain `kj-logo-scroller` |
| `instance.php` | Used textdomain `simple-logo-scroller` and version `1.0.0` |
| `README.md` | Referenced old author/version |
| Missing | No `readme.txt` (required by WordPress.org) |

---

## Todo

- [x] 1. Fix `VERSION` constant in `logo-carousel-block.php`: `1.0.4` → `1.1.0`
- [x] 2. Fix `Plugin URI` and `Author URI` to use `https://` in `logo-carousel-block.php`
- [x] 3. Add `load_plugin_textdomain()` to `logo-carousel-block.php`
- [x] 4. Update `block.json`: version → `1.1.0`, title → `Logo Scroller`, name → `blu8print/logo-scroller`, category → `logo-carousel-block`, textdomain → `logo-carousel-block`, remove "kj" keyword
- [x] 5. Fix `index.js`: replace all `kj-logo-scroller` → `logo-carousel-block` (30+ occurrences)
- [x] 6. Fix `instance.php`: replace `simple-logo-scroller` → `logo-carousel-block`, version `1.0.0` → `1.1.0`
- [x] 7. Create `readme.txt` in WordPress.org format
- [x] 8. Update `README.md` with correct branding and version
- [x] 9. `npm run build`
- [x] 10. Create zip (`build/`, `inc/`, `logo-carousel-block.php`, `readme.txt`, `README.md`)
- [x] 11. Commit and push

---

## Review

All files now use a single consistent text domain (`logo-carousel-block`), a single version (`1.1.0`), and correct Blueprint 8 branding with `https://` URLs. A `readme.txt` in WordPress.org format has been added, which is required for official plugin submission. The block namespace was updated from `kj/` to `blu8print/` — safe to do since this is a fresh plugin not yet published publicly.
