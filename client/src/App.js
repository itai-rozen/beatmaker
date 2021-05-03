import React, { useState, useEffect, useRef } from 'react';
import { Provider } from './components/Context'
import useSound from 'use-sound'
import notes from './../src/sounds/all-instruments.mp3'
import './App.css';
import Main from './components/Main/Main.js'


function App() {

  // creating the scale & beat constants
  const BEATS = 16
  const SCALES = ['C2', 'D2', 'E2', 'G2', 'C3', 'D3', 'E3', 'G3', 'C4', 'D4', 'E4']

  // creating the BeatBar 
  const getBeatCpts = () => {
    let beatCpts = []
    for (let i = 0; i < BEATS; i++) {
      beatCpts.push(i)
    }
    return beatCpts
  }

  const beatCpts = getBeatCpts()

   // creating the SoundBoard

  const getSoundPoints = () => {
    let sounds = []
    for (let i = 0; i < SCALES.length; i++) {
      sounds.push([])
      for (let j = 0; j < BEATS; j++) {
        sounds[i].push({
          i: i, j: j, scale: SCALES[i],
          activeInstruments:  {}
        })
      }
    }
    return sounds
  }


  // assigning names and intervals for the sounds in the mp3 file

  const  getSprites = () => {
    let count = -1000
    let sprites = {}
    instruments.forEach( instrument => {
      ( SCALES.forEach(scale => {
        sprites[instrument.name + scale] =  [count += 1000, 1000]  
      }))
    })
    return sprites
  }

  // initializing some varibales with HOOKS

  const [sounds, setSounds] = useState(getSoundPoints())
  const [activeSounds, setActiveSounds] = useState([])
  const [redBeatIndex, setRedBeatIndex] = useState(-1)
  // const [render, setRender] = useState(0)
  const [initialState,setInitialState] = useState([])
  const [instruments, setInstruments] = useState([
    { name: 'saxophone', checked: true },
    { name: 'cello', checked: false },
    { name: 'oboe', checked: false },
    { name: 'vocal', checked: false },
    { name: 'guitar', checked: false },
    { name: 'kora', checked: false },
    { name: 'vibraphone', checked: false },
    { name: 'drums', checked: false },
    { name: 'violin', checked: false}
  ])
  const [isShowSave, setIsShowSave] = useState(false)
  const [isShowLoad, setIsShowLoad] = useState(false)
  const [isPlay, setIsPlay] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [delay, setDelay] = useState(1000)
  const [tempo, setTempo] = useState(60)
  const [volume, setVolume] = useState(0.75)

    // the useSound HOOK !!
  const [play] = useSound(notes, {
    volume: volume,
    sprite: getSprites(),
    interrupt: false
  })

  // functions for the Instrument Bar

  const checkInstrument = name => {
    setInstruments(instruments.map(instrument => (instrument.name === name) ? { ...instrument, checked: true } : { ...instrument, checked: false }))
  }


  // functions for the Beat Bar
  const assignColor = i => {
    if (!isPlay && !isPause) return
    return i === redBeatIndex ? 'red' : ''
  }

  // functions for the Sound Board

  const handleClickedSound = (i, j, instrument) => {
    setSounds(
      sounds.map(soundRow =>
        soundRow.map(sound => (sound.i === i && sound.j === j) ? { ...sound, activeInstruments: { ...sound.activeInstruments, [instrument]: !sound.activeInstruments[instrument] } } : sound
        ))
    )
  }

  const assignSoundClass = (i, j, instrument) => {
    let currSoundInstrument = sounds[i][j].activeInstruments[instrument]
    return (currSoundInstrument === true) ? 'active' : ''
  }


  







  const playSounds = () => {

    if (isPlay) {

      let currentActives = activeSounds.filter(sound => sound.j === redBeatIndex)
      // console.log('current actives: ',currentActives)
      currentActives.forEach(sound => {
        for (let instrument in sound.activeInstruments) {
          // console.log('instrument status: ', sound.activeInstruments[instrument])
          if (sound.activeInstruments[instrument] === true) play({id: instrument + sound.scale})
        }
      })
    }
  }

  // USE EFFECT! all the stuff that renders on each change of the usestates in the brackets below
  useEffect(() => {
    let actives = []
    sounds.forEach(soundRow => soundRow.forEach(sound => {
      for (let instrument in (sound.activeInstruments)){
        if (sound.activeInstruments[instrument]) actives.push(sound)
      }
    }))
    setActiveSounds(actives) 
    console.log('initial state: ',initialState)
    console.log('active sounds @ useeffect: ', activeSounds)
    playSounds()
  }, [redBeatIndex, isPlay,isShowLoad,isShowSave,initialState])




  // initializing the increment  with useRef (otherwise setInterval wont work properly)
  const increment = useRef(null)
  
  // functions for the Control Buttons Bar
  const startPlaying = () => {
    if (isPlay) return
    setIsPlay(true)
    setIsPause(false)
    increment.current = setInterval(() => {
      setRedBeatIndex((redBeatIndex) => redBeatIndex === 15 ? 0 : redBeatIndex + 1)
    }, delay)
  }

  const pausePlaying = () => {
    if (!isPlay) return
    clearInterval(increment.current);
    setIsPlay(false)
    setIsPause(true)
  }

  const stopPlaying = () => {
    clearInterval(increment.current)
    setIsPlay(false)
    setIsPause(false)
    setRedBeatIndex(-1)
  }

  const resetPlaying = () => {
    clearInterval(increment.current)
    setIsPlay(false)
    setIsPause(false)
    setRedBeatIndex(-1)
    setDelay(1000)
    setTempo(60)
    document.getElementById('tempo-slider').value = 60
    document.getElementById('volume-slider').value = 0.75
    setVolume(0.75)
    setSounds(getSoundPoints())
    setActiveSounds([])
  }

  const clearInstrument = () => {
    let currentInsrtumentName = instruments.filter(instrument => instrument.checked)[0].name
    setSounds(sounds.map(soundRow => soundRow.map(
      (sound => (sound.activeInstruments[currentInsrtumentName]) ? { ...sound, activeInstruments: { ...sound.activeInstruments, [currentInsrtumentName]: false } } : sound
      )
    )))
  }


  const handleTempo = ev => {
    let value = ev.target.value
    setTempo(value)
    setDelay(60 / value * 1000)
  }


  const handleVolume = ev =>  {if (isPlay) setVolume(ev.target.value)}

  const playUpdateTempo = () => {
    if (!isPlay) return
    clearInterval(increment.current);
    increment.current = setInterval(() => {
      setRedBeatIndex((redBeatIndex) => redBeatIndex === 15 ? 0 : redBeatIndex + 1)
    }, delay)
  }

   // functions for saving & loading modals in the Control Buttons Bar

  const toggleSaveModal = () => {
    if (!isShowSave) getPresets()
    setIsShowSave(!isShowSave)
    setIsShowLoad(false)
  }

  const toggleLoadModal = () => {
    if (!isShowLoad) getPresets()
    setIsShowLoad(!isShowLoad)
    setIsShowSave(false)
  }

  const deletePreset = (id) => {
    console.log('entered delete!')
    fetch(`/api/${id}`,{
      method:'delete',
      body: {
        id: id
      }
    })
    .then(res=> getPresets())
    .catch(err => console.error(err))


  }
  
  const getPresets = () => {
    console.log('@getPresets')
    fetch('/api')
    .then(res=> {
      if(res.ok){
        return res.json()
      }
    }).then(jsonResponse => {
      setInitialState(jsonResponse)
    })
    .catch(err => console.error(err))
  }

  const loadSounds = (snds,tmpo) => {

    let parsedSounds = JSON.parse(snds)
    setSounds(parsedSounds)
    setTempo(tmpo)
    setDelay(60 / tmpo * 1000)
    toggleLoadModal()
  }



  return (
    <Provider value={
      {
        beatCpts: beatCpts,
        delay: delay,
        initialState: initialState,
        instruments: instruments,
        isShowLoad: isShowLoad,
        isShowSave: isShowSave,
        tempo: tempo,
        sounds: sounds,
        redBeatIndex: redBeatIndex,
        volume: volume,
        actions: {
          assignColor: assignColor,
          checkInstrument: checkInstrument,
          clearInstrument : clearInstrument,
          deletePreset : deletePreset,
          handleClickedSound: handleClickedSound,
          handleTempo: handleTempo,
          handleVolume: handleVolume,
          loadSounds : loadSounds,
          startPlaying: startPlaying,
          stopPlaying: stopPlaying,
          toggleLoadModal: toggleLoadModal,
          toggleSaveModal: toggleSaveModal,
          pausePlaying: pausePlaying,
          playUpdateTempo: playUpdateTempo,
          resetPlaying: resetPlaying,
          assignSoundClass: assignSoundClass
        }
      }
    }>

      <div className="App">
          <Main />
      </div>
    </Provider>
  )
}

export default App;
