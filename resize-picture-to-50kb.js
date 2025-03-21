<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Resizer to 50KB - FixMyKb</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23fff'/%3E%3Ctext x='50%25' y='50%25' font-family='Poppins, sans-serif' font-size='20' font-weight='700' fill='none' stroke='%23006064' stroke-width='2' text-anchor='middle' dominant-baseline='middle'%3EF%3C/text%3E%3C/svg%3E">
  <style>
    html, body {
      overflow-x: hidden;
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background-color: #f4f4f9;
      color: #37474f;
      line-height: 1.6;
    }

    header {
      background: linear-gradient(135deg, #006064, #0288d1);
      color: #fff;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.1rem;
    }

    .logo-f-circle {
      width: 34px;
      height: 34px;
      background: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      font-weight: 700;
      color: transparent;
      -webkit-text-stroke: 2px #006064;
      text-stroke: 2px #006064;
    }

    .logo-ix {
      font-size: 1.7rem;
      font-weight: 700;
      color: #ffd700;
    }

    .logo-my {
      font-size: 1.7rem;
      font-weight: 700;
      color: #fff;
    }

    .logo-kb {
      font-size: 1.7rem;
      font-weight: 700;
      color: #ffd700;
    }

    header nav ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 1.5rem;
    }

    header nav ul li a {
      color: #fff;
      text-decoration: none;
      font-weight: 500;
    }

    .tool-section {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    .tool-section h1 {
      font-size: 2rem;
      font-weight: 600;
      color: #006064;
      margin-bottom: 0.5rem;
    }

    .tool-section p {
      font-size: 1rem;
      color: #37474f;
      margin-bottom: 1.5rem;
    }

    .drop-zone {
      border: 2px dashed #006064;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      margin-bottom: 20px;
      font-size: 0.9rem;
      color: #37474f;
    }

    .drop-zone.dragover {
      background: #e0f2f1;
    }

    .file-info {
      font-size: 0.9rem;
      color: #37474f;
      margin-bottom: 1rem;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 1.5rem;
    }

    .controls input[type="number"] {
      padding: 0.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      width: 100px;
      font-size: 0.9rem;
    }

    .controls select {
      padding: 0.5rem;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      width: 150px;
      font-size: 0.9rem;
      background: #fff;
      color: #37474f;
    }

    .controls label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;
    }

    .controls button {
      background: linear-gradient(135deg, #006064, #0288d1);
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: transform 0.3s ease;
    }

    .controls button:hover {
      transform: scale(1.05);
    }

    .preview-container {
      display: flex;
      justify-content: space-between;
      margin: 20px 0;
      gap: 10px;
    }

    .preview-container div {
      flex: 1;
      text-align: center;
    }

    .preview-container p {
      font-size: 1rem;
      font-weight: 600;
      color: #006064;
      margin-bottom: 0.5rem;
    }

    .preview-container img {
      max-width: 100%;
      max-height: 200px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
    }

    .preview-container .processing {
      color: #006064;
      font-style: italic;
    }

    .image-properties {
      font-size: 0.9rem;
      color: #37474f;
      margin-top: 1rem;
    }

    .image-properties span {
      font-weight: 600;
      color: #37474f;
    }

    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }

    .action-buttons button {
      background: linear-gradient(135deg, #006064, #0288d1);
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
      font-weight: 500;
      transition: transform 0.3s ease;
    }

    .action-buttons button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .action-buttons button:hover:not(:disabled) {
      transform: scale(1.05);
    }

    footer {
      background-color: #263238;
      color: white;
      padding: 2rem 1rem;
      text-align: center;
    }

    footer .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }

    footer .footer-section {
      flex: 1;
      min-width: 200px;
    }

    footer h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    footer ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    footer ul li {
      margin-bottom: 0.5rem;
    }

    footer ul li a {
      color: white;
      text-decoration: none;
      font-size: 0.9rem;
    }

    footer ul li a:hover {
      text-decoration: underline;
    }

    footer .social-links {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 1rem;
    }

    footer .social-links a {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
    }

    footer .social-links a:hover {
      color: #ff5722;
    }

    footer .copyright {
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #fff;
    }

    @media (max-width: 768px) {
      .tool-section h1 {
        font-size: 1.5rem;
      }
      .controls {
        flex-direction: column;
        align-items: center;
      }
      .preview-container {
        flex-direction: column;
        gap: 1.5rem;
      }
      .action-buttons {
        flex-direction: column;
        gap: 0.5rem;
      }
      .footer-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      header {
        flex-direction: column;
        text-align: center;
      }
      header nav ul {
        flex-direction: column;
        gap: 0.5rem;
      }
      .tool-section {
        margin: 1rem;
        padding: 1.5rem;
      }
      footer .footer-section:first-child {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <header>
    <div class="logo">
      <span class="logo-f-circle">F</span>
      <span class="logo-ix">ix</span>
      <span class="logo-my">My</span>
      <span class="logo-kb">Kb</span>
    </div>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <section class="tool-section">
      <h1>Image Resizer to 50KB</h1>
      <p>Resize and compress your image to 50KB or less with automatic or custom options.</p>

      <div class="drop-zone" id="drop-zone">Drop Your Image Here or Click to Upload</div>
      <input type="file" id="file-input" accept="image/jpeg,image/png" style="display: none;">
      <div class="file-info" id="file-info">File: -- | Size: --</div>

      <div class="controls">
        <input type="number" id="width" placeholder="Width (px)" min="1">
        <input type="number" id="height" placeholder="Height (px)" min="1">
        <label><input type="checkbox" id="aspect-ratio" checked> Lock Aspect Ratio</label>
        <select id="presets">
          <option value="">Select Preset</option>
          <option value="200x200">200x200 (Square)</option>
          <option value="300x150">300x150 (Wide)</option>
          <option value="150x200">150x200 (Tall)</option>
          <option value="100x100">100x100 (Small Square)</option>
        </select>
        <button id="auto-resize-btn">Resize to 50KB</button>
        <button id="custom-resize-btn">Custom Resize Image</button>
      </div>

      <div class="preview-container">
        <div>
          <p>Original</p>
          <div id="original-preview"></div>
          <div class="image-properties" id="original-props">Width: <span id="originalWidth">0</span>px, Height: <span id="originalHeight">0</span>px, Size: <span id="originalSize">0</span>KB</div>
        </div>
        <div>
          <p>Resized</p>
          <div id="resized-preview"></div>
          <div class="image-properties" id="resized-props">Width: <span id="resizedWidth">0</span>px, Height: <span id="resizedHeight">0</span>px, Size: <span id="resizedSize">0</span>KB</div>
        </div>
      </div>

      <div class="action-buttons">
        <button id="download-btn" disabled>Download</button>
        <button id="reset-btn">Reset</button>
      </div>
    </section>
  </main>

  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <div class="logo">
          <span class="logo-f-circle">F</span>
          <span class="logo-ix">ix</span>
          <span class="logo-my">My</span>
          <span class="logo-kb">Kb</span>
        </div>
        <p>Your all-in-one solution for powerful tools.</p>
      </div>
      <div class="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Legal</h3>
        <ul>
          <li><a href="privacy.html">Privacy Policy</a></li>
          <li><a href="terms.html">Terms of Service</a></li>
   >

  <script>
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileInfo = document.getElementById('file-info');
    const widthInput = document.getElementById('width');
    const heightInput = document.getElementById('height');
    const aspectRatioCheckbox = document.getElementById('aspect-ratio');
    const presetsSelect = document.getElementById('presets');
    const autoResizeBtn = document.getElementById('auto-resize-btn');
    const customResizeBtn = document.getElementById('custom-resize-btn');
    const originalPreview = document.getElementById('original-preview');
    const resizedPreview = document.getElementById('resized-preview');
    const originalWidth = document.getElementById('originalWidth');
    const originalHeight = document.getElementById('originalHeight');
    const originalSize = document.getElementById('originalSize');
    const resizedWidth = document.getElementById('resizedWidth');
    const resizedHeight = document.getElementById('resizedHeight');
    const resizedSize = document.getElementById('resizedSize');
    const downloadBtn = document.getElementById('download-btn');
    const resetBtn = document.getElementById('reset-btn');

    let originalImage, resizedImageBlob, origWidth, origHeight, fileName;

    dropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropZone.classList.remove('dragover');
      handleFile(e.dataTransfer.files[0]);
    });
    dropZone.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

    function handleFile(file) {
      if (!file || (file.type !== 'image/jpeg' && file.type !== 'image/png')) {
        alert('Please upload a JPG or PNG image!');
        return;
      }
      fileName = file.name || 'image';
      const reader = new FileReader();
      reader.onload = (e) => {
        originalImage = new Image();
        originalImage.onload = () => {
          origWidth = originalImage.width;
          origHeight = originalImage.height;
          widthInput.value = origWidth;
          heightInput.value = origHeight;
          fileInfo.textContent = `File: ${fileName} | Size: ${(file.size / 1024).toFixed(1)}KB`;
          originalPreview.innerHTML = `<img src="${e.target.result}" alt="Original Image">`;
          resizedPreview.innerHTML = '';
          originalWidth.textContent = origWidth;
          originalHeight.textContent = origHeight;
          originalSize.textContent = (file.size / 1024).toFixed(1);
          resizedWidth.textContent = 0;
          resizedHeight.textContent = 0;
          resizedSize.textContent = 0;
          downloadBtn.disabled = true;
        };
        originalImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    widthInput.addEventListener('input', () => {
      if (aspectRatioCheckbox.checked && origWidth && origHeight) {
        heightInput.value = Math.round((widthInput.value / origWidth) * origHeight);
      }
    });
    heightInput.addEventListener('input', () => {
      if (aspectRatioCheckbox.checked && origWidth && origHeight) {
        widthInput.value = Math.round((heightInput.value / origHeight) * origWidth);
      }
    });

    presetsSelect.addEventListener('change', () => {
      const value = presetsSelect.value;
      if (value) {
        const [width, height] = value.split('x').map(Number);
        widthInput.value = width;
        heightInput.value = height;
      }
    });

    function resizeTo50KB() {
      if (!originalImage) {
        alert('Please upload an image first!');
        return;
      }
      resizedPreview.innerHTML = '<p class="processing">Processing...</p>';
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxWidth = 300; // Default for auto resize
      const aspectRatio = originalImage.width / originalImage.height;
      const height = maxWidth / aspectRatio;
      canvas.width = maxWidth;
      canvas.height = height;
      ctx.drawImage(originalImage, 0, 0, maxWidth, height);

      let quality = 0.9;
      const maxSizeKB = 50;

      function tryCompression(currentQuality) {
        canvas.toBlob((blob) => {
          const sizeKB = blob.size / 1024;
          if (sizeKB <= maxSizeKB || currentQuality <= 0.1) {
            resizedImageBlob = blob;
            const url = URL.createObjectURL(blob);
            resizedPreview.innerHTML = `<img src="${url}" alt="Resized Image">`;
            resizedWidth.textContent = maxWidth;
            resizedHeight.textContent = Math.round(height);
            resizedSize.textContent = sizeKB.toFixed(1);
            downloadBtn.disabled = false;
          } else {
            tryCompression(currentQuality - 0.1);
          }
        }, 'image/jpeg', currentQuality);
      }
      tryCompression(quality);
    }

    function customResizeTo50KB() {
      if (!originalImage) {
        alert('Please upload an image first!');
        return;
      }
      resizedPreview.innerHTML = '<p class="processing">Processing...</p>';
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const width = parseInt(widthInput.value) || origWidth;
      const height = parseInt(heightInput.value) || origHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(originalImage, 0, 0, width, height);

      let quality = 0.9;
      const maxSizeKB = 50;

      function tryCompression(currentQuality) {
        canvas.toBlob((blob) => {
          const sizeKB = blob.size / 1024;
          if (sizeKB <= maxSizeKB || currentQuality <= 0.1) {
            resizedImageBlob = blob;
            const url = URL.createObjectURL(blob);
            resizedPreview.innerHTML = `<img src="${url}" alt="Resized Image">`;
            resizedWidth.textContent = width;
            resizedHeight.textContent = height;
            resizedSize.textContent = sizeKB.toFixed(1);
            downloadBtn.disabled = false;
          } else {
            tryCompression(currentQuality - 0.1);
          }
        }, 'image/jpeg', currentQuality);
      }
      tryCompression(quality);
    }

    function resetTool() {
      originalImage = null;
      resizedImageBlob = null;
      origWidth = null;
      origHeight = null;
      fileName = null;
      widthInput.value = '';
      heightInput.value = '';
      presetsSelect.value = '';
      fileInfo.textContent = 'File: -- | Size: --';
      originalPreview.innerHTML = '';
      resizedPreview.innerHTML = '';
      originalWidth.textContent = 0;
      originalHeight.textContent = 0;
      originalSize.textContent = 0;
      resizedWidth.textContent = 0;
      resizedHeight.textContent = 0;
      resizedSize.textContent = 0;
      downloadBtn.disabled = true;
      fileInput.value = '';
    }

    autoResizeBtn.addEventListener('click', resizeTo50KB);
    customResizeBtn.addEventListener('click', customResizeTo50KB);
    downloadBtn.addEventListener('click', () => {
      if (!resizedImageBlob) return;
      const link = document.createElement('a');
      link.href = URL.createObjectURL(resizedImageBlob);
      link.download = `resized-image-50kb.jpg`;
      link.click();
    });
    resetBtn.addEventListener('click', resetTool);
  </script>
</body>
</html>