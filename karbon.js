function hitungJejakKarbon() {
    let listrik = parseFloat(document.getElementById("listrik").value) || 0;
    let bensin = parseFloat(document.getElementById("bensin").value) || 0;
    let penerbangan = parseFloat(document.getElementById("penerbangan").value) || 0;
    let makanan = parseFloat(document.getElementById("makanan").value) || 0;
    let belanja = parseFloat(document.getElementById("belanja").value) || 0;
    let air = parseFloat(document.getElementById("air").value) || 0;
    let limbah = parseFloat(document.getElementById("limbah").value) || 0;


    const faktorListrik = 0.85;
    const faktorBensin = 2.31;
    const faktorPenerbangan = 0.15;
    const faktorMakanan = 1.8; 
    const faktorBelanja = 0.5; 
    const faktorAir = 0.3; 
    const faktorLimbah = 0.6;


    let emisiListrik = listrik * faktorListrik;
    let emisiBensin = bensin * faktorBensin;
    let emisiPenerbangan = penerbangan * faktorPenerbangan;
    let emisiMakanan = makanan * faktorMakanan;
    let emisiBelanja = belanja * faktorBelanja;
    let emisiAir = air * faktorAir;
    let emisiLimbah = limbah * faktorLimbah;


    let totalEmisi = emisiListrik + emisiBensin + emisiPenerbangan + emisiMakanan + emisiBelanja + emisiAir + emisiLimbah;


    let kategori = "Rendah";
    if (totalEmisi > 700) {
        kategori = "Sangat Tinggi";
    } else if (totalEmisi > 500) {
        kategori = "Tinggi";
    } else if (totalEmisi > 200) {
        kategori = "Sedang";
    }


    let pohonDitanam = Math.ceil(totalEmisi / 21); 


    document.getElementById("hasil").innerHTML = `
    <h3>Total Jejak Karbon Anda:</h3>
    <p><strong>${totalEmisi.toFixed(2)}</strong> kg CO2</p>
    <p>Kategori: <strong>${kategori}</strong></p>
    <p>Untuk mengimbangi emisi ini, Anda disarankan menanam sekitar <strong>${pohonDitanam}</strong> pohon.</p>
`;
}

document.addEventListener('DOMContentLoaded', function() {
    const jenisPeralatan = document.getElementById('jenis-peralatan');
    const jumlahSatuan = document.getElementById('jumlah-satuan');
    const lamaPenggunaan = document.getElementById('lama-penggunaan');
    const hariPenggunaan = document.getElementById('hari-penggunaan');
    const acOptions = document.getElementById('ac-options');
    const acPower = document.getElementById('ac-power');
    const lanjutButton = document.querySelector('.lanjut');
    const resetButton = document.querySelector('.reset');
    const form = document.getElementById('carbon-calculator-form');
    const hasilDiv = document.getElementById('hasil');
    const totalEmissionsP = document.getElementById('total-emissions');
    const totalTreesP = document.getElementById('total-trees');

    let totalEmissions = 0;
    let totalTrees = 0;

    const emissionFactors = {
        laptop: 0.05, // kg CO2 per hour
        lampu: 0.02, // kg CO2 per hour
        televisi: 0.03, // kg CO2 per hour
        ac: 0.1 // kg CO2 per hour (default value, will be overridden by user input)
        // Add more devices and their emission factors as needed
    };

    function validateForm() {
        if (jenisPeralatan.value !== 'Jenis Peralatan Listrik' && jumlahSatuan.value && lamaPenggunaan.value && hariPenggunaan.value) {
            if (jenisPeralatan.value === 'ac' && !acPower.value) {
                lanjutButton.disabled = true;
            } else {
                lanjutButton.disabled = false;
            }
        } else {
            lanjutButton.disabled = true;
        }
    }

    function calculateCarbonFootprint(event) {
        event.preventDefault();
        const device = jenisPeralatan.value;
        const quantity = parseFloat(jumlahSatuan.value);
        const usageTime = parseFloat(lamaPenggunaan.value);
        const usageDays = parseFloat(hariPenggunaan.value);

        let emissionFactor = emissionFactors[device];
        if (device === 'ac') {
            const power = parseFloat(acPower.value);
            emissionFactor = power * 0.00085; // Convert watt to kg CO2 per hour
        }

        if (emissionFactor) {
            const dailyCarbonFootprint = emissionFactor * quantity * usageTime;
            const monthlyCarbonFootprint = dailyCarbonFootprint * usageDays; // Based on user input for days in a month
            const yearlyCarbonFootprint = dailyCarbonFootprint * 365; // Assuming 365 days in a year
            const treesToPlant = Math.ceil(yearlyCarbonFootprint / 21); // Assuming 1 tree offsets 21 kg CO2 per year

            hasilDiv.innerHTML = `
                <h3>Total Jejak Karbon Anda:</h3>
                <p><strong>${dailyCarbonFootprint.toFixed(2)}</strong> kg CO2 per hari</p>
                <p><strong>${monthlyCarbonFootprint.toFixed(2)}</strong> kg CO2 per bulan</p>
                <p><strong>${yearlyCarbonFootprint.toFixed(2)}</strong> kg CO2 per tahun</p>
                <p>Untuk mengimbangi emisi ini, Anda disarankan menanam sekitar <strong>${treesToPlant}</strong> pohon.</p>
            `;

            // Accumulate results
            totalEmissions += yearlyCarbonFootprint;
            totalTrees += treesToPlant;

            totalEmissionsP.textContent = `Total Emisi: ${totalEmissions.toFixed(2)} kg CO2`;
            totalTreesP.textContent = `Total Pohon yang Harus Ditanam: ${totalTrees}`;
        } else {
            hasilDiv.innerHTML = '<p>Peralatan listrik tidak dikenal.</p>';
        }
    }

    function resetCalculator() {
        form.reset();
        hasilDiv.innerHTML = '';
        lanjutButton.disabled = true;
        acOptions.style.display = 'none';
    }

    jenisPeralatan.addEventListener('change', function() {
        if (jenisPeralatan.value === 'ac') {
            acOptions.style.display = 'block';
        } else {
            acOptions.style.display = 'none';
        }
        validateForm();
    });

    jumlahSatuan.addEventListener('input', validateForm);
    lamaPenggunaan.addEventListener('input', validateForm);
    hariPenggunaan.addEventListener('input', validateForm);
    acPower.addEventListener('input', validateForm);
    form.addEventListener('submit', calculateCarbonFootprint);
    resetButton.addEventListener('click', resetCalculator);
});