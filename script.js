// === CẤU HÌNH PHÁO GIẤY (CONFETTI) ===
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const particles = [];
const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'];

function createParticle() {
    return {
        x: Math.random() * width,
        y: Math.random() * height - height, // Bắt đầu từ trên cao
        size: Math.random() * 8 + 2,
        speedY: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * 6.2
    };
}

function drawConfetti() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p, index) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.speedY;
        p.x += Math.sin(p.angle);

        // Reset hạt khi rơi xuống đáy
        if (p.y > height) {
            particles[index] = createParticle();
            particles[index].y = -10; // Đưa về đỉnh
        }
    });
    requestAnimationFrame(drawConfetti);
}

// === XỬ LÝ SỰ KIỆN ===
const cake = document.getElementById('cake');
const flame = document.querySelector('.flame');
const messageBox = document.getElementById('message-box');
const introText = document.querySelector('.intro');
const audio = document.getElementById('audio');

// Tạo sẵn hạt pháo giấy
for (let i = 0; i < 150; i++) {
    particles.push(createParticle());
}

let isBlown = false;

cake.addEventListener('click', () => {
    if (isBlown) return; // Chỉ click 1 lần

    // 1. Tắt nến
    flame.classList.add('off');
    isBlown = true;

    // 2. Chạy nhạc (Nếu trình duyệt cho phép)
    // Lưu ý: Chrome chặn tự phát nhạc, cần click mới chạy được
    audio.play().catch(e => console.log("Cần tương tác để phát nhạc"));

    // 3. Ẩn intro, hiện lời chúc
    introText.style.display = 'none';
    messageBox.style.display = 'block';

    // 4. Bắn pháo giấy
    drawConfetti();
});

// Nút reset
function restart() {
    alert("Chúc mừng sinh nhật dui dẻ nhaaaaa!");
    // Có thể thêm logic reload trang nếu muốn: location.reload();
}

// Resize canvas khi đổi kích thước màn hình
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
});