class SerialLEDController {
  reader: ReadableStreamDefaultReader;
  writer: WritableStreamDefaultWriter;
  encoder = new TextEncoder();
  decoder = new TextDecoder();

  async init() {
    if ('serial' in navigator) {
      try {
        const port = await (navigator as any).serial.requestPort();
        await port.open({ baudrate: 9600 });
        this.reader = port.readable.getReader();
        this.writer = port.writable.getWriter();
      } catch(err) {
        console.error('There was an error opening the serial port:', err);
      }
    } else {
      console.error('Web serial doesn\'t seem to be enabled in your browser. Try enabling it by visiting:')
      console.error('chrome://flags/#enable-experimental-web-platform-features');
      console.error('opera://flags/#enable-experimental-web-platform-features');
      console.error('edge://flags/#enable-experimental-web-platform-features');
    }
  }

  async write(data: string) {
    const dataArrayBuffer = this.encoder.encode(data);
    return await this.writer.write(dataArrayBuffer);
  }

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