import ThemeToggle from '.themeToggle.js';

// This assumes that you're using Rouge; if not, update the selector
const codeBlocks = document.querySelectorAll('.code-header + .highlighter-rouge');
const copyCodeButtons = document.querySelectorAll('.copy-code-button');

/*
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
*/

const themeToggleElement = document.getElementById('theme-toggle');
const cachedTheme = localStorage.getItem(THEME_KEY);
const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Themes.DARK : Themes.LIGHT;

// eslint-disable-next-line no-unused-vars
const themeToggle = new ThemeToggle({
    toggleElement: themeToggleElement,
    initialTheme: cachedTheme ?? preferredTheme,
    setTheme: (theme) => {
        document.documentElement.dataset[THEME_KEY] = theme;
        themeToggleElement.setAttribute('aria-pressed', theme === Themes.DARK);
    },
    setCachedTheme: (theme) => localStorage.setItem(THEME_KEY, theme),
    themes: {
        [Themes.LIGHT]: Themes.DARK,
        [Themes.DARK]: Themes.LIGHT,
    },
});

const copyToClipboardButtonStrings = {
    default: 'Copy',
    ariaLabel: 'Copy to clipboard',
    copied: 'Copied',
};


const copyableCodeBlocks = document.querySelectorAll('.code-header + .highlighter-rouge');
copyableCodeBlocks.forEach((codeBlock) => {
    const code = codeBlock.innerText;

    const copyCodeButton = document.createElement('button');
    copyCodeButton.className = 'copy-code-button';
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