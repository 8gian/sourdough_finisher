import { Queue } from 'queue-typescript';

export class EventQueue {
  events = new Queue<string>();
  eventListeners: Record<string, (() => void)[]> = {};

  addEvent(event: string) {
    this.events.enqueue(event);
  }

  addEventListener(event: string, f: () => void) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(f);
  }

  removeAllEventListeners(event: string) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
  }

  removeEventListener(event: string, f: () => void) {
    let listeners = this.eventListeners[event];
    if (listeners) {
      const index = listeners.indexOf(f, 0);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  processEvent(event: string) {
    let listeners = this.eventListeners[event];
    if (listeners) {
      listeners.forEach((value) => { value(); });
    }
  }

  clearAll() {
    this.events = new Queue<string>();
  }

  processEvents() {
    while (this.events.length > 0) {
      this.processEvent(this.events.dequeue());
    }
  }

}