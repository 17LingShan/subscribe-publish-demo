interface EventItem {
  [key: string]: Function[];
}

interface PubSubType {
  events: EventItem;
  subscribe: (eventName: string, callback: Function) => void;
  unsubscribe: (eventName: string, callback: Function) => void;
  publish: <T>(eventName: string, eventData?: T) => void;
}

export type Event1Data = number[];

const PubSub: PubSubType = {
  events: {},
  subscribe: function (eventName, callback) {
    if (!this.events[eventName]?.length) {
      this.events[eventName] = new Array<Function>();
    }

    if (this.events[eventName].includes(callback)) {
      console.warn(`event ${eventName} already has the same callback `);
      return;
    }

    this.events[eventName].push(callback);
  },
  unsubscribe: function (eventName, callback) {
    console.log(eventName);
    if (!this.events[eventName]?.length) {
      console.warn(`event ${eventName} has not any subscriber`);
      return;
    }

    for (let i = 0; i < this.events[eventName].length; ++i) {
      if (this.events[eventName][i] === callback) {
        this.events[eventName].splice(i, 1);
        break;
      }
    }
  },
  publish: function (eventName, eventData) {
    if (!this.events[eventName]?.length) {
      console.warn(`event ${eventName} has not any subscriber`);
      return;
    }

    for (let i = 0; i < this.events[eventName].length; ++i) {
      this.events[eventName][i](eventData);
    }
  },
};

export default PubSub;
