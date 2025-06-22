// src/utils/ScreenshotService.js
import { useEffect } from 'react';
import html2canvas from 'html2canvas';

const KEYWORD = 'take screenshot'; 
function ScreenshotService() {
  useEffect(() => {
    const handleVoiceCommand = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      if (transcript.includes(KEYWORD)) {
        
        html2canvas(document.body).then(canvas => {
          
          canvas.toBlob(blob => {
           
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
