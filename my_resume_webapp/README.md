# Portfolio App

Next.js приложение для персонального Portfolio / CV сайта Rauan Tuken.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- lucide-react

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

Если PowerShell блокирует `npm.ps1`, запускай команды через `npm.cmd`:

```bash
npm.cmd run dev
npm.cmd run lint
npm.cmd run build
```

## Local Development

```bash
npm install
npm.cmd run dev
```

Open:

```txt
http://localhost:3000
```

## Main Files

```txt
app/page.tsx      Main portfolio page, content, translations, UI sections
app/globals.css   Design tokens, layout, responsive styling
app/layout.tsx    Metadata and root layout
```

## CV File

The Download CV button points to:

```txt
/cv/resume.pdf
```

Place the PDF here:

```txt
public/cv/resume.pdf
```
