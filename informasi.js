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

// ==================================================
// W3SCHOOLS TRYIT
// ==================================================

const tryItButton = document.getElementById("tryItButton");

function getW3SchoolsCode() {
    return `<!DOCTYPE html>
<html>
<head>
    <title>Program Data Mahasiswa</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f7f6;
            margin: 0;
            padding: 30px;
        }

        .container {
            max-width: 650px;
            margin: auto;
            background-color: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0,0,0,0.10);
        }

        .header {
            background-color: #173b37;
            color: white;
            text-align: center;
            padding: 25px;
        }

        .header h2 {
            margin: 0;
        }

        .header p {
            margin-bottom: 0;
        }

        .content {
            padding: 25px;
        }

        .form-group {
            margin-bottom: 15px;
        }

        label {
            display: block;
            font-weight: bold;
            margin-bottom: 6px;
        }

        input {
            width: 100%;
            box-sizing: border-box;
            padding: 11px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 16px;
        }

        input:focus {
            outline: none;
            border-color: #173b37;
        }

        button {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
            background-color: #173b37;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            cursor: pointer;
        }

        button:hover {
            background-color: #24564f;
        }

        .hasil {
            margin-top: 25px;
            padding: 25px;
            background-color: #eff8ec;
            border-radius: 10px;
        }

        .hasil h3 {
            margin-top: 0;
        }

        .hasil p {
            margin: 10px 0;
        }

        .nilai {
            font-size: 36px;
            font-weight: bold;
            color: #173b37;
        }

        .status {
            display: inline-block;
            padding: 8px 20px;
            background-color: #a9eb96;
            color: #173b37;
            border-radius: 20px;
            font-weight: bold;
        }

        .status.tidak-lulus {
            background-color: #ffb3b3;
            color: #a00000;
        }
    </style>
</head>

<body>

<div class="container">

    <div class="header">
        <h2>DATA MAHASISWA</h2>
        <p>Program Perhitungan Nilai</p>
    </div>

    <div class="content">

        <div class="form-group">
            <label>Nama Mahasiswa</label>
            <input type="text" id="inputNama" placeholder="Masukkan nama">
        </div>

        <div class="form-group">
            <label>NIM</label>
            <input type="text" id="inputNim" placeholder="Masukkan NIM">
        </div>

        <div class="form-group">
            <label>Nilai Tugas (30%)</label>
            <input type="number" id="inputTugas" min="0" max="100" placeholder="0 - 100">
        </div>

        <div class="form-group">
            <label>Nilai UTS (30%)</label>
            <input type="number" id="inputUTS" min="0" max="100" placeholder="0 - 100">
        </div>

        <div class="form-group">
            <label>Nilai UAS (40%)</label>
            <input type="number" id="inputUAS" min="0" max="100" placeholder="0 - 100">
        </div>

        <button onclick="hitungNilai()">HITUNG NILAI</button>

        <div class="hasil">
            <h3>Hasil Perhitungan</h3>

            <p><strong>Nama:</strong> <span id="nama">-</span></p>
            <p><strong>NIM:</strong> <span id="nim">-</span></p>
            <p><strong>Nilai Tugas:</strong> <span id="tugas">-</span></p>
            <p><strong>Nilai UTS:</strong> <span id="uts">-</span></p>
            <p><strong>Nilai UAS:</strong> <span id="uas">-</span></p>

            <hr>

            <p>Nilai Akhir:</p>
            <div class="nilai" id="nilaiAkhir">-</div>

            <br>

            <div class="status" id="keterangan">-</div>
        </div>

    </div>
</div>

<script>

function hitungNilai() {

    let nama = document.getElementById("inputNama").value;
    let nim = document.getElementById("inputNim").value;

    let nilaiTugas =
        Number(document.getElementById("inputTugas").value);

    let nilaiUTS =
        Number(document.getElementById("inputUTS").value);

    let nilaiUAS =
        Number(document.getElementById("inputUAS").value);

    let nilaiAkhir =
        (nilaiTugas * 0.30) +
        (nilaiUTS * 0.30) +
        (nilaiUAS * 0.40);

    let keterangan;

    if (nilaiAkhir > 75) {
        keterangan = "LULUS";
    } else {
        keterangan = "TIDAK LULUS";
    }

    document.getElementById("nama").innerHTML = nama;
    document.getElementById("nim").innerHTML = nim;
    document.getElementById("tugas").innerHTML = nilaiTugas;
    document.getElementById("uts").innerHTML = nilaiUTS;
    document.getElementById("uas").innerHTML = nilaiUAS;

    document.getElementById("nilaiAkhir").innerHTML =
        nilaiAkhir.toFixed(2);

    let statusElement =
        document.getElementById("keterangan");

    statusElement.innerHTML = keterangan;

    if (keterangan == "TIDAK LULUS") {
        statusElement.classList.add("tidak-lulus");
    } else {
        statusElement.classList.remove("tidak-lulus");
    }
}

</script>

</body>
</html>`;
}

if (tryItButton) {
    tryItButton.addEventListener("click", async () => {
        const code = getW3SchoolsCode();

        try {
            await navigator.clipboard.writeText(code);
            tryItButton.innerHTML = "Kode tersalin ✓ — membuka TryIt...";
        } catch (error) {
            tryItButton.innerHTML = "Buka W3Schools TryIt ↗";
        }

        setTimeout(() => {
            window.open(
                "https://www.w3schools.com/js/tryit.asp?filename=tryjs_editor",
                "_blank"
            );
        }, 350);

        setTimeout(() => {
            tryItButton.innerHTML = "Buka W3Schools TryIt <span>↗</span>";
        }, 2000);
    });
}
