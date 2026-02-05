const profiles = [
    {
        name: "Jirayu Thongchothaung",
        tag: "Cyber Security & Game Developer",
        bio: "NINE",
        img: "https://picsum.photos/400/400?grayscale",
        skills: ["Python", "DFIR","Networking"],
        ig: "##",
        github: "https://github.com/jirayu",
        projects: [
            { title: "NINE", desc: "NINE", img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=800" },
            { title: "NINE", desc: "NINE", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800" }
        ]
    },
    {
        name: "Jarugit Srisuchat",
        tag: "Full Stack Developer",
        bio: "ชื่อเล่นชื่อไม้ อายุ20 ชอบไปทะเล เดินเขา ชอบตั้งแคมป์ <br> แล้วก็นอน ไม่เชี่ยวชาญสักอย่างที่ใส่มาตามข้างล่างนี้",
        img: "../img/me1.jpg",
        skills: ["Java", "Python","HTML","CSS", "JavaScript"],
        ig:"https://www.instagram.com/mxi_jrg/",
        github: "https://github.com/Mai4485",
        projects: [
            { title: "Rack Project", desc: "โปรเจกต์นี้เป็นการจำลองระบบเครือข่ายด้วย Cisco Packet Tracer โดยเชื่อมต่อ PC, Switch และ Router ให้ทุกอุปกรณ์สามารถ Ping หากันได้ด้วย Dynamic Routing ได้เรียนรู้การกำหนด IP Address, Subnet, VLAN รวมถึงการใช้งานอุปกรณ์ Network ทั้งซอฟต์แวร์และการต่อ Rack จริง", img: "../img/Rack.png" },
            { title: "KMITL-NOTIBUSS", desc: "โปรเจกต์นี้เป็นแอปแจ้งเตือนป้ายรถโดยสารสำหรับผู้ที่มักหลับบนรถ โดยเลือกป้ายปลายทางแล้วระบบจะแจ้งเตือนด้วยการสั่นเมื่อใกล้ถึงจุดหมาย ใช้ Longdo Map API สำหรับแผนที่ภายใน สจล. และ JavaScript สำหรับแจ้งเตือน", img: "../img/Firewall.png" }
        ]
    }
];

let currentSection = 0;
let activeProfile = 0;
let isMoving = false;

const wrap = document.getElementById('wrap');
const dots = document.querySelectorAll('.dot');

function updateView() {
    wrap.style.transform = `translateY(-${currentSection * 100}vh)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSection));
    setTimeout(() => { isMoving = false; }, 850);
}

function navigate(direction) {
    if (isMoving) return;
    if (direction === 'down' && currentSection < 2) {
        isMoving = true; currentSection++; updateView();
    } else if (direction === 'up' && currentSection > 0) {
        isMoving = true; currentSection--; updateView();
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('run') === 'switch') {
        switchProfile();
    }
    renderProjects(0);
});

window.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) < 30) return;
    navigate(e.deltaY > 0 ? 'down' : 'up');
}, { passive: false });

window.addEventListener('DOMContentLoaded', () => {
    renderProjects(0);
});

function renderProjects(index) {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = profiles[index].projects.map(proj => `
        <div class="card">
            <img class="card-img" src="${proj.img}">
            <div class="project-info">
                <strong>${proj.title}</strong>
                <p>${proj.desc}</p>
            </div>
        </div>
    `).join('');
}

function switchProfile() {
    currentSection = 0; 
    updateView();
    activeProfile = activeProfile === 0 ? 1 : 0;
    const data = profiles[activeProfile];
    const content = document.getElementById('profile-content');
    
    content.classList.add('fade-hide');
    
    setTimeout(() => {
        document.getElementById('p-name').innerText = data.name;
        document.getElementById('p-tag').innerText = data.tag;
        document.getElementById('p-bio').innerHTML = data.bio;
        document.getElementById('p-img').src = data.img;
        document.getElementById('p-ig').href = data.ig;
        document.getElementById('p-git').href = data.github;
        document.getElementById('toggle-text').innerText = `Switch to ${activeProfile === 0 ? 'Jarugit' : 'Jirayu'}`;
        document.getElementById('p-skills').innerHTML = data.skills.map(s => `<span class="skill-badge">${s}</span>`).join('');
        renderProjects(activeProfile);
        content.classList.remove('fade-hide');
    }, 400);
}

