const audioButtons = [...document.querySelectorAll('[data-audio]')];
const players = new Map();

function updateAudioButton(button, state) {
  const title = button.dataset.audioTitle || 'runo';
  const icon = button.querySelector('[data-audio-icon]');
  const label = button.querySelector('[data-audio-label]');
  const isPlaying = state === 'playing';

  button.setAttribute('aria-pressed', String(isPlaying));
  button.setAttribute('aria-label', `${state === 'playing' ? 'Keskeytä' : state === 'paused' ? 'Jatka' : 'Kuuntele'} runo ${title}`);
  icon.textContent = isPlaying ? 'Ⅱ' : '▶';
  label.textContent = state === 'playing' ? 'Keskeytä' : state === 'paused' ? 'Jatka runoa' : 'Kuuntele runo';
}

function getPlayer(button) {
  if (players.has(button)) return players.get(button);

  const audio = new Audio(button.dataset.audio);
  audio.preload = 'metadata';
  audio.addEventListener('play', () => updateAudioButton(button, 'playing'));
  audio.addEventListener('pause', () => {
    if (!audio.ended) updateAudioButton(button, audio.currentTime > 0 ? 'paused' : 'idle');
  });
  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    updateAudioButton(button, 'idle');
  });
  players.set(button, audio);
  return audio;
}

audioButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const audio = getPlayer(button);

    players.forEach((otherAudio, otherButton) => {
      if (otherButton === button || otherAudio.paused) return;
      otherAudio.pause();
      otherAudio.currentTime = 0;
      updateAudioButton(otherButton, 'idle');
    });

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch (error) {
      if (error.name === 'AbortError') return;
      updateAudioButton(button, 'idle');
      const label = button.querySelector('[data-audio-label]');
      label.textContent = 'Toisto ei onnistunut';
    }
  });
});
