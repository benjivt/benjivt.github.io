// Renders page 1 of the resume PDF to an image for the paper on the desk in the 3D room.
// Run after updating the resume: npm run render:resume
import { readFile, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const PDF = new URL('../info/resumes/Resume 2026.pdf', import.meta.url);
const OUT = new URL('../info/resumes/resume-page.webp', import.meta.url);
const WIDTH = 1700;

const [pdfData, lib, worker] = await Promise.all([
  readFile(PDF),
  readFile(new URL('../node_modules/pdfjs-dist/build/pdf.min.js', import.meta.url), 'utf8'),
  readFile(new URL('../node_modules/pdfjs-dist/build/pdf.worker.min.js', import.meta.url), 'utf8'),
]);

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent('<canvas id="c"></canvas>');
await page.addScriptTag({ content: lib });
const dataUrl = await page.evaluate(
  async ({ pdfBase64, workerSource, width }) => {
    const pdfjs = window.pdfjsLib;
    pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([workerSource], { type: 'text/javascript' }));
    const bytes = Uint8Array.from(atob(pdfBase64), (c) => c.charCodeAt(0));
    const doc = await pdfjs.getDocument({ data: bytes }).promise;
    const pdfPage = await doc.getPage(1);
    const viewport = pdfPage.getViewport({ scale: width / pdfPage.getViewport({ scale: 1 }).width });
    const canvas = document.getElementById('c');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await pdfPage.render({ canvasContext: ctx, viewport }).promise;
    return canvas.toDataURL('image/webp', 0.92);
  },
  { pdfBase64: pdfData.toString('base64'), workerSource: worker, width: WIDTH }
);
await browser.close();

await writeFile(OUT, Buffer.from(dataUrl.split(',')[1], 'base64'));
console.log('wrote', OUT.pathname);
