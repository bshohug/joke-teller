const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  console.log('tell me:', joke);
  VoiceRSS.speech({
    // Never share you API like this.
    key: '0011cfdcb3864280b74d931f620f12f0',
    src: joke,
    hl: 'en-gb',
    v: 'Nancy',
    r: 0,
    c: 'mp3',
    f: '48khz_16bit_stereo',
    ssml: false,
  });
}

// Get Jokes from joke API
async function getJokes() {
  let joke = '';
  const apiUrl =
    'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Errors Heere
    console.log('whoops', error);
  }
}

// Event Listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
