// ============================================================
// EDIT THIS FILE to personalize everything on the site.
// All text, images, dates, and the song live here.
// ============================================================

export const config = {
  // Her name — shown in the hero and throughout
  herName: "Rajvi",

  // Your name — shown in the footer signature
  yourName: "Your Name", // <-- EDIT: put your name here

  // The date your relationship started (used by the live love counter)
  // Format: year, month (1-12), day, hour, minute
  relationshipStart: new Date(2024, 0, 14, 18, 30), // <-- EDIT: your start date

  // Background music — replace /public/audio/song.mp3 with your song file
  songPath: "/audio/song.mp3",

  // Gallery photos — replace files in /public/images/ with her real photos
  // Keep the same filenames, or update the paths below.
  photos: [
    { src: "/images/rajvi-1.png", caption: "The day everything changed" },
    { src: "/images/rajvi-2.png", caption: "Two hearts, one story" },
    { src: "/images/rajvi-3.png", caption: "Every letter I never sent" },
    { src: "/images/rajvi-4.png", caption: "Us, under the lights" },
  ],

  // "Why I Love You" reasons — add or remove as many as you like
  reasons: [
    "Your smile makes even the worst days feel lighter",
    "The way you laugh at your own jokes before finishing them",
    "You believe in me even when I forget to believe in myself",
    "How you make ordinary moments feel like little celebrations",
    "Your kindness to everyone, even strangers",
    "The way home only feels like home when you're there",
  ],

  // Love letter — each string is revealed line-by-line as she scrolls
  loveLetter: [
    "My dearest Rajvi,",
    "Some feelings are too big for words, but I'll try anyway.",
    "Before you, I didn't know a person could feel like a place —",
    "like somewhere warm you want to return to, again and again.",
    "You are my favorite hello and my hardest goodbye.",
    "Every day with you is my new favorite day.",
    "Thank you for being you. Thank you for being mine.",
    "Forever yours,",
  ],

  // The hidden message revealed when the 3D gift box is opened
  hiddenMessage: "You are the best thing that ever happened to me. I love you, endlessly. 💗",
}
