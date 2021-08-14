// https://github.com/foumart/JS.13kGames/blob/master/lib/SoundFX.js

// start frequency HZ, frequency change, delay between changes, number of changes, volume, type
function playSound(frequency, increment, delay, times, volume, type = 0) {
  if (!audioContext) return;

  const oscillatorTypes = ["square", "sawtooth", "triangle", "sine"];

  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = frequency;
  oscillator.type = oscillatorTypes[type];

  // modulation for sound volume control
  const modulationGain = audioContext.createGain();
  modulationGain.gain.value = 0;

  oscillator.connect(modulationGain);
  modulationGain.connect(audioContext.destination);
  oscillator.start();

  let i = 0;
  const interval = setInterval(playTune, delay);

  function playTune() {
    oscillator.frequency.value = frequency + increment * i;
    modulationGain.gain.value = (1 - i / times) * volume;
    i++;
    if (i > times) {
      clearInterval(interval);
      setTimeout(stopTune, delay + times); // prevents the click when stopping the oscillator
    }
  }

  function stopTune() {
    oscillator.stop();
  }
}

// function soundRandom () {
//   const audioRng = new RNG()
//   const frequency = audioRng.randomIntBetween(20, 1500)
//   const increment = audioRng.randomIntBetween(-200, 10)
//   const delay = audioRng.randomIntBetween(0, 30)
//   const times = audioRng.randomIntBetween(5, 20)
//   const volume = 0.5
//   const type = audioRng.randomIntBetween(0, 3)
//   playSound(frequency, increment, delay, times, volume, type)
//   console.log(`playSound(${frequency}, ${increment}, ${delay}, ${times}, ${volume}, ${type})`)
// }
