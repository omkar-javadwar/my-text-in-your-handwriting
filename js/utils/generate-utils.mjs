const pageEl = document.querySelector('.page-a');
const paperContentEl = document.querySelector('.page-a .paper-content');
const overlayEl = document.querySelector('.overlay');

let paperContentPadding;

function isFontErrory() {
    // SOme fonts have padding top errors, this functions tells you if the current font has that;
    const currentHandwritingFont = document.body.style.getPropertyValue(
        '--handwriting-font'
    );
    return (
        currentHandwritingFont === '' ||
        currentHandwritingFont.includes('Homemade Apple')
    );
}

function applyPaperStyles() {
    pageEl.style.border = 'none';
    pageEl.style.overflowY = 'hidden';

    if (isFontErrory() && document.querySelector('#font-file').files.length < 1) {
        paperContentPadding =
            paperContentEl.style.paddingTop.replace(/px/g, '') || 5;
        const newPadding = Number(paperContentPadding) - 5;
        paperContentEl.style.paddingTop = `${newPadding}px`;
    }
}

function removePaperStyles() {
    pageEl.style.overflowY = 'auto';
    pageEl.style.border = '1px solid var(--elevation-background)';

    if (isFontErrory()) {
        paperContentEl.style.paddingTop = `${paperContentPadding}px`;
    }
}

function renderOutput(outputImages) {
    if (outputImages.length <= 0) {
        document.querySelector('#output').innerHTML =
            'Click "Generate Image" Button to generate new image.';
        document.querySelector('#download-as-pdf-button').classList.remove('show');
        return;
    }

    document.querySelector('#download-as-pdf-button').classList.add('show');
    document.querySelector('#output').innerHTML = outputImages
        .map(
            (outputImageCanvas, index) => /* html */ `
    <div 
      class="output-image-container" 
      style="position: relative;display: inline-block;"
    >
      <button 
        data-index="${index}" 
        class="close-button close-${index}">
          &times;
      </button>
      <img 
        class="shadow" 
        alt="Output image ${index}" 
        src="${outputImageCanvas.toDataURL('image/jpeg')}"
      />
      <div style="text-align: center">
        <a 
          class="button download-image-button" 
          download 
          href="${outputImageCanvas.toDataURL('image/jpeg')}
        ">Download Image</a>
      </div>
    </div>
    `
        )
        .join('');
}

export { removePaperStyles, applyPaperStyles, renderOutput };
