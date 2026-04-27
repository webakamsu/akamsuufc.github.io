// --- NAVIGASI HALAMAN ---
function navTo(pageId, btn) {
    // Reset semua halaman
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Tampilkan halaman yang dipilih
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.scrollTop = 0; // Balik ke atas setiap ganti menu
    }

    // Update status tombol navigasi di dock
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// --- FUNGSI MODAL GALERI (PREVIEW FOTO) ---
function openModal(imgSrc, text) {
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const modalTxt = document.getElementById('modalTxt');

    modalImg.src = imgSrc;
    modalTxt.innerText = text;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Kunci scroll layar utama
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Aktifkan scroll lagi
}

// --- FUNGSI MODAL SUKSES (POP-UP BERHASIL) ---
function openSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    
    // Animasi fade out sebelum benar-benar hilang
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.classList.remove('active');
        modal.style.opacity = '1'; // Reset untuk pemanggilan berikutnya
        document.body.style.overflow = 'auto';
    }, 300);
}

// --- DETEKSI KLIK LUAR MODAL ---
window.onclick = function(event) {
    const galleryModal = document.getElementById('galleryModal');
    const successModal = document.getElementById('successModal');
    
    // Jika user klik di area gelap (overlay), modal akan tertutup
    if (event.target == galleryModal) closeModal();
    if (event.target == successModal) closeSuccessModal();
}

// --- LOGIKA FORM KONTAK (AJAX) ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener("submit", async function(e) {
        e.preventDefault(); // Stop reload halaman
        
        const btn = document.getElementById('submit-btn') || document.querySelector('.send-btn');
        const btnText = btn.querySelector('span');
        const originalText = btnText.innerText;
        
        // State Loading: Tombol berubah jadi "Mengirim..."
        btnText.innerText = "Mengirim...";
        btn.disabled = true;
        btn.style.opacity = "0.7";

        const data = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Tampilkan pop-up membal yang keren itu
                openSuccessModal();
                contactForm.reset(); 
            } else {
                alert("Waduh, gagal kirim. Cek kembali form kamu.");
            }
        } catch (error) {
            alert("Koneksi bermasalah. Pastikan kamu sedang online.");
        } finally {
            // Kembalikan tombol ke status awal
            btnText.innerText = originalText;
            btn.disabled = false;
            btn.style.opacity = "1";
        }
    });
}
