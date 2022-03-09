# React Simple QR Scanner
[![GitHub release](https://img.shields.io/github/v/release/FabienDeborde/react-simple-qr-scanner)](https://github.com/FabienDeborde/react-simple-qr-scanner/releases/)
![Size](https://img.shields.io/github/languages/code-size/FabienDeborde/react-simple-qr-scanner)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/FabienDeborde/react-simple-qr-scanner/blob/master/LICENSE.md)


A simple React wrapper around browser native BarcodeDetector API.  

# Compatibility
⚠️ Support is really not good at the moment, but enough for my use case.  
If I have the time I may try to use the canvas method to have a fallback when BarcodeDetector is not available.  
You can check here the global support of this API: [caniuse](https://caniuse.com/mdn-api_barcodedetector)



# Setup
```
npm i @fabiendeborde/react-simple-qr-scanner
```

```
yarn add  @fabiendeborde/react-simple-qr-scanner
```


# Props

| name  | type | default  | description |
| ------------- | ------------- | ------------- | ------------- |
| onScan *-required-*  | (decoded: string) => void  | none  | Scan event handler (will be called with the decoded string)  |
| containerStyle  | React.CSSProperties  | empty object  | A style object for the video wrapper element |
| videoStyle  | React.CSSProperties  | empty object  | A style object for the video element  |
| withTorch  | boolean  | false  | Toggle the camera torch (light)  |
| focusMode  | 'manual', 'single-shot', 'continuous'  | 'continuous'  | Set the camera focus mode  |
| facingMode  | 'environment', 'user'  | none  | Specify which camera should be used (if available)  |

# Usage
```jsx
<QrScanner
  onScan={(decoded) => console.log(decoded)}
  facingMode="environment"
  withTorch={false}
  focusMode="continuous"
/>
```
You can also find a really basic example in the `example` folder of this repository.

# Issues
If you find a bug or would like to see some new features in this library, feel free to open an issue [here](https://github.com/FabienDeborde/react-simple-qr-scanner/issues).  
I'll try my best to look at it and answer you quickly.

# License
Distributed under the ISC license. See [LICENSE](https://github.com/FabienDeborde/react-simple-qr-scanner/blob/master/LICENSE) for more information.
