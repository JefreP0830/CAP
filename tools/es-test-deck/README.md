# ES & FEMA Test Prep deck

A classroom slide deck for the same six tests as the study companion
(`../es-test-guides/`): FEMA SID, IS-100, IS-200, IS-700 and IS-800 first, then
CAPT 116 and CAPT 117. One concept per slide: a diagram, a short title and one
takeaway line. Talking points live in presenter notes, not on the slides.

It is a separate tool from the study companion, and is not linked from it.

## Presenting

Open `index.html` in Chrome (works offline; the title font falls back to Arial).

| Key | Action |
|---|---|
| Right arrow, Space, click | Next slide |
| Left arrow, click left third | Previous slide |
| N | Show or hide the notes drawer (it shows on the shared screen too) |
| P | Open presenter view in a second window: notes, next slide, timer. It stays in step with the main window |
| F | Full screen |

Each slide has its own link (`#12`). Print gives one slide per page.

## Editing

`index.html` is generated. Slides, takeaways and notes are in `build/deck.py`;
deck styles and script in `build/template.html`. Diagrams and their styles come
from the study companion's `build/build.py` and `build/template.html`, so fix a
diagram there and rebuild both:

    python3 ../es-test-guides/build/build.py
    python3 build/deck.py
