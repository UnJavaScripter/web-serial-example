import { serialHandler } from './serial-handler.js';

/**
 * UI specific code
 * This code is only meant to handle the elements and interactions in this example.
 * For the actual Web Serial API code, check `/src/serial-handler.ts`.
 * If you're not familiar with TypeScript code, just ignore the `<TYPE>` and `:TYPE` parts.
 */

class WebSerialDemoApp {
  connectButtonElem = <HTMLButtonElement>document.getElementById('connect-to-serial')!;
  messageButtons = document.querySelectorAll<HTMLButtonElement>('.message-button')!;
  messageInput = <HTMLInputElement>document.getElementById('message-input')!;
  submitButton = <HTMLElement>document.getElementById('submit-button')!;
  serialMessagesContainer = <HTMLOListElement>document.getElementById('serial-messages-container')!;

  constructor() {
    this.connectButtonElem.onclick = async () => {
      await serialHandler.init();

      this.messageButtons.forEach((button: HTMLButtonElement) => {
          button.removeAttribute('disabled');
      });
    };

    this.messageButtons.forEach((button: HTMLButtonElement) => {
      button.onclick = () => {
        serialHandler.write(String(button.dataset.value));
        this.getSerialMessage();
      }
    });

  }
  
  async getSerialMessage() {
    const now = new Date();
    const listElement = document.createElement('li');

    listElement.innerText = `Message received at ${now.getHours()}:${now.getMinutes()}.${now.getMilliseconds()}: ${await serialHandler.read()}`;
    this.serialMessagesContainer.appendChild(listElement);
    console.log(listElement)
  }
}

new WebSerialDemoApp();