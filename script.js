document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.getElementById('countdown');
    const studentNameInput = document.getElementById('studentNameInput');
    const checkButton = document.getElementById('checkButton');
    const resultContainer = document.getElementById('resultContainer');
    const availabilityMessage = document.getElementById('availabilityMessage');

    const targetDate = new Date('June 15, 2025 00:00:00').getTime(); // Pengumuman pada 15 Juni 2025, pukul 00:00 WIB
    const startDate = new Date('June 09, 2025 00:00:00').getTime(); // Cek kelulusan dibuka dari 09 Juni 2025
    const endDate = new Date('June 15, 2025 23:59:59').getTime(); // Cek kelulusan ditutup pada 15 Juni 2025 jam 23:59:59

    const studentData = [
        { nisn: '0127962702', nama: 'AKMAD TAKIM', tglLahir: 'Tangerang, 17 September 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '3133542903', nama: 'AMELIAH', tglLahir: 'Tangerang, 04 Mei 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '3132729254', nama: 'AQILA', tglLahir: 'Tangerang, 29 Desember 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '0124041223', nama: 'HARUA NOVIANI', tglLahir: 'Tangerang, 28 November 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '3134861748', nama: 'KHALIFAH', tglLahir: 'Tangerang, 19 September 2014', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '0138526372', nama: 'MUAWALIYAH PUTRI INSANI', tglLahir: 'Tangerang, 13 Oktober 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '0123950998', nama: 'MUHAMAD SAPUTRA', tglLahir: 'Tangerang, 06 Desember 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '0122828516', nama: 'MUHAMAD SUHENDRA', tglLahir: 'Tangerang, 09 Juni 2012', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '3133110030', nama: 'NABILA PUTRI DENIA', tglLahir: 'Tangerang, 24 Juni 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '3136337466', nama: 'NAJIHATUN NAZWA', tglLahir: 'Tangerang, 10 November 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '3135153583', nama: 'NURAINI', tglLahir: 'Tangerang, 26 November 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '3137099266', nama: 'SANDRINA', tglLahir: 'Tangerang, 23 Juli 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '3136458296', nama: 'SILVIA', tglLahir: 'Tangerang, 28 Juni 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '3135736775', nama: 'SITI MURDAH', tglLahir: 'Tangerang, 18 Mei 2013', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '0124512070', nama: 'SUTINAH', tglLahir: 'Tangerang, 06 Mei 2012', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '0124278741', nama: 'SYALIN MEILIA', tglLahir: 'Tangerang, 03 Mei 2014', kelas: '6 (Enam)', status: 'LULUS' },
        { nisn: '3139697280', nama: 'ULAN SARI', tglLahir: 'Tangerang, 28 Juli 2013', kelas: '6 (Enam)', status: 'LULUS' }
    ];

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            countdownElement.innerHTML = "Pengumuman Telah Dibuka!";
            // Mungkin tambahkan logika untuk langsung menampilkan formulir jika sudah waktunya
        } else {
            countdownElement.innerHTML = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
        }
    }

    // Update the countdown every 1 second
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Call immediately to avoid initial delay

    checkButton.addEventListener('click', function() {
        const studentName = studentNameInput.value.trim().toUpperCase(); // Ubah ke huruf besar untuk pencocokan
        const now = new Date().getTime();

        resultContainer.innerHTML = ''; // Clear previous results
        resultContainer.style.display = 'none'; // Hide by default
        availabilityMessage.textContent = ''; // Clear previous messages

        if (now < startDate) {
            availabilityMessage.textContent = `Pengumuman kelulusan baru dapat diakses mulai tanggal ${new Date(startDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}.`;
            return;
        }

        if (now > endDate) {
            availabilityMessage.textContent = `Pengumuman kelulusan sudah tidak dapat diakses (Periode akses hingga ${new Date(endDate).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}).`;
            return;
        }
        
        if (studentName === '') {
            availabilityMessage.textContent = 'Mohon masukkan nama lengkap Anda.';
            return;
        }

        const foundStudent = studentData.find(student => student.nama === studentName);

        if (foundStudent) {
            resultContainer.innerHTML = `
                <p><strong>NISN:</strong> ${foundStudent.nisn}</p>
                <p><strong>Nama Peserta Didik:</strong> ${foundStudent.nama}</p>
                <p><strong>Tanggal Lahir:</strong> ${foundStudent.tglLahir}</p>
                <p><strong>Kelas:</strong> ${foundStudent.kelas}</p>
                <p><strong>Status:</strong> <span class="status-lulus">${foundStudent.status}</span></p>
            `;
            resultContainer.style.display = 'block';
        } else {
            resultContainer.innerHTML = `<p class="status-tidak-ditemukan">Data tidak ditemukan. Mohon periksa kembali nama lengkap Anda atau hubungi pihak sekolah.</p>`;
            resultContainer.style.display = 'block';
        }
    });
});