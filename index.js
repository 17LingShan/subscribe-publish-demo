// const SubPub = {
//   events: {},
//   subscribe: function (eventName, callback) {
//     // 如果没有eventName则直接创建新的键值对
//     if (!this.events[eventName]) this.events[eventName] = [];
//     // 防止重复绑定事件
//     if (!this.events[eventName].includes(callback)) {
//       this.events[eventName].push(callback);
//     }
//   },

//   unsubscribe: function (eventName, callback) {
//     if (!this.events[eventName]) {
//       console.warn(`${eventName} has not subscriber`);
//       return;
//     }
//     console.log(this.events[eventName]);
//     for (let i = 0; i < this.events[eventName].length; ++i) {
//       if (this.events[eventName][i] === callback) {
//         this.events[eventName].splice(i, 1);
//         break;
//       }
//     }
//   },
//   publish: function (eventName, ...restArg) {
//     if (!this.events[eventName]?.length) {
//       console.warn(`${eventName} has no subscriber`);
//       return;
//     }
//     console.log(restArg);
//     for (let i = 0; i < this.events[eventName].length; ++i) {
//       this.events[eventName][i](...restArg);
//     }
//   },
// };

class SubPub {
  events = {};

  subscribe(eventName, callback) {
    if (!this.events[eventName]) this.events[eventName] = [];

    this.events[eventName].push(callback);
  }

  unsubscribe(eventName, callback) {
    if (!this.events[eventName]?.length) {
      console.warn(`event ${eventName} has not any callback`);
      return;
    }

    for (let i = 0; i < this.events[eventName].length; ++i) {
      if (this.events[eventName][i] === callback) {
        this.events[eventName].splice(i, 1);
      }
    }
  }

  publish(eventName, ...restArg) {
    if (!this.events[eventName]?.length) {
      console.warn(`event ${eventName} has no any subscriber`);
      return;
    }

    for (let i = 0; i < this.events[eventName].length; ++i) {
      this.events[eventName][i](...restArg);
    }
  }
}

const subPubInstance = new SubPub();

const subscribe1 = document.querySelector("#subscribe1");
const subscribe2 = document.querySelector("#subscribe2");
const unsubscribe1 = document.querySelector("#unsubscribe1");
const unsubscribe2 = document.querySelector("#unsubscribe2");
const publish1 = document.querySelector("#publish1");
const publish2 = document.querySelector("#publish2");

function handleSub1(a, b, c) {
  alert(`sub1 and ${a + b + c}`);
}

function handleSub2() {
  alert("sub2");
}

subscribe1.addEventListener("click", () => {
  subPubInstance.subscribe("event1", handleSub1);
});

subscribe2.addEventListener("click", () => {
  subPubInstance.subscribe("event2", handleSub2);
});

publish1.addEventListener("click", () => {
  subPubInstance.publish("event1", 1, 2, +new Date().getSeconds());
});

publish2.addEventListener("click", () => {
  subPubInstance.publish("event2");
});

unsubscribe1.addEventListener("click", () => {
  subPubInstance.unsubscribe("event1", handleSub1);
});

unsubscribe2.addEventListener("click", () => {
  subPubInstance.unsubscribe("event2", handleSub2);
});

subPubInstance.subscribe("event1", () => {
  console.log("123");
});
