import { serialHandler } from './serial-handler.js';

/**
 * UI specific code
 * This code is only meant to handle the elements and interactions in this example.
 * For the actual Web Serial API code, check `/src/serial-handler.ts`.
 * If you're not familiar with TypeScript code, just ignore the `<TYPE>` and `:TYPE` parts.
 */

class WebSerialDemoApp {
  connectButtonElem = <HTMLButtonElement>document.getElementById('connect-to-serial')!;
  getSerialMessages = <HTMLElement>document.getElementById('get-serial-messages')!;
  messageForm = <HTMLElement>document.getElementById('message-form')!;
  messageInput = <HTMLInputElement>document.getElementById('message-input')!;
  submitButton = <HTMLElement>document.getElementById('submit-button')!;
  serialMessagesContainer = <HTMLOListElement>document.getElementById('serial-messages-container')!;

  constructor() {
    this.connectButtonElem.onclick = () => {
      serialHandler.init();

      this.messageInput.removeAttribute('disabled');
      this.submitButton.removeAttribute('disabled');
    };

    this.messageForm.addEventListener('submit', async (event: Event) => {
      event.preventDefault();
      await serialHandler.write(this.messageInput.value);
      this.getSerialMessage();
    });

    this.getSerialMessages.onclick = async () => {
      this.getSerialMessage();
    };

  }
  
  async getSerialMessage() {
    const now = new Date();
    const listElement = document.createElement('li');

    listElement.innerText = `Message received at ${now.getHours()}:${now.getMinutes()}.${now.getMilliseconds()}: ${await serialHandler.read()}`;
    this.serialMessagesContainer.appendChild(listElement);
  }
}

new WebSerialDemoApp();