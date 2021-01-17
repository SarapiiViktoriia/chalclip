interface TickEvent {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
interface CountdownEvents {
  tick(values: TickEvent): void;
  expired(): void;
  stop(): void;
}
type EventMap<T> = { [K in keyof T]: Function[] };
export class Countdown {
  private listeners: EventMap<CountdownEvents> = { tick: [], expired: [], stop: [] };
  private timer?: number;
  private secondsLeft: number;
  constructor() {
  }
  public getTimeLeft(): number {
    return this.secondsLeft;
  }
  on<K extends keyof CountdownEvents>(eventName: K, listener: CountdownEvents[K]): void {
    this.listeners[eventName].push(listener);
  }
  off<K extends keyof CountdownEvents>(eventName: K, listener: CountdownEvents[K]): void {
    const listeners = this.listeners[eventName];
    const index = listeners.indexOf(listener);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }
  start(seconds: number) {
    this.secondsLeft = seconds;
    const now = new Date();
    now.setSeconds(now.getSeconds() + seconds);
    const end = Math.floor(now.getTime() / 1000);
    const tick = () => {
      const now = Date.now();
      const nowSec = Math.floor(now / 1000);
      const time = end - nowSec;
      if (time <= 0) {
        delete this.timer;
        this.listeners.expired.forEach(listener => listener());
        return;
      }
      const minute = 60;
      const hour = minute * 60;
      const day = hour * 24;
      const days = Math.floor(time / day);
      const hours = Math.floor(time % day / hour);
      const minutes = Math.floor(time % hour / minute);
      const seconds = time % minute;
      this.listeners.tick.forEach(listener => listener({ days, hours, minutes, seconds }));
      const timeToNextSecond = (nowSec + 1) * 1000 - now;
      this.timer = window.setTimeout(tick, timeToNextSecond);
      this.secondsLeft -= 1;
    }
    tick();
  }
  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      delete this.timer;
      this.listeners.stop.forEach(listener => listener());
    }
  }
}
