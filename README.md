# Beat Maker

live demo: https://itai-beatmaker.herokuapp.com/

## A real-time sequencer with a variety of instruments

## Instructions

### 1. Beat bar - the red dot indicates the current location of the played beat.
### 2. Sound board - these are the notes. when you toggle a note - the note is played when its time
### comes (when the red dot is hovering over the column). The notes are of pentatonic scale, so feel free to do some trial & error. If you wo'nt light up to many notes - it would probably sound decent!
### 3. Instrument bar - list of musical instruments you can choose from.
### 4. Controls bar - let you control the beat - play/stop/pause. you can also save beats you feel proud of, or load ones that you (or your friends) made in the past. Once you save a beat it get stored in a database (mongo) so you'll be able to load it from anywhere!
### 5. Tempo & Volume scrollers - control the volume & tempo of the beat!

## How to use: 
### Just click on some dots on the soundboard & hit the play button! after a while you'll get some funky beats, guaranteed!

- Stack:  Mern (mongoDB, Express, React, node.js)
- sounds are handled using "use-sound" library, which improved quality of sound-overlapping and made the structure of sound files easier using sprites - one file contains all sounds, sounds are fetched by delivering their "location" in the file.
- sounds were cut to homogenous length and quality using Audacity - free audio software (very much recommended! link below)


https://www.audacityteam.org/
