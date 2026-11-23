# CAP Puzzles

Topic-based activity puzzles for cadet meetings, printable on letter paper.
First puzzle type: crossword, 10 x 10 or 15 x 15, with an answer key.

## Use

1. Type or pick a **Topic**. It prints as the puzzle title.
2. Pick the **CAP category**. It prints as the byline under the title.
3. Pick the grid size and select **Make puzzle**. **New layout** reshuffles.
4. Print the puzzle, the answer key, or both (each prints on its own page).

## Words

- **Built-in lists**: the topics in the Topic dropdown. Each list is one
  `ANSWER | clue` block in the `BANKS` object at the top of the script in
  `index.html`. To add a topic, add a block under its category.
- **Your own words**: open "Use my own words", paste one `ANSWER | clue` per line.
  This works for any topic. "Copy a word-list prompt for Claude" copies a prompt
  that asks Claude for a list in that format; check every clue it writes against
  the current CAP publication before printing.

Nothing is saved (repo decision D-004). Multi-word answers print their word lengths, e.g. `(6,4)`.

## Clue accuracy

Built-in clues are general aerospace, ES, and CAP history facts. Anything that
depends on a CAP rule (award names, grades, ages) must match the current
CAP publication; recheck those lists when a regulation or ICL changes.
