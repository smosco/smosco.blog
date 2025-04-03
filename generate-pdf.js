const { default: puppeteer } = require('puppeteer');

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: 'new', // puppeteer@20 이상에서 사용
  });
  const page = await browser.newPage();

  // 👉 로컬 서버가 실행 중이어야 함 (예: http://localhost:3000/print/next-table-order)
  const url = 'http://localhost:3000/portfolio/print';

  await page.goto(url, { waitUntil: 'networkidle0' });

  // 👉 스타일에 따라 원하는 margin, format 지정
  const pdfBuffer = await page.pdf({
    path: 'output/NextTableOrder.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '40px',
      bottom: '40px',
      left: '40px',
      right: '40px',
    },
  });

  await browser.close();
}

generatePDF();
