// src/utils/ScreenshotService.js
import { useEffect } from 'react';
import html2canvas from 'html2canvas';

const KEYWORD = 'take screenshot'; // your voice command keyword

function ScreenshotService() {
  useEffect(() => {
    const handleVoiceCommand = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      if (transcript.includes(KEYWORD)) {
        // Screenshot the entire page body
        html2canvas(document.body).then(canvas => {
          // you can do something with the canvas here
          canvas.toBlob(blob => {
            // For example, download the image:
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'screenshot.png';
            link.click();
            URL.revokeObjectURL(url);
          });
        });
      }
    };

    // Setup SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('SpeechRecognition API not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.addEventListener('result', handleVoiceCommand);
    recognition.start();

    return () => {
      recognition.removeEventListener('result', handleVoiceCommand);
      recognition.stop();
    };
  }, []);

  return null;
}

export default ScreenshotService;
