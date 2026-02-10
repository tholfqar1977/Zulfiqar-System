let systemActive = false;

const bgMusic = new Howl({
    src: ['https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'],
    loop: true, volume: 0.3
});

const screams = [
    new Howl({ src: ['https://www.myinstants.com/media/sounds/scary-stinger.mp3'], volume: 0.8 }),
    new Howl({ src: ['https://www.myinstants.com/media/sounds/girl_scream_short.mp3'], volume: 0.6 }),
    new Howl({ src: ['https://www.myinstants.com/media/sounds/whisper.mp3'], volume: 1.0 })
];

const ghostCanvas = document.getElementById('ghostCanvas');
const gCtx = ghostCanvas.getContext('2d');
let particles = [];

function resizeGhostCanvas() {
    if (ghostCanvas) {
        ghostCanvas.width = window.innerWidth;
        ghostCanvas.height = window.innerHeight;
    }
}
resizeGhostCanvas();
window.addEventListener('resize', resizeGhostCanvas);

class GhostParticle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * ghostCanvas.width;
        this.y = Math.random() * ghostCanvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = -Math.random() * 0.8 - 0.2;
        this.opacity = Math.random() * 0.3 + 0.05;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
        this.color = Math.random() > 0.7 ? '255,0,0' : '100,100,100';
    }
    update() {
        this.x += this.speedX + Math.sin(this.life * 0.02) * 0.3;
        this.y += this.speedY;
        this.life--;
        this.opacity = (this.life / this.maxLife) * 0.3;
        if (this.life <= 0 || this.y < -10) this.reset();
    }
    draw() {
        gCtx.beginPath();
        gCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        gCtx.fillStyle = `rgba(${this.color},${this.opacity})`;
        gCtx.fill();
    }
}

for (let i = 0; i < 60; i++) {
    particles.push(new GhostParticle());
}

function animateGhosts() {
    if (ghostCanvas) {
        gCtx.clearRect(0, 0, ghostCanvas.width, ghostCanvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateGhosts);
    }
}
animateGhosts();

function createBloodDrips() {
    const container = document.getElementById('bloodDrips');
    if (!container) return;
    container.innerHTML = '';
    const dripCount = Math.floor(window.innerWidth / 60);
    for (let i = 0; i < dripCount; i++) {
        const drip = document.createElement('div');
        drip.className = 'blood-drip';
        drip.style.left = (Math.random() * 100) + '%';
        drip.style.setProperty('--drip-duration', (Math.random() * 4 + 3) + 's');
        drip.style.setProperty('--drip-delay', (Math.random() * 8) + 's');
        drip.style.width = (Math.random() * 3 + 2) + 'px';
        container.appendChild(drip);
    }
}
createBloodDrips();
setInterval(createBloodDrips, 12000);

function randomGlitchBars() {
    if (!systemActive) return;
    const bars = [
        document.getElementById('glitchBar1'),
        document.getElementById('glitchBar2'),
        document.getElementById('glitchBar3')
    ];
    const bar = bars[Math.floor(Math.random() * bars.length)];
    if (!bar) return;
    bar.style.top = Math.random() * 100 + 'vh';
    bar.classList.remove('active');
    void bar.offsetWidth; // force reflow
    bar.classList.add('active');
    setTimeout(() => bar.classList.remove('active'), 200);
    setTimeout(randomGlitchBars, Math.random() * 3000 + 1000);
}

function randomDistortion() {
    if (!systemActive) return;
    const distortion = document.getElementById('distortion');
    if (!distortion) return;
    distortion.classList.add('active');
    setTimeout(() => distortion.classList.remove('active'), Math.random() * 300 + 100);
    setTimeout(randomDistortion, Math.random() * 8000 + 4000);
}

function randomSkullFlash() {
    if (!systemActive) return;
    const skull = document.getElementById('skullFlash');
    if (!skull) return;
    skull.style.display = 'flex';
    setTimeout(() => skull.style.display = 'none', 200);
    setTimeout(randomSkullFlash, Math.random() * 25000 + 15000);
}

function initSystem() {
    if (!systemActive) {
        bgMusic.play();
        systemActive = true;
        animateCount(1000, 'count1');
        document.getElementById('user-info').innerText =
            navigator.platform + " / " + (navigator.userAgent.includes("Chrome") ? "Chrome" : "Other");
        typeWriter("> ذو الفقار يبدأ الآن في فحص خلايا دماغك... لا يوجد مفر.");
        setTimeout(playRandomScream, 3000);
        setTimeout(randomGlitchBars, 2000);
        setTimeout(randomDistortion, 5000);
        setTimeout(randomSkullFlash, 20000);

        let heartSpeed = 1.5;
        const heartInterval = setInterval(() => {
            heartSpeed = Math.max(0.6, heartSpeed - 0.05);
            document.documentElement.style.setProperty('--heartbeat-speed', heartSpeed + 's');
            if (heartSpeed <= 0.6) clearInterval(heartInterval);
        }, 10000);
    }
}

function playRandomScream() {
    if (!systemActive) return;
    const randomScream = screams[Math.floor(Math.random() * screams.length)];
    randomScream.play();

    const shaker = document.getElementById('shaker');
    if (shaker) {
        shaker.style.display = 'block';
        setTimeout(() => shaker.style.display = 'none', 500);
    }

    setTimeout(playRandomScream, Math.random() * 10000 + 5000);
}

const flashlight = document.getElementById('flashlight');
const laser = document.getElementById('laser');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let lx = mx, ly = my;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (laser) {
        laser.style.left = mx + 'px';
        laser.style.top = my + 'px';
    }
});

function animateFlashlight() {
    lx += (mx - lx) * 0.1;
    ly += (my - ly) * 0.1;
    if (flashlight) {
        flashlight.style.setProperty('--x', lx + 'px');
        flashlight.style.setProperty('--y', ly + 'px');
    }
    requestAnimationFrame(animateFlashlight);
}
animateFlashlight();

function animateCount(target, id) {
    let c = 0;
    const itv = setInterval(() => {
        c += 11;
        if (c >= target) {
            document.getElementById(id).innerText = target + "+";
            clearInterval(itv);
        } else {
            document.getElementById(id).innerText = c;
        }
    }, 30);
}

let charIdx = 0;
function typeWriter(txt) {
    if (charIdx < txt.length) {
        const element = document.getElementById("dynamic-text");
        if (element) {
            element.innerHTML += txt.charAt(charIdx);
            charIdx++;
            setTimeout(() => typeWriter(txt), 50);
        }
    }
}

let scarePhase = 0;

function triggerScare() {
    if (scarePhase >= 1) return;
    scarePhase = 1;
    screams[0].play();

    const skull = document.getElementById('skullFlash');
    if (skull) skull.style.display = 'flex';

    const shaker = document.getElementById('shaker');
    if (shaker) shaker.style.display = 'block';

    if (navigator.vibrate) navigator.vibrate([100, 50, 500, 100, 1000]);

    setTimeout(() => {
        if (skull) skull.style.display = 'none';
        document.getElementById('death-overlay').style.display = 'flex';
    }, 400);

    setTimeout(() => {
        document.getElementById('death-overlay').style.display = 'none';
        if (shaker) shaker.style.display = 'none';

        const postContent = document.getElementById('post-scare-content');
        if (postContent) {
            postContent.style.display = 'block';

            postContent.scrollIntoView({ behavior: 'smooth' });

            postContent.querySelectorAll('.reveal-item').forEach(item => {
                revealObserver.observe(item);
            });
        }

        let postIdx = 0;
        const postText = "> ظننت أنك نجوت؟ ذو الفقار لا ينتهي أبداً... العذاب يبدأ الآن.";
        function postTypeWriter() {
            if (postIdx < postText.length) {
                const el = document.getElementById('post-scare-dynamic');
                if (el) el.innerHTML += postText.charAt(postIdx);
                postIdx++;
                setTimeout(postTypeWriter, 50);
            }
        }
        setTimeout(postTypeWriter, 1500);

        setTimeout(() => screams[1].play(), 2000);
    }, 3500);
}

function triggerSecondScare() {
    if (scarePhase >= 2) return;
    scarePhase = 2;
    screams[0].play();

    const skull = document.getElementById('skullFlash');
    if (skull) skull.style.display = 'flex';

    const shaker = document.getElementById('shaker');
    if (shaker) shaker.style.display = 'block';

    if (navigator.vibrate) navigator.vibrate([200, 100, 800, 200, 1500]);

    setTimeout(() => {
        if (skull) skull.style.display = 'none';
        document.getElementById('death-overlay').style.display = 'flex';
    }, 300);

    setTimeout(() => {
        document.getElementById('death-overlay').style.display = 'none';
        if (shaker) shaker.style.display = 'none';

        const finalSection = document.getElementById('final-section');
        if (finalSection) {
            finalSection.style.display = 'block';
            finalSection.scrollIntoView({ behavior: 'smooth' });

            finalSection.querySelectorAll('.reveal-item').forEach(item => {
                revealObserver.observe(item);
            });
        }

        let countdown = 99;
        const countInterval = setInterval(() => {
            countdown--;
            const countEl = document.getElementById('count2');
            if (countEl) countEl.innerText = countdown;
            if (countdown <= 0) {
                clearInterval(countInterval);
                if (countEl) countEl.innerText = '💀';
            }
        }, 100);

        let finalIdx = 0;
        const finalText = "> ... الحكم صدر. لا رجعة. ذو الفقار أغلق الملف.";
        function finalTypeWriter() {
            if (finalIdx < finalText.length) {
                const el = document.getElementById('final-dynamic');
                if (el) el.innerHTML += finalText.charAt(finalIdx);
                finalIdx++;
                setTimeout(finalTypeWriter, 60);
            }
        }
        setTimeout(finalTypeWriter, 2000);
        setTimeout(() => screams[2].play(), 3000);
        setTimeout(() => screams[1].play(), 6000);
    }, 3000);
}

const runBtn = document.getElementById('run-btn');
let runBtnEscapeCount = 0;
if (runBtn) {
    runBtn.addEventListener('mouseover', () => {
        runBtnEscapeCount++;
        runBtn.style.position = 'absolute';
        runBtn.style.left = Math.random() * 70 + 10 + '%';
        runBtn.style.top = Math.random() * 70 + 10 + '%';
        runBtn.style.transform = `rotate(${(Math.random() - 0.5) * 30}deg)`;

        const messages = [
            "ذو الفقار لا يرحم!",
            "لا مفر من الحكم!",
            "أنت ضعيف جداً...",
            "حاول مجدداً يا مسكين",
            "الهروب مستحيل!",
            "💀 لقد فات الأوان 💀"
        ];
        runBtn.innerText = messages[Math.min(runBtnEscapeCount - 1, messages.length - 1)];

        if (runBtnEscapeCount % 3 === 0 && systemActive) {
            screams[2].play();
        }
    });
}

const revealItems = document.querySelectorAll('.reveal-item');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

revealItems.forEach(item => revealObserver.observe(item));

window.onblur = () => {
    if (systemActive) {
        screams[2].play();
        document.title = "⚠️ لا تحاول الهروب! ⚠️";
    }
};
window.onfocus = () => {
    document.title = "FATAL_ERROR: ZULFIQAR_SYSTEM";
};

const titleTexts = [
    "FATAL_ERROR: ZULFIQAR_SYSTEM",
    "ERR0R: S0UL_N0T_F0UND",
    "W̷̢A̴̧R̶̡N̴̡I̴̛N̴̢G̴̡",
    "💀 SYSTEM BREACH 💀",
    "H̷̢̛E̴̡̛L̶̡̛P̴̢̛",
    "FATAL_ERROR: ZULFIQAR_SYSTEM"
];
function glitchTitle() {
    if (!systemActive) return;
    const original = document.title;
    document.title = titleTexts[Math.floor(Math.random() * titleTexts.length)];
    setTimeout(() => document.title = "FATAL_ERROR: ZULFIQAR_SYSTEM", 2000);
    setTimeout(glitchTitle, Math.random() * 10000 + 5000);
}
setTimeout(glitchTitle, 8000);
