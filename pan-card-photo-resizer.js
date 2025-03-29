document.addEventListener('DOMContentLoaded', () => {
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');
  const imageType = document.getElementById('image-type');
  const widthInput = document.getElementById('width');
  const heightInput = document.getElementById('height');
  const lockAspectCheckbox = document.getElementById('lock-aspect');
  const resizeBtn = document.getElementById('resize-btn');
  const resetBtn = document.getElementById('reset-btn');
  const originalPreview = document.getElementById('original-preview');
  const resizedPreview = document.getElementById('resized-preview');
  const originalImg = document.getElementById('original-img');
  const resizedImg = document.getElementById('resized-img');
  const originalProps = document.getElementById('original-props');
  const resizedProps = document.getElementById('resized-props');
  const downloadBtn = document.getElementById('download-btn');

  let originalImage = null;
  let aspectRatio = 1;

  // Upload handling
  uploadArea.addEventListener('click', () => fileInput.click());
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });
  uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));

  function handleFile(file) {
    if (!file || !file.type.match('image/jpeg|image/png')) {
      alert('Please upload a JPEG or PNG file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      originalImage = new Image();
      originalImage.onload = () => {
        originalImg.src = e.target.result;
        originalProps.textContent = `Dimensions: ${originalImage.width}x${originalImage.height}px | Size: ${(file.size / 1024).toFixed(2)} KB`;
        originalPreview.classList.add('active');
        aspectRatio = originalImage.width / originalImage.height;
        resizeBtn.disabled = false;
        updateDimensions();
      };
      originalImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Image type switch
  imageType.addEventListener('change', updateDimensions);
  function updateDimensions() {
    if (imageType.value === 'photo') {
      widthInput.value = 276; // 3.5 cm at 200 DPI
      heightInput.value = 197; // 2.5 cm at 200 DPI
    } else {
      widthInput.value = 157; // 2 cm at 200 DPI
      heightInput.value = 354; // 4.5 cm at 200 DPI
    }
  }

  // Aspect ratio locking
  widthInput.addEventListener('input', () => {
    if (lockAspectCheckbox.checked && originalImage) {
      heightInput.value = Math.round(widthInput.value / aspectRatio);
    }
  });
  heightInput.addEventListener('input', () => {
    if (lockAspectCheckbox.checked && originalImage) {
      widthInput.value = Math.round(heightInput.value * aspectRatio);
    }
  });

  // Resize image
  resizeBtn.addEventListener('click', () => {
    if (!originalImage) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    // Compress to ensure <= 50KB
    let quality = 0.9;
    let dataUrl;
    do {
      dataUrl = canvas.toDataURL('image/jpeg', quality);
      quality -= 0.1;
    } while ((dataUrl.length * 0.75 / 1024) > 50 && quality > 0.1); // Approx KB size

    resizedImg.src = dataUrl;
    const sizeKB = (dataUrl.length * 0.75 / 1024).toFixed(2); // Base64 to binary size
    resizedProps.textContent = `Dimensions: ${canvas.width}x${canvas.height}px | Size: ${sizeKB} KB`;
    resizedPreview.classList.add('active');
    downloadBtn.style.display = 'block';
    downloadBtn.onclick = () => {
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${imageType.value}-50kb.jpg`;
      link.click();
    };
  });

  // Reset functionality
  resetBtn.addEventListener('click', () => {
    fileInput.value = '';
    originalImage = null;
    originalImg.src = '';
    resizedImg.src = '';
    originalProps.textContent = '';
    resizedProps.textContent = '';
    originalPreview.classList.remove('active');
    resizedPreview.classList.remove('active');
    resizeBtn.disabled = true;
    downloadBtn.style.display = 'none';
    updateDimensions();
  });

  console.log("PAN Photo & Signature Resizer tool (50KB, 200 DPI) loaded successfully.");
});