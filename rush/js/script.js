const profiles = [
    {
        name: "Jirayu Thongchothaung",
        tag: "Cyber Security",
        bio: "ชื่อเล่นชื่อนาย อายุ 20 ชอบความตื่นเต้น ชอบลองอะไรใหม่ๆ <br> มีความรู้เรื่อง Cyber Security นิดหน่อย, skill สู้เขาไม่ได้ แต่ใจผมสู้ได้นะคับ",
        img: "../img/nine.jpg",
        skills: ["C/C++", "Blue hat", "Networking Security", "Reverse Engineering"],
        ig: "https://www.instagram.com/_ninesleep/",
        github: "https://github.com/JirayuThongchotchaung",
        projects: [
            { title: "6th Kibo RPC", desc: "โครงการแข่งขันเขียนโปรแกรมระดับนานาชาติสำหรับนักเรียนและนักศึกษาเพื่อควบคุมหุ่นยนต์ผู้ช่วยนักบินอวกาศที่อยู่บน สถานีอวกาศนานาชาติ (ISS) <br> <br> ได้รับรางวัลชนะเลิศระดับประเทศ ", img: "../img/kibo.png" },
            { title: "ICT Challenge 2022 ", desc: "แข่งขันตอบปัญหาวิชาการคอมพิวเตอร์ และเทคโนโลยีสารสนเทศ ระดับมัธยมศึกษาตอนปลาย ที่จัดขึ้นโดย มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (มจธ.) <br> <br> ได้รับรางวัลรองชนะเลิศอันดับ 2", img: "../img/ICT.png" }
        ]
    },
    {
        name: "Jarugit Srisuchat",
        tag: "Full Stack Developer",
        bio: "ชื่อเล่นชื่อไม้ อายุ 20 ชอบไปทะเล เดินเขา ชอบตั้งแคมป์ <br> แล้วก็นอน ไม่เชี่ยวชาญสักอย่างที่ใส่มาตามข้างล่างนี้",
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

function updateProfileUI(index) {
    const data = profiles[index];
    const pImg = document.getElementById('p-img');
    if (pImg) {
        pImg.src = data.img;
        pImg.style.display = "block"; 
    }
    
    document.getElementById('p-name').innerText = data.name;
    document.getElementById('p-tag').innerText = data.tag;
    document.getElementById('p-bio').innerHTML = data.bio;
    
    document.getElementById('p-skills').innerHTML = data.skills
        .map(s => `<span class="skill-badge">${s}</span>`)
        .join('');
    
    document.getElementById('p-ig').href = data.ig;
    document.getElementById('p-git').href = data.github;
    
    renderProjects(index);
}

function renderProjects(index) {
    const grid = document.getElementById('project-grid');
    grid.innerHTML = profiles[index].projects.map(proj => `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${proj.img}" alt="${proj.title}">
            </div>
            <div class="project-info">
                <strong>${proj.title}</strong>
                <p>${proj.desc}</p>
            </div>
        </div>
    `).join('');
}

function selectProfile(index) {
    if (activeProfile === index) return;
    activeProfile = index;
    switchProfileEffect();
}

function switchProfileEffect() {
    document.querySelectorAll('.fade-zone').forEach(el => el.classList.add('fade-hide'));
    
    setTimeout(() => {
        updateProfileUI(activeProfile);
        currentSection = 0;
        updateView();
        document.querySelectorAll('.fade-zone').forEach(el => el.classList.remove('fade-hide'));
    }, 400);
}

function gotoSection(index) {
    if (isMoving) return;
    isMoving = true;
    currentSection = index;
    updateView();
}

function updateView() {
    wrap.style.transform = `translateY(-${currentSection * 100}vh)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSection));
    setTimeout(() => { isMoving = false; }, 850);
}

window.addEventListener('wheel', (e) => {
    if (isMoving || Math.abs(e.deltaY) < 30) return;
    if (e.deltaY > 0 && currentSection < 2) gotoSection(currentSection + 1);
    else if (e.deltaY < 0 && currentSection > 0) gotoSection(currentSection - 1);
}, { passive: false });

// window.addEventListener('DOMContentLoaded', () => {
//     updateProfileUI(0);
window.addEventListener('DOMContentLoaded', () => {
    const check = new URLSearchParams(window.location.search);
    activeProfile = check.get('run') === 'switch' ? 1 : 0;
    updateProfileUI(activeProfile);
});