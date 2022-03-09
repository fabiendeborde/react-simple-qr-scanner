import React, { useCallback, useEffect, useState, useRef } from 'react'
import styles from './QrScanner.module.css'

// TODO: find a way to have correct typings for BarcodeDetector
declare const BarcodeDetector: any

type QrScannerProps = {
  onScan: (decoded: string) => void;
  containerStyle?: React.CSSProperties;
  videoStyle?: React.CSSProperties;
  withTorch?: boolean;
  focusMode?: 'manual'|'single-shot'|'continuous';
  facingMode?: 'environment'|'user'
}

export default function QrScanner ({
  onScan,
  containerStyle = {},
  videoStyle = {},
  withTorch = false,
  focusMode = 'continuous',
  facingMode

}: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream>()
  const [videoTrack, setVideoTrack] = useState<MediaStreamTrack>()
  const [decoded, setDecoded] = useState<string>()

  // Check device for cameras & store video stream & video track
  const getCameraStream = useCallback(
    async () => {
      try {
        if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
          const devices = await navigator.mediaDevices.enumerateDevices()
          const camera = devices.find(device => device.kind === 'videoinput')

          if (!camera) throw new Error('No camera found on this device.')

          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              deviceId: camera.deviceId,
              facingMode: {
                exact: facingMode
              }
            }
          })
          if (stream) {
            setStream(stream)
            setVideoTrack(stream.getVideoTracks()?.[0])
          } else {
            throw new Error('No stream returned from media device')
          }
        } else {
          throw new Error('mediaDevices or getUserMedia not supported')
        }
      } catch (error) {
        console.error('Camera error', error)
      }
    },
    []
  )
  useEffect(() => {
    getCameraStream()
  }, [])

  // Display a stream of video inside video element
  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  // Use browser BarcodeDetector to check for qr code from video source
  function checkForQR () {
    const video = videoRef?.current
    const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] })

    // check compatibility
    if (barcodeDetector && video) {
      async function render () {
        if (video?.readyState === video?.HAVE_ENOUGH_DATA) {
          try {
            const barcodes = await barcodeDetector.detect(video)
            if (barcodes && barcodes.length) {
              if (barcodes[0].rawValue !== decoded) setDecoded(barcodes[0].rawValue)
            }
          } catch (error) {
            console.error('QR detection error', error)
          }
        }
      }

      (function renderLoop () {
        requestAnimationFrame(renderLoop)
        render()
      })()
    } else {
      throw new Error('Barcode Detector is not supported by this browser.')
    }
  }
  useEffect(() => {
    checkForQR()
  }, [])

  // Call onScan callback on decoded data change
  useEffect(() => {
    if (onScan && decoded) {
      onScan(decoded)
    }
  }, [decoded])

  // Update video track constraints helper
  // eslint-disable-next-line no-undef
  const updateVideoConstraint = async (constraints: MediaTrackConstraints) => {
    if (videoTrack) {
      await videoTrack.applyConstraints(constraints)
    }
  }
  // Update video track torch constraint shorthand
  const updateTorchConstraint = (torch: boolean) => {
    updateVideoConstraint({
      advanced: [{
        torch
      }]
    })
  }
  // Update video track focus mode constraint shorthand
  // eslint-disable-next-line no-undef
  const updateFocusModeConstraint = (focusMode: W3C.ConstrainString) => {
    updateVideoConstraint({
      advanced: [{
        focusMode
      }]
    })
  }
  useEffect(() => {
    updateTorchConstraint(withTorch)
  }, [videoTrack, withTorch])
  useEffect(() => {
    updateFocusModeConstraint(focusMode)
  }, [videoTrack, focusMode])

  return (
    <div className={styles.qrContainer} style={containerStyle}>
      <video
        ref={videoRef}
        className={styles.video}
        style={videoStyle}
        autoPlay
      />
    </div>
  )
}
