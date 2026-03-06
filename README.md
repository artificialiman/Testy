# Tendercare Comprehensive College — Website

A multi-page school website built with vanilla HTML, CSS, and JavaScript.

## Pages

| File | Page | Description |
|---|---|---|
| `index.html` | Landing / Bursary | Prestige landing page — the gravitational centre |
| `sports.html` | Interhouse Sports | Cinematic event page — 3rd edition 2025 |
| `yearbook.html` | Yearbook 2025 | Archival graduating class portraits & memories |
| `awards.html` | Academic Awards | Honour roll, distinctions, photo gallery |
| `feed.html` | Student Feed | Live student community board |
| `about.html` | About & Faculty | School story, staff, admissions, contact |

## File Structure

```
/
├── index.html
├── sports.html
├── yearbook.html
├── awards.html
├── feed.html
├── about.html
├── css/
│   └── tendercare.css     ← full style guide & component library
├── js/
│   └── main.js            ← scroll animations, nav, counters, transitions
└── assets/                ← drop your images here
```

## Using the Style Guide

The CSS is token-based. Every page sets its own personality via body class:

```html
<body class="page--bursary">   <!-- Landing -->
<body class="page--event event--sports">  <!-- Any event page -->
<body class="page--yearbook">  <!-- Yearbook -->
<body class="page--awards">    <!-- Awards -->
<body class="page--feed">      <!-- Feed -->
<body class="page--about">     <!-- About -->
```

## Adding Your Media

All media containers are slot-based — drop in your `src`:

```html
<!-- Portrait -->
<div class="media--portrait">
  <img src="assets/student-name.jpg" alt="Student Name">
</div>

<!-- Hero background -->
<img class="media--hero-bg" src="assets/sports-hero.jpg" alt="">

<!-- Short clip (ambient) -->
<div class="media--clip media--clip--ambient">
  <video autoplay muted loop playsinline src="assets/highlights.mp4"></video>
</div>

<!-- Long video (theatre) -->
<div class="media--theatre">
  <video controls src="assets/full-ceremony.mp4"></video>
</div>
```

## Adding a New Event Page

Copy `sports.html`, change the body class:

```html
<body class="page--event event--mathematics">
```

Available event themes: `event--sports` · `event--debate` · `event--science` · `event--drama` · `event--mathematics` · `event--arts`

## GitHub Pages

Push the repo and enable GitHub Pages from the root of `main` branch. No build step required.
