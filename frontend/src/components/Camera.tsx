import { createSignal, onCleanup, onMount } from 'solid-js';
import { BrowserMultiFormatReader } from '@zxing/browser';

interface CameraProps {
  onError?: (error: unknown) => void;
  onQr: (qr: string) => void;
}

function Camera(props:CameraProps) {
  let videoRef: HTMLVideoElement | undefined;
  const [scanning, setScanning] = createSignal(true);
  let codeReader: BrowserMultiFormatReader;
  let controls: any;

  onMount(() => {
    if (!videoRef) return;
    codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromVideoDevice(undefined, videoRef, (result, err) => {
        if (result) {
          const qrText = result.getText();
          props.onQr(qrText);
        }
        if (err && props.onError) {
          props.onError(err);
        }
      })
      .then((c) => (controls = c))
      .catch((error) => {
        if (props.onError) props.onError(error);
      });
  });

  onCleanup(() => {
    controls?.stop();
    setScanning(false);
  });

  return (
    <div>
      <video ref={(el) => (videoRef = el as HTMLVideoElement)} style={{ width: '100%', height: 'auto' }} autoplay></video>
    </div>
  );
};

export default Camera;
