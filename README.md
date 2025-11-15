# amami632.github.io

# Interactive CV – Network & Telecom Profile

This project is a **single-page interactive CV** for a Network & Telecommunications student.  
It’s built with **HTML, CSS and vanilla JavaScript**, and showcases experience, projects and skills with small UI interactions and canvas animations.

---

## 🔍 Overview

The page contains:

- A **fixed animated background** with soft moving blobs
- An **animated header banner** made with `<canvas>` where dots move and connect like a small “network graph”
- A **profile card** with avatar and contact links
- A **tabbed interface** (About, Education, Projects, Hands-On Experience, Skills, Gallery)
- **Skill bars** that animate when the “Skills” tab is opened
- A small **image gallery** with previous/next buttons
- An automatically updated **footer year**

Everything is done in pure HTML/CSS/JS, no external framework.

---

## 🗂 Project Structure

```text
.
├── index.html    # Main HTML page
├── index.css     # Styles (layout, theme, components)
├── index.js      # Interactivity and canvas animations
└── pdp.jpg       # Profile picture used in the CV

```
---

**What I did for this project is build an interactive CV page using only HTML, CSS and JavaScript.**  
 The layout is a dark themed, two-column design: on the left there is my profile card with my photo and contact information, and on the right there is a tabbed interface with sections like About, Education, Projects, Experience, Skills and a small gallery.

 On the JavaScript side, I implemented the tab system: when I click on a tab, I show its panel and hide the others by toggling the `hidden` attribute. In the Skills tab, I trigger small animations on the skill bars so they fill up smoothly.

 I also added two canvas animations. The header canvas displays moving dots that bounce inside the rectangle and connect with lines when they are close, which gives a “network graph” effect behind my name and title. In the background, a full-screen canvas draws slow moving, blurry color blobs; this is blurred further with CSS to get a soft gradient glow behind the content.

 Finally, I added a simple image gallery with previous/next buttons and an automatically updated year in the footer. Everything works in a standard browser without any framework.
