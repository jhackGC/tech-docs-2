# Project: Word Masters (Wordle Clone)

## Overview

You're going to recreate the popular word game Wordle! This project will combine everything you've learned about HTML, CSS, JavaScript, the DOM, events, and AJAX.

## How Word Masters Works

### Game Rules

- There is a secret five-letter word chosen
- Players have **6 guesses** to figure out the secret word
- After six guesses without success, they lose
- **Green**: Letter is in the right place
- **Yellow**: Letter is in the word but in the wrong place
- **Gray**: Letter is not in the word at all
- Letter frequency matters: if the word is "OVERT" and you guess "SPOOL", only one "O" shows as yellow
- If the player guesses the right word, they win!

## The APIs

### 1. Get Word of the Day (GET Request)

```
GET https://words.dev-apis.com/word-of-the-day
```

**Response:**

```json
{
  "word": "humph",
  "puzzleNumber": 3
}
```

**Query Parameters:**

- `random=1` - Get a random word instead of daily word
  - `https://words.dev-apis.com/word-of-the-day?random=1`
- `puzzle=<number>` - Get the same word every time for testing
  - `https://words.dev-apis.com/word-of-the-day?puzzle=1337`

### 2. Validate Word (POST Request)

```
POST https://words.dev-apis.com/validate-word
```

**Request Body:**

```json
{
  "word": "crane"
}
```

**Response:**

```json
{
  "word": "crane",
  "validWord": true
}
```

**Important Notes:**

- Must be a POST request (not GET)
- Only validates 5-letter English words
- No accents or non-letter characters
- Implement this validation **last** - it's the hardest part

### Error Handling

**403 Error with `{"message":"Missing Authentication Token"}`** means:

- You spelled the URL incorrectly
- You're using GET when it expects POST
- You hit a non-supported endpoint

## Tips and Development Strategy

### Solve One Problem at a Time

1. Create and style the HTML/CSS first
2. Make user able to type and make six guesses
3. Add detection for correct guesses
4. Add green highlighting for correct letters
5. Add gray for wrong letters
6. Add yellow for correct letters in wrong positions
7. Add API calls and validation

### Key Skills You'll Need

- You'll need to Google things! Learning to answer your own questions is crucial
- This is normal and expected in real development
- Use MDN, Stack Overflow, and documentation

## Helpful Code: isLetter Function

### Testing for Valid Letters

```javascript
function isLetter(letter) {
  return /^[a-zA-Z]$/.test(letter);
}

console.log(isLetter("a")); // true
console.log(isLetter("abc")); // false - not single character
console.log(isLetter("1")); // false - not a letter
```

### Using isLetter for Input Validation

```html
<input
  type="text"
  class="tester-input"
  placeholder="only letters allowed here"
/>
```

```javascript
document
  .querySelector(".tester-input")
  .addEventListener("keydown", function (event) {
    if (!isLetter(event.key)) {
      event.preventDefault(); // Blocks invalid input
    }
  });
```

**Note:** This blocks ALL non-letters, including backspace and enter!

### Regular Expression Explanation

`/^[a-zA-Z]$/` breakdown:

- `/` ... `/` - Denotes a regular expression
- `^` - Must start at beginning of string
- `$` - Must end at end of string
- `[a-zA-Z]` - Any letter from a-z or A-Z
- Together: Exactly one letter, nothing else

_Don't worry about mastering regex - many developers rarely use it!_

## Project Scope

### Code Size Reference

- **~125 lines** of JavaScript
- **~50 lines** of HTML
- **~75 lines** of CSS
- These are rough estimates - your solution may vary!

### Optional Enhancements

- Mobile phone support (bonus challenge!)
- Animations and visual effects
- Loading spinners
- Sound effects
- Share results feature

## Step-by-Step Development Guide

### Phase 1: Structure and Styling

1. **Write the HTML**

   - Create the grid layout for letters
   - Add containers for guesses
   - Include loading indicators
   - Link stylesheet and script files

2. **Style with CSS**
   - Create the grid layout
   - Style the letter squares
   - Add colors for different states (gray, yellow, green)
   - Make it responsive (mobile-friendly)

### Phase 2: Core Typing Mechanics

3. **Handle Keyboard Input**
   - Capture letter keystrokes
   - Ignore invalid characters (numbers, symbols)
   - Handle "Enter" when word is complete
   - Handle "Enter" when word is incomplete (ignore)
   - Handle "Backspace" with letters to delete
   - Handle "Backspace" with nothing to delete

### Phase 3: Game Logic

4. **Implement Word Fetching**

   - Make API call to get word of the day
   - Store the secret word
   - Handle loading states

5. **Basic Win/Lose Conditions**
   - Check if submitted word matches secret word
   - Handle win condition (`alert('you win!')`)
   - Handle lose condition after 6 guesses

### Phase 4: Letter Checking Logic

6. **Green Squares (Correct Position)**

   - Check each letter position
   - Mark letters that match position

7. **Gray Squares (Wrong Letters)**

   - Mark letters not in the word at all

8. **Yellow Squares (Wrong Position)**
   - **Naive approach first**: Mark any letter that exists in word but wrong position
   - **Advanced approach**: Handle duplicate letters correctly
     - Example: Guess "SPOOL", Word "OVERT" → only one "O" should be yellow

### Phase 5: Polish and Validation

9. **Loading States**

   - Show spinner while waiting for API
   - Disable input during API calls

10. **Word Validation**

    - Call validation API before checking guess
    - Show error for invalid words (red border flash)
    - Only process valid words

11. **Visual Feedback**
    - Animations for correct guesses
    - Error states for invalid words
    - Win celebration (rainbow colors, etc.)

## Common Challenges and Solutions

### Challenge 1: Duplicate Letters

```javascript
// Example: Word "OVERT", Guess "SPOOL"
// Should show: S(gray) P(gray) O(yellow) O(gray) L(gray)

function checkGuess(guess, word) {
  const result = [];
  const wordLetters = word.split("");
  const guessLetters = guess.split("");

  // First pass: mark exact matches (green)
  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === wordLetters[i]) {
      result[i] = "green";
      wordLetters[i] = null; // Remove from available letters
    }
  }

  // Second pass: mark wrong position matches (yellow)
  for (let i = 0; i < 5; i++) {
    if (result[i]) continue; // Skip already marked

    const letterIndex = wordLetters.indexOf(guessLetters[i]);
    if (letterIndex !== -1) {
      result[i] = "yellow";
      wordLetters[letterIndex] = null; // Remove from available
    } else {
      result[i] = "gray";
    }
  }

  return result;
}
```

### Challenge 2: Keyboard State Management

```javascript
class WordMasters {
  constructor() {
    this.currentRow = 0;
    this.currentCol = 0;
    this.gameOver = false;
    this.secretWord = "";
    this.guesses = [];
  }

  handleKeyPress(key) {
    if (this.gameOver) return;

    if (key === "Enter") {
      this.submitGuess();
    } else if (key === "Backspace") {
      this.deleteLetter();
    } else if (isLetter(key) && this.currentCol < 5) {
      this.addLetter(key.toUpperCase());
    }
  }
}
```

### Challenge 3: API Error Handling

```javascript
async function getWordOfDay() {
  try {
    const response = await fetch("https://words.dev-apis.com/word-of-the-day");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.word.toUpperCase();
  } catch (error) {
    console.error("Failed to fetch word:", error);
    // Fallback word or retry logic
    return "CRANE"; // Default word for testing
  }
}

async function validateWord(word) {
  try {
    const response = await fetch("https://words.dev-apis.com/validate-word", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word: word.toLowerCase() }),
    });

    const data = await response.json();
    return data.validWord;
  } catch (error) {
    console.error("Word validation failed:", error);
    return true; // Assume valid if API fails
  }
}
```

## Sample Game Flow

### Initialization

```javascript
async function initGame() {
  showLoading();
  try {
    secretWord = await getWordOfDay();
    setupEventListeners();
    hideLoading();
  } catch (error) {
    showError("Failed to load game");
  }
}
```

### Guess Submission

```javascript
async function submitGuess() {
  if (currentCol !== 5) return; // Word not complete

  const guess = getCurrentGuess();

  showLoading();
  const isValid = await validateWord(guess);
  hideLoading();

  if (!isValid) {
    showInvalidWordError();
    return;
  }

  const result = checkGuess(guess, secretWord);
  displayResult(result);

  if (guess === secretWord) {
    showWinAnimation();
    gameOver = true;
  } else if (currentRow >= 5) {
    showLoseMessage(secretWord);
    gameOver = true;
  } else {
    moveToNextRow();
  }
}
```

## Project Files Reference

Once you're finished (or if you get stuck):

- [HTML Solution](https://btholt.github.io/complete-intro-to-web-dev-v3/project-files/word-masters.html) (view source)
- [JavaScript Solution](https://btholt.github.io/complete-intro-to-web-dev-v3/project-files/word-masters.js)
- [CSS Solution](https://btholt.github.io/complete-intro-to-web-dev-v3/project-files/word-masters.css)

## Success Criteria

Your Word Masters is successful if:

- ✅ Players can type letters and see them appear
- ✅ Players can use backspace to delete letters
- ✅ Players can press Enter to submit complete words
- ✅ Invalid words are rejected with visual feedback
- ✅ Correct letters in correct positions show green
- ✅ Correct letters in wrong positions show yellow
- ✅ Wrong letters show gray
- ✅ Duplicate letters are handled correctly
- ✅ Players win when they guess the word
- ✅ Players lose after 6 incorrect guesses
- ✅ The game uses real API calls for words

## Good Luck!

This is a challenging project that brings together everything you've learned! Don't get discouraged if it takes time - this is a significant programming challenge. Break it down into small pieces and tackle one feature at a time.

Remember: learning to research and solve problems independently is one of the most valuable skills in programming!
