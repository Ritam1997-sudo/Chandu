 const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
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
    const TARGET_SIZE_INCHES = 2; // 2 inches
    const DPI = 200;
    const TARGET_PIXELS = TARGET_SIZE_INCHES * DPI; // 400 pixels

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
          const widthInches = (originalImage.width / DPI).toFixed(2);
          const heightInches = (originalImage.height / DPI).toFixed(2);
          originalImg.src = e.target.result;
          originalProps.textContent = `Dimensions: ${widthInches}x${heightInches} inches | Size: ${(file.size / 1024).toFixed(2)} KB`;
          originalPreview.classList.add('active');
          resizeBtn.disabled = false;
        };
        originalImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }

    // Resize image
    resizeBtn.addEventListener('click', () => {
      if (!originalImage) return;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = TARGET_PIXELS; // 400px
      canvas.height = TARGET_PIXELS; // 400px

      // Center-crop or scale to fit
      const aspect = originalImage.width / originalImage.height;
      let sx, sy, sWidth, sHeight;
      if (aspect > 1) {
        // Wider than tall
        sWidth = originalImage.height;
        sHeight = originalImage.height;
        sx = (originalImage.width - sWidth) / 2;
        sy = 0;
      } else {
        // Taller than wide
        sWidth = originalImage.width;
        sHeight = originalImage.width;
        sx = 0;
        sy = (originalImage.height - sHeight) / 2;
      }
      ctx.drawImage(originalImage, sx, sy, sWidth, sHeight, 0, 0, TARGET_PIXELS, TARGET_PIXELS);

      // Best quality output (no size limit)
      const dataUrl = canvas.toDataURL('image/jpeg', 1.0); // Quality 1.0 for best quality
      resizedImg.src = dataUrl;
      const sizeKB = (dataUrl.length * 0.75 / 1024).toFixed(2); // Base64 to binary size
      resizedProps.textContent = `Dimensions: 2x2 inches | Size: ${sizeKB} KB`;
      resizedPreview.classList.add('active');
      downloadBtn.style.display = 'block';
      downloadBtn.onclick = () => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'image-2x2-best-quality.jpg';
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
    });

    console.log("2x2 Inch Image Resizer tool (best quality) loaded successfully.");
