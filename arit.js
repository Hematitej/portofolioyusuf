function hitungAritmatika() {
    const a = parseFloat(document.getElementById("a1").value);
    const d = parseFloat(document.getElementById("d").value);
    const n = parseInt(document.getElementById("n1").value);

    if (isNaN(a) || isNaN(d) || isNaN(n)) {
      document.getElementById("hasilAritmatika").innerText = "Mohon isi semua nilai dengan benar.";
      return;
    }

    const sukuKeN = a + (n - 1) * d;
    const jumlahDeret = (n / 2) * (2 * a + (n - 1) * d);

    document.getElementById("hasilAritmatika").innerHTML =
      `Suku ke-${n}: ${sukuKeN}<br>Jumlah ${n} suku: ${jumlahDeret}`;
  }

  function hitungGeometri() {
    const a = parseFloat(document.getElementById("a2").value);
    const r = parseFloat(document.getElementById("r").value);
    const n = parseInt(document.getElementById("n2").value);

    if (isNaN(a) || isNaN(r) || isNaN(n)) {
      document.getElementById("hasilGeometri").innerText = "Mohon isi semua nilai dengan benar.";
      return;
    }

    const sukuKeN = a * Math.pow(r, n - 1);
    const jumlahDeret = r === 1
      ? a * n
      : a * (1 - Math.pow(r, n)) / (1 - r);

    document.getElementById("hasilGeometri").innerHTML =
      `Suku ke-${n}: ${sukuKeN}<br>Jumlah ${n} suku: ${jumlahDeret}`;
  }