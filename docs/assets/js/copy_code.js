// This assumes that you're using Rouge; if not, update the selector
const codeBlocks = document.querySelectorAll('.code-header + .highlighter-rouge');
const copyCodeButtons = document.querySelectorAll('.copy-code-button');


copyCodeButtons.forEach((copyCodeButton, index) => {
    const code = codeBlocks[index].innerText;

    copyCodeButton.addEventListener('click', () => {
        // Copy the code to the user's clipboard
        if (code == "" || code == null) {
            // use text from innerText
            window.navigator.clipboard.writeText(codeAlt);
        }
        else {
            // use text from textContent
            window.navigator.clipboard.writeText(code);
        }
        copyCodeButton.classList.add('copied');

        // After 2 seconds, reset the button to its initial UI
        setTimeout(() => { copyCodeButton.classList.remove('copied'); }, 2000);
    });
});


const copyableCodeBlocks = document.querySelectorAll('code[data-copyable="true"]');
copyableCodeBlocks.forEach((codeBlock) => {
    const code = codeBlock.innerText;

    const copyCodeButton = document.createElement('button');
    copyCodeButton.className = 'copy-code-button fs-sm';
    copyCodeButton.innerText = copyToClipboardButtonStrings.default;
    copyCodeButton.setAttribute('aria-label', copyToClipboardButtonStrings.ariaLabel);
    copyCodeButton.type = 'button';
    codeBlock.parentElement.append(copyCodeButton);

    // Accessible alert whose inner text changes when we copy.
    const copiedAlert = document.createElement('span');
    copiedAlert.setAttribute('role', 'alert');
    copiedAlert.classList.add('screen-reader-only');
    codeBlock.parentElement.append(copiedAlert);

    copyCodeButton.addEventListener('click', () => {
        window.navigator.clipboard.writeText(code);
        copyCodeButton.classList.add('copied');
        copyCodeButton.innerText = copyToClipboardButtonStrings.copied;
        copiedAlert.innerText = copyToClipboardButtonStrings.copied;

        setTimeout(() => {
            copyCodeButton.classList.remove('copied');
            copyCodeButton.innerText = copyToClipboardButtonStrings.default;
            copiedAlert.innerText = '';
        }, 2000);
    });
});