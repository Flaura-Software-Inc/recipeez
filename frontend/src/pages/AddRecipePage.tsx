import { createWorker, Worker } from 'tesseract.js';
import { useEffect, useState } from 'react';

export default function AddRecipePage() {
  const [ocr, setOcr] = useState('Recognizing...');
  const [worker, setWorker] = useState<Worker>();

  const doOCR = async () => {
    if (!worker) {
      setWorker(
        await createWorker({
          logger: (m) => console.log(m),
        })
      );
    }
    await worker!.load();
    await worker!.loadLanguage('eng');
    await worker!.initialize('eng');
    const {
      data: { text },
    } = await worker!.recognize('https://i.ibb.co/yNpyTL1/upscaled-recipe.jpg');
    setOcr(text);
  };
  useEffect(() => {
    doOCR();
  });
  return (
    <div className="App">
      <p>{ocr}</p>
    </div>
  );
}
