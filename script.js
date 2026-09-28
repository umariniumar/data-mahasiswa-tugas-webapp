const form = document.getElementById("formNilai");

form.addEventListener("submit", function (event) {
    // Mencegah form melakukan refresh halaman.
    event.preventDefault();

    // Mengambil data dari input.
    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;

    const tugas = Number(document.getElementById("tugas").value);
    const uts = Number(document.getElementById("uts").value);
    const uas = Number(document.getElementById("uas").value);

    // Menghitung nilai akhir berdasarkan bobot.
    const nilaiAkhir =
        (tugas * 0.30) +
        (uts * 0.30) +
        (uas * 0.40);

    // Menentukan keterangan kelulusan.
    const keterangan = nilaiAkhir > 75
        ? "LULUS"
        : "TIDAK LULUS";

    // Menampilkan data mahasiswa.
    document.getElementById("hasilNama").textContent = nama;
    document.getElementById("hasilNim").textContent = `NIM ${nim}`;

    // Menampilkan nilai masing-masing komponen.
    document.getElementById("hasilTugas").textContent = tugas;
    document.getElementById("hasilUts").textContent = uts;
    document.getElementById("hasilUas").textContent = uas;

    // Menampilkan nilai akhir dengan 2 angka di belakang koma.
    document.getElementById("nilaiAkhir").textContent =
        nilaiAkhir.toFixed(2);

    // Menampilkan status kelulusan.
    const status = document.getElementById("keterangan");
    status.textContent = keterangan;

    // Mengubah tampilan status jika tidak lulus.
    status.classList.toggle("failed", nilaiAkhir <= 75);
});
