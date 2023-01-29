import axios from "axios";
import { requestMethod } from "./requestMethod";
async function regSw() {
  if ("serviceWorker" in navigator) {
    let url = process.env.PUBLIC_URL + "/sw.js";
    const reg = await navigator.serviceWorker.register(url);
    console.log("service config is", { reg });
    return reg;
  }
  throw Error("serviceworker not supported");
}

async function subscribe(serviceWorkerReg, id) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription();
  if (subscription === null)
    subscription = await serviceWorkerReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        "BFpFtQOG8CLr_-AWQfz5JUrLE8FJ7vZEJMAokteah55WbdrW4Rs0BigiS1j0wQZAUO4rkg_EviJc81cDTOXtRNM",
    });
  console.log("subscription is", { subscription });
  requestMethod.put(`user/subscribe/${id}`, subscription);
}

export { regSw, subscribe };
