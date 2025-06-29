import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private audioMap: { [key: string]: HTMLAudioElement } = {};
  private initialized = false;

  constructor() {
    this.prepareAudioOnFirstInteraction();
  }

  private prepareAudioOnFirstInteraction() {
    const enableAudio = () => {
      this.initialized = true;
      const silent = new Audio();
      silent.play().catch(() => {});
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('scroll', enableAudio);
    };

    window.addEventListener('click', enableAudio);
    window.addEventListener('scroll', enableAudio);
  }

  playSound(path: string) {
    if (!this.initialized) {
      console.warn('User has not interacted yet — sound might be blocked.');
    }

    if (!this.audioMap[path]) {
      const audio = new Audio(path);
      this.audioMap[path] = audio;
    }

    const audio = this.audioMap[path];
    audio.currentTime = 0;
    audio.play().catch((err) => {
      console.warn(`Failed to play ${path}`, err);
    });
  }
}
