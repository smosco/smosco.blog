const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new', // 최신 puppeteer에서는 'new'가 안정적
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // ✅ 출력할 페이지 URL
  const targetUrl = 'https://www.smosco.dev/print'; // 예: BIENGUAL 페이지

  await page.goto(targetUrl, {
    waitUntil: 'networkidle0', // 모든 요청이 끝날 때까지 대기
  });

  // ✅ 스타일 최적화를 위한 viewport 설정 (PDF 기준 A4 너비)
  await page.setViewport({
    width: 1080,
    height: 1600,
    deviceScaleFactor: 2,
  });

  // ✅ PDF 저장
  await page.pdf({
    path: 'portfolio.pdf',
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '10mm',
      right: '10mm',
    },
  });

  await browser.close();
  console.log('✅ PDF 저장 완료!');
})();
