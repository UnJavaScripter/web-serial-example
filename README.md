# Web Serial API

A simple demo showing the basics of the Web Serial API connecting a browser with an Arduino.

Check this blog post on Web Serial API to learn more: [https://dev.to/unjavascripter/the-amazing-powers-of-the-web-web-serial-api-3ilc](https://dev.to/unjavascripter/the-amazing-powers-of-the-web-web-serial-api-3ilc)

## Live Demo

https://unjavascripter.github.io/web-serial-example/

## TL;DR

1. Upload the code in `./web_serial_onboard_led.ino` to your Arduino device
1. ~~Enable Chrome's **Experimental Web Platform Features** by visiting [chrome://flags/#enable-experimental-web-platform-features](chrome://flags/#enable-experimental-web-platform-features)~~ Not required anymore, it has been shipped 🚀 
1. Serve the web app code using the tool of your preference, or simply run `npx http-server` to see it live
1. Open the demo on your (Chromium based) browser
1. Use the "Connect to serial port" button to open the Web Serial prompt and pick the right port
1. Send a `1` to turn the LED on, or a `0` to turn it off

### Browser compatibility

So far only Chromium has shipped this API, so you can expect it to work on Chrome, Edge, and Opera. Check [this table](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API#browser_compatibility) for the latest browser compatibility details.