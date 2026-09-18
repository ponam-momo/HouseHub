# Member 2 — Listing Management Module
Foujia Akther (202204009)

## Ki ache ei folder e
- `app.js` — standalone test server (port 3001), shudhu listing route diye test korar jonno
- `listingRoutes.js` — shob listing API route
- `listingController.js` — business logic (DB query)
- `uploadMiddleware.js` — Multer diye image upload
- `uploads/` — upload kora chobi (git e jabe na)

## API Routes
| Method | Route | Auth | Kaj |
|---|---|---|---|
| GET | /api/listings | Na | Shob listing dekhabe |
| GET | /api/listings/:id | Na | Ekta listing er details |
| POST | /api/listings | Owner | Notun listing + image add |
| PUT | /api/listings/:id | Owner | Nijer listing update |
| DELETE | /api/listings/:id | Owner | Nijer listing delete |

## Test korar niyom
1. `npm install multer` (root package.json e add koro)
2. `.env` e DB credential thik koro
3. `node app.js` — port 3001 e chalbe
4. Postman diye `http://localhost:3001/api/listings` test koro