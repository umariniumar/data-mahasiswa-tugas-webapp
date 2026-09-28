const sourceFiles = {
    html: "index.html",
    css: "style.css",
    javascript: "script.js"
};

const codeTargets = {
    html: document.getElementById("htmlCode"),
    css: document.getElementById("cssCode"),
    javascript: document.getElementById("jsCode")
};

async function loadSourceCode() {
    for (const [key, fileName] of Object.entries(sourceFiles)) {
        try {
            const response = await fetch(fileName);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            codeTargets[key].textContent = await response.text();
        } catch (error) {
            codeTargets[key].textContent =
                `Kode ${fileName} tidak dapat dimuat ketika halaman dibuka langsung dari file lokal. ` +
                `Gunakan GitHub Pages atau server lokal agar fetch() dapat membaca file.`;
        }
    }
}

document.querySelectorAll(".code-tab").forEach((button) => {
    button.addEventListener("click", () => {
        const target = button.dataset.target;

        document.querySelectorAll(".code-tab").forEach((tab) => {
            tab.classList.toggle("active", tab === button);
        });

        document.querySelectorAll(".code-panel").forEach((panel) => {
            panel.classList.toggle("active", panel.id === target);
        });

        history.replaceState(null, "", `#${target}`);
    });
});

document.querySelectorAll(".copy-button").forEach((button) => {
    button.addEventListener("click", async () => {
        const codeElement = document.getElementById(button.dataset.copy);

        try {
            await navigator.clipboard.writeText(codeElement.textContent);
            const originalText = button.textContent;
            button.textContent = "Tersalin ✓";

            setTimeout(() => {
                button.textContent = originalText;
            }, 1400);
        } catch (error) {
            button.textContent = "Gagal menyalin";
            setTimeout(() => {
                button.textContent = "Salin kode";
            }, 1400);
        }
    });
});

const initialHash = window.location.hash.replace("#", "");
if (["html", "css", "javascript"].includes(initialHash)) {
    document.querySelector(`.code-tab[data-target="${initialHash}"]`)?.click();
}

loadSourceCode();
