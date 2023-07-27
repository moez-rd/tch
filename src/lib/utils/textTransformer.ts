import { technofest } from '@/config/technofest';

interface SetMessenger {
  (messenger: string): void;
}

type FadeBufferObj = {
  c: number;
  l: string;
};

export class Messenger {
  codeletters: string;
  message: number;
  current_length: number;
  fadeBuffer: FadeBufferObj[];
  messages: string[];
  setMessenger: SetMessenger;

  constructor(setMessenger: SetMessenger) {
    this.codeletters = '&#*+%?£@§$0123456789';
    this.message = 0;
    this.current_length = 0;
    this.fadeBuffer = [];
    this.messages = technofest.textTransformers;
    this.setMessenger = setMessenger;
    this.animateIn();
  }

  generateRandomString(length: number) {
    let random_text = '';
    while (random_text.length < length) {
      random_text += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));
    }

    return random_text;
  }

  animateIn() {
    if (this.current_length < this.messages[this.message].length) {
      this.current_length += 2;
      if (this.current_length > this.messages[this.message].length) {
        this.current_length = this.messages[this.message].length;
      }
      const message = this.generateRandomString(this.current_length);
      this.setMessenger(message);

      setTimeout(() => {
        this.animateIn();
      }, 20);
    } else {
      setTimeout(() => {
        this.animateFadeBuffer();
      }, 20);
    }
  }

  animateFadeBuffer() {
    if (this.fadeBuffer.length === 0) {
      // this.fadeBuffer = [];
      for (let i = 0; i < this.messages[this.message].length; i += 1) {
        this.fadeBuffer.push({
          c: Math.floor(Math.random() * 12) + 1,
          l: this.messages[this.message].charAt(i),
        });
      }
    }

    let do_cycles = false;
    let message = '';

    for (let i = 0; i < this.fadeBuffer.length; i += 1) {
      const fader = this.fadeBuffer[i];
      if (fader.c > 0) {
        do_cycles = true;
        fader.c -= 1;
        message += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));
      } else {
        message += fader.l;
      }
    }

    this.setMessenger(message);

    if (do_cycles) {
      setTimeout(() => {
        this.animateFadeBuffer();
      }, 50);
    } else {
      setTimeout(() => {
        this.cycleText();
      }, 4000);
    }
  }

  cycleText() {
    this.message += 1;
    if (this.message >= this.messages.length) {
      this.message = 0;
    }

    this.current_length = 0;
    this.fadeBuffer = [];

    setTimeout(() => {
      this.animateIn();
    }, 200);
  }
}
