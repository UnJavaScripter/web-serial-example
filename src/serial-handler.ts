/**
 * If you're not familiar with TypeScript code, just ignore the `<TYPE>` and `:TYPE` parts.
 */

class SerialHandler {
  reader: ReadableStreamDefaultReader;
  writer: WritableStreamDefaultWriter;
  encoder = new TextEncoder();
  decoder = new TextDecoder();

  /**
   * Triggers the menu where the user will pick a device (it requires an user interaction to be triggered).
   * Opens the port selected by the user in the UI using a defined `baudRate`; this example uses a hard-coded value of 9600.
   * After opening the port, a `writer` and a `reader` are set; they will be used by the `write` and `read` methods respectively.
   */
  async init() {
    if ('serial' in navigator) {
      try {
        const port = await (navigator as any).serial.requestPort();
        await port.open({ baudRate: 9600 }); // `baudRate` was `baudrate` in previous versions.

        this.writer = port.writable.getWriter();
        this.reader = port.readable.getReader();
        
        const signals = await port.getSignals();
        console.log(signals);
      } catch(err) {
        console.error('There was an error opening the serial port:', err);
      }
    } else {
      console.error('Web serial doesn\'t seem to be enabled in your browser. Check https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility for more info.')
    }
  }

  /**
   * Takes a string of data, encodes it and then writes it using the `writer` attached to the serial port.
   * @param data - A string of data that will be sent to the Serial port.
   * @returns An empty promise after the message has been written.
   */
  async write(data: string): Promise<void> {
    const dataArrayBuffer = this.encoder.encode(data);
    return await this.writer.write(dataArrayBuffer);
  }

  /**
   * Gets data from the `reader`, decodes it and returns it inside a promise.
   * @returns A promise containing either the message from the `reader` or an error.
   */
  async read(): Promise<string> {
    try {
      const readerData = await this.reader.read();
      return this.decoder.decode(readerData.value);
    } catch (err) {
      const errorMessage = `error reading data: ${err}`;
      console.error(errorMessage);
      return errorMessage;
    }
  }
}


export const serialHandler = new SerialHandler();