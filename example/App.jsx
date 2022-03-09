import React, { useState } from 'react'
import { QrScanner } from '@fabiendeborde/react-simple-qr-scanner'
import './App.css'

function App () {
  const [data, setData] = useState('No result')
  const [withTorch, setWithTorch] = useState(false)
  const [focusMode, setFocusMode] = useState('continuous')

  const _handleTorch = () => {
    setWithTorch(current => !current)
  }
  const _handleFocusMode = (e) => {
    setFocusMode(e.target.value)
  }

  const _handleScan = (result) => {
    if (result) setData(result)
  }

  return (
    <div className='container'>
      <div className="qr-reader">
        <QrScanner
          onScan={_handleScan}
          facingMode="environment"
          withTorch={withTorch}
          focusMode={focusMode}
        />
      </div>
      <div className="options-container">
        <button className="toggle-torch" onClick={_handleTorch}>{withTorch ? 'Light Off' : 'Light On'}</button>
        <select className="focus-mode" onChange={_handleFocusMode} value={focusMode}>
          <option value="manual">manual</option>
          <option value="single-shot">single-shot</option>
          <option value="continuous">continuous</option>
        </select>
      </div>
      <div className="decoded">{data}</div>
    </div>
  )
}

export default App
