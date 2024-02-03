import PubSub, { Event1Data } from "./PubSub";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
   <button id="subscribe1">订阅事件1</button>
    <button id="subscribe2">订阅事件2</button>
    <button id="unsubscribe1">解绑事件1</button>
    <button id="unsubscribe2">解绑事件2</button>
    <button id="publish1">发布事件1</button>
    <button id="publish2">发布事件2</button>
`;

const publish1 = document.querySelector("#publish1") as HTMLButtonElement;
const publish2 = document.querySelector("#publish2") as HTMLButtonElement;
const subscribe1 = document.querySelector("#subscribe1") as HTMLButtonElement;
const subscribe2 = document.querySelector("#subscribe2") as HTMLButtonElement;
const unsubscribe1 = document.querySelector(
  "#unsubscribe1"
) as HTMLButtonElement;
const unsubscribe2 = document.querySelector(
  "#unsubscribe2"
) as HTMLButtonElement;

function handleEvent1(event1Data: Event1Data) {
  console.log(
    "event1 fire",
    event1Data.reduce((prev, current) => prev + current)
  );
}

function handleEvent2() {
  console.log("event2 fire");
}

subscribe1?.addEventListener("click", () => {
  PubSub.subscribe("event1", handleEvent1);
});

subscribe2?.addEventListener("click", () => {
  PubSub.subscribe("event2", handleEvent2);
});

unsubscribe1.addEventListener("click", () => {
  PubSub.unsubscribe("event1", handleEvent1);
});

unsubscribe2.addEventListener("click", () => {
  PubSub.unsubscribe("event2", handleEvent2);
});

publish1.addEventListener("click", () => {
  PubSub.publish<Event1Data>("event1", [1, 2, 3, 4]);
});

publish2.addEventListener("click", () => {
  PubSub.publish("event2");
});
