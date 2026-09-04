# Rauan Tuken Portfolio

Персональный Portfolio / CV сайт для Rauan Tuken, Junior Full Stack Developer. Проект собран на Next.js и оформлен по дизайн-системе `Hyperstudio`: темный editorial-tech стиль, строгая типографика, тонкие hairline-разделители, минимальные outlined-иконки и без лишнего визуального шума.

## О проекте

Сайт помогает быстро показать ключевую информацию для HR, рекрутеров, hiring managers и технических специалистов:

- кто такой Rauan Tuken;
- специализация и основной стек;
- коммерческий опыт в Itdevgroup;
- академический full stack проект;
- образование в KBTU;
- контакты и GitHub;
- переключение языков EN / RU / KZ.

## Стек

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- lucide-react
- CSS custom properties
- App Router

## Дизайн

Основные принципы интерфейса:

- темный canvas `#101010`;
- типографика как главный визуальный инструмент;
- секции разделены `1px` линиями;
- карточки с радиусом до `8px`;
- без теней, градиентов и фотографий;
- иконки в стиле outlined;
- primary CTA в белой pill-кнопке;
- адаптивная сетка для desktop и mobile.

## Структура

```txt
my_resume_webapp/
  app/
    globals.css
    layout.tsx
    page.tsx
  public/
  package.json
  next.config.ts
  tsconfig.json
```

## Запуск

Перейти в папку Next.js приложения:

```bash
cd my_resume_webapp
```

Установить зависимости:

```bash
npm install
```

Запустить dev server:

```bash
npm run dev
```

Открыть в браузере:

```txt
http://localhost:3000
```

На Windows, если PowerShell блокирует `npm.ps1`, используй:

```bash
npm.cmd run dev
```

## Проверка

```bash
npm.cmd run lint
npm.cmd run build
```

Текущая сборка проходит успешно.

## Контент

Основной контент резюме сейчас находится в:

```txt
my_resume_webapp/app/page.tsx
```

Сайт использует реальные данные из CV:

- Rauan Tuken;
- Junior Full Stack Developer;
- KBTU, Information Technology;
- Itdevgroup, Android Developer & Frontend Developer;
- Angular + Django academic full stack project;
- контакты: email, phone, GitHub, location.

## Мультиязычность

Поддерживаются языки:

- English;
- Russian;
- Kazakh.

Переключение работает без перезагрузки страницы. Выбранный язык сохраняется в `localStorage` по ключу:

```txt
resume-lang
```

## Download CV

Кнопка загрузки резюме ведет на:

```txt
/cv/resume.pdf
```

Чтобы она открывала файл, нужно добавить PDF сюда:

```txt
my_resume_webapp/public/cv/resume.pdf
```

## Деплой

Проект удобно размещать на Vercel:

```bash
npm.cmd run build
```

После успешной сборки приложение готово к production deployment.
