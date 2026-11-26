import { useCallback, useEffect, useRef, useState } from 'react';
import { content } from '../content';

type SynthHandle = {
  context: AudioContext;
  mute: () => void;
  unmute: () => void;
  dispose: () => void;
};

function createReverb(context: AudioContext, seconds = 3.2, decay = 2.4): AudioBuffer {
  const rate = context.sampleRate;
  const length = Math.floor(rate * seconds);
  const impulse = context.createBuffer(2, length, rate);

  for (let channel = 0; channel < 2; channel += 1) {
    const data = impulse.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      const envelope = Math.pow(1 - index / length, decay);
      data[index] = (Math.random() * 2 - 1) * envelope;
    }
  }

  return impulse;
}

/**
 * A gentle, original tanpura-inspired score generated with the Web Audio API.
 * No audio file, no external asset, no licensing worry — and it only starts
 * after a real tap on the opening screen.
 */
function createSynth(context: AudioContext): SynthHandle {
  const master = context.createGain();
  master.gain.value = 0.0001;

  const limiter = context.createDynamicsCompressor();
  limiter.threshold.value = -20;
  limiter.knee.value = 24;
  limiter.ratio.value = 4;
  limiter.attack.value = 0.02;
  limiter.release.value = 0.45;

  master.connect(limiter);
  limiter.connect(context.destination);

  const convolver = context.createConvolver();
  convolver.buffer = createReverb(context);
  const reverbTone = context.createBiquadFilter();
  reverbTone.type = 'lowpass';
  reverbTone.frequency.value = 2100;
  const reverbLevel = context.createGain();
  reverbLevel.gain.value = 0.5;
  convolver.connect(reverbTone);
  reverbTone.connect(reverbLevel);
  reverbLevel.connect(master);

  const connectVoice = (node: AudioNode, dryLevel: number, wetLevel: number) => {
    const dry = context.createGain();
    dry.gain.value = dryLevel;
    node.connect(dry);
    dry.connect(master);

    const wet = context.createGain();
    wet.gain.value = wetLevel;
    node.connect(wet);
    wet.connect(convolver);
  };

  const droneBus = context.createGain();
  droneBus.gain.value = 1;
  const droneFilter = context.createBiquadFilter();
  droneFilter.type = 'lowpass';
  droneFilter.frequency.value = 440;
  droneFilter.Q.value = 0.6;
  droneBus.connect(droneFilter);
  connectVoice(droneFilter, 0.9, 0.22);

  const drones: OscillatorNode[] = [];
  const droneNotes = [73.42, 110, 146.83, 220];
  const droneLevels = [0.052, 0.028, 0.036, 0.008];

  droneNotes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    oscillator.type = index < 2 ? 'triangle' : 'sine';
    oscillator.frequency.value = frequency;
    oscillator.detune.value = index % 2 === 0 ? -3 : 4;

    const level = context.createGain();
    level.gain.value = droneLevels[index] ?? 0.02;
    oscillator.connect(level);
    level.connect(droneBus);
    oscillator.start();
    drones.push(oscillator);
  });

  const movement = context.createOscillator();
  movement.frequency.value = 0.06;
  const movementAmount = context.createGain();
  movementAmount.gain.value = 110;
  movement.connect(movementAmount);
  movementAmount.connect(droneFilter.frequency);
  movement.start();
  drones.push(movement);

  const melodyNotes = [293.66, 329.63, 369.99, 440, 493.88, 587.33];
  let muted = false;
  let disposed = false;

  const softNote = (frequency: number, volume = 0.026, length = 5.2) => {
    if (muted || disposed) return;

    const now = context.currentTime;
    const note = context.createGain();
    note.gain.setValueAtTime(0.0001, now);
    note.gain.linearRampToValueAtTime(volume, now + 1.1);
    note.gain.exponentialRampToValueAtTime(0.0001, now + length);

    const tone = context.createOscillator();
    tone.type = 'sine';
    tone.frequency.setValueAtTime(frequency, now);
    tone.frequency.linearRampToValueAtTime(frequency * 1.0025, now + length);

    const overtone = context.createOscillator();
    overtone.type = 'triangle';
    overtone.frequency.value = frequency * 2;
    const overtoneLevel = context.createGain();
    overtoneLevel.gain.value = 0.08;

    const toneFilter = context.createBiquadFilter();
    toneFilter.type = 'lowpass';
    toneFilter.frequency.value = 1500;

    tone.connect(toneFilter);
    overtone.connect(overtoneLevel);
    overtoneLevel.connect(toneFilter);
    toneFilter.connect(note);
    connectVoice(note, 0.75, 0.72);

    tone.start(now);
    overtone.start(now);
    tone.stop(now + length + 0.2);
    overtone.stop(now + length + 0.2);
  };

  const pluck = (frequency: number) => {
    if (muted || disposed) return;

    const now = context.currentTime + 0.02;
    const bus = context.createGain();
    bus.gain.value = 0.9;

    [1, 2, 3, 4].forEach((harmonic, harmonicIndex) => {
      const oscillator = context.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency * harmonic;
      oscillator.detune.value = harmonic * 0.7;

      const envelope = context.createGain();
      const peak = 0.03 / (harmonicIndex * 1.65 + 1);
      envelope.gain.setValueAtTime(0.0001, now);
      envelope.gain.exponentialRampToValueAtTime(peak, now + 0.012);
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + 2.9);

      oscillator.connect(envelope);
      envelope.connect(bus);
      oscillator.start(now);
      oscillator.stop(now + 3.1);
    });

    connectVoice(bus, 0.72, 0.55);
  };

  const tanpuraPattern = [146.83, 220, 293.66, 220];
  let tanpuraIndex = 0;
  const tanpuraTimer = window.setInterval(() => {
    if (muted || disposed) return;
    const note = tanpuraPattern[tanpuraIndex % tanpuraPattern.length] ?? 146.83;
    tanpuraIndex += 1;
    pluck(note);
  }, 3400);
  pluck(146.83);

  let melodyTimer = 0;
  let melodyCount = 0;
  const scheduleMelody = () => {
    if (disposed) return;
    const wait = 5200 + Math.random() * 5200;
    melodyTimer = window.setTimeout(() => {
      if (!muted && !disposed) {
        const base = melodyNotes[melodyCount % melodyNotes.length] ?? 329.63;
        const note = base * (Math.random() > 0.5 ? 1 : 0.5);
        softNote(note, 0.022 + Math.random() * 0.01, 4.8 + Math.random() * 1.8);
        if (Math.random() > 0.62) {
          window.setTimeout(() => {
            if (!muted && !disposed) softNote(note * 1.5, 0.011, 4.2);
          }, 900);
        }
        melodyCount += 1;
      }
      scheduleMelody();
    }, wait);
  };
  scheduleMelody();

  const bellNotes = [587.33, 880, 1174.66];
  let bellIndex = 0;
  const bellTimer = window.setInterval(() => {
    if (muted || disposed) return;
    const bell = bellNotes[bellIndex % bellNotes.length] ?? 880;
    bellIndex += 1;
    const note = context.createGain();
    const now = context.currentTime;
    note.gain.setValueAtTime(0.0001, now);
    note.gain.exponentialRampToValueAtTime(0.014, now + 0.008);
    note.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = bell;
    oscillator.connect(note);
    connectVoice(note, 0.35, 0.9);
    oscillator.start(now);
    oscillator.stop(now + 5.8);
  }, 19000);

  const fadeTo = (target: number, seconds: number) => {
    const now = context.currentTime;
    const current = Math.max(0.0001, master.gain.value);
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(current, now);
    master.gain.exponentialRampToValueAtTime(Math.max(0.0001, target), now + seconds);
  };

  fadeTo(0.7, 3);

  return {
    context,
    mute() {
      muted = true;
      fadeTo(0.0001, 0.55);
    },
    unmute() {
      muted = false;
      void context.resume();
      fadeTo(0.7, 1.2);
    },
    dispose() {
      disposed = true;
      window.clearInterval(tanpuraTimer);
      window.clearInterval(bellTimer);
      window.clearTimeout(melodyTimer);
      drones.forEach((oscillator) => {
        try {
          oscillator.stop();
        } catch {
          // The oscillator may already be stopped.
        }
      });
      void context.close();
    },
  };
}

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

export function useBackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);
  const synthRef = useRef<SynthHandle | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileVolumeTimer = useRef(0);
  const hasFileSource = Boolean(content.music.src);

  const startSynth = useCallback(async () => {
    if (synthRef.current) {
      await synthRef.current.context.resume();
      synthRef.current.unmute();
      return;
    }

    const AudioConstructor =
      window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
    if (!AudioConstructor) throw new Error('Web Audio is unavailable.');

    const context = new AudioConstructor();
    if (context.state === 'suspended') await context.resume();
    synthRef.current = createSynth(context);
  }, []);

  const startFile = useCallback(async () => {
    if (!audioRef.current) {
      const audio = new Audio(content.music.src);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0;
      audioRef.current = audio;
    }

    const audio = audioRef.current;
    await audio.play();

    window.clearInterval(fileVolumeTimer.current);
    const target = content.music.volume;
    const started = performance.now();
    fileVolumeTimer.current = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - started) / 1200);
      audio.volume = Math.max(0.0001, target * progress);
      if (progress >= 1) {
        window.clearInterval(fileVolumeTimer.current);
      }
    }, 80);
  }, []);

  const start = useCallback(async () => {
    if (isPlaying) return;

    try {
      if (hasFileSource) {
        await startFile();
      } else {
        await startSynth();
      }
      setIsPlaying(true);
      setIsUnavailable(false);
    } catch {
      // A missing/blocked audio file should never break the invitation.
      try {
        audioRef.current?.pause();
        await startSynth();
        setIsPlaying(true);
        setIsUnavailable(false);
      } catch {
        setIsUnavailable(true);
        setIsPlaying(false);
      }
    }
  }, [hasFileSource, isPlaying, startFile, startSynth]);

  const toggle = useCallback(async () => {
    if (isPlaying) {
      if (synthRef.current) {
        synthRef.current.mute();
      }
      audioRef.current?.pause();
      window.clearInterval(fileVolumeTimer.current);
      setIsPlaying(false);
      return;
    }

    await start();
  }, [isPlaying, start]);

  useEffect(() => {
    return () => {
      window.clearInterval(fileVolumeTimer.current);
      audioRef.current?.pause();
      synthRef.current?.dispose();
    };
  }, []);

  return { isPlaying, isUnavailable, start, toggle };
}
