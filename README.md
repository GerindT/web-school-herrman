# web-school-herrman

A website built as a school project, in Albanian. Archived: an early project, made to run locally only.

## Features

- Public pages for studies (`/studim`) and services (`/sherbimet`)
- Graduates (`/diplomat`) and activities (`/aktivitetet`) sections with image upload
- Local login with Passport; only logged-in users can create, edit or delete entries (registration is disabled)

## Stack

- Node.js with Express and EJS templates
- MongoDB with Mongoose
- Passport (local strategy), Multer for uploads

## Run locally

Needs a running MongoDB.

```sh
npm install
npm start   # http://localhost:3000
```

Environment variables (optional):

- `DATABASEURL`: MongoDB connection string (defaults to `mongodb://localhost:27017/geri_shkolla`)
- `PORT`: defaults to `3000`
