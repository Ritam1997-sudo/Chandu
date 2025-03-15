// Element References
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
const toolButtons = document.querySelectorAll('.relevant-tools button');

let originalImage, resizedImageBlob, origWidth, origHeight, fileName;

// File Input Handling
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

// Aspect Ratio Lock
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

// Preset Selection
presetsSelect.addEventListener('change', () => {
  const value = presetsSelect.value;
  if (value) {
    const [width, height] = value.split('x').map(Number);
    widthInput.value = width;
    heightInput.value = height;
  }
});

// Automatic Resize to 20KB
function resizeTo20KB() {
  if (!originalImage) {
    alert('Please upload an image first!');
    return;
  }
  resizedPreview.innerHTML = '<p class="processing">Processing...</p>';
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const maxWidth = 200; // Default for auto resize
  const aspectRatio = originalImage.width / originalImage.height;
  const height = maxWidth / aspectRatio;
  canvas.width = maxWidth;
  canvas.height = height;
  ctx.drawImage(originalImage, 0, 0, maxWidth, height);

  let quality = 0.9;
  const maxSizeKB = 20;

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

// Custom Resize to 20KB
function customResizeTo20KB() {
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
  const maxSizeKB = 20;

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

// Reset Function
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

// Event Listeners for Tool
autoResizeBtn.addEventListener('click', resizeTo20KB);
customResizeBtn.addEventListener('click', customResizeTo20KB);
downloadBtn.addEventListener('click', () => {
  if (!resizedImageBlob) return;
  const link = document.createElement('a');
  link.href = URL.createObjectURL(resizedImageBlob);
  link.download = `resized-image-20kb.jpg`;
  link.click();
});
resetBtn.addEventListener('click', resetTool);

// Event Listeners for Relevant Tools Buttons
toolButtons.forEach(button => {
  button.addEventListener('click', () => {
    const href = button.getAttribute('data-href');
    if (href) window.location.href = href;
  });
});