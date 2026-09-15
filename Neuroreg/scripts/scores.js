import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const userId = localStorage.getItem("userId");

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------
     Hamburger Menu Toggle
  ----------------------------- */
  const hamburger = document.getElementById("hamburgerMenu");
  const dropdown = document.getElementById("hamburgerMenuDropdown");

  hamburger.addEventListener("click", () => {
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
  });

  document.addEventListener("click", (event) => {
    if (!hamburger.contains(event.target) && !dropdown.contains(event.target)) {
      dropdown.style.display = "none";
    }
  });

  /* -----------------------------
     Load Hamburger Menu Items
  ----------------------------- */
  async function loadHamburgerMenu() {
    const dropdown = document.getElementById("hamburgerMenuDropdown");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
      .from("menuitems")
      .select("*")
      .eq("hamburger", true)
      .order("hamburgersection", { ascending: true })
      .order("hamburgerorder", { ascending: true });

    if (error) {
      dropdown.innerHTML = "<div class='dropdownItem'>Menu failed to load</div>";
      return;
    }

    let currentSection = null;

    data.forEach(item => {
      if (item.admin && !isAdmin) return;
      if (item.url === currentPage) return;

      if (currentSection !== null && item.hamburgersection !== currentSection) {
        const sep = document.createElement("div");
        sep.className = "dropdownSeparator";
        dropdown.appendChild(sep);
      }

      currentSection = item.hamburgersection;

      const div = document.createElement("div");
      div.className = "dropdownItem";
      div.innerText = (item.emoji ? item.emoji + " " : "") + item.displayname;

      div.onclick = () => {
        if (item.url === "logout") logout();
        else window.location.href = item.url;
      };

      dropdown.appendChild(div);
    });
  }

  loadHamburgerMenu();

  /* -----------------------------
     Load Top-Right Icons
  ----------------------------- */
  async function loadTopRightIcons() {
    const container = document.getElementById("topRightIcons");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
      .from("menuitems")
      .select("*")
      .eq("topright", true)
      .order("toprightorder", { ascending: true });

    if (error) return;

    container.innerHTML = "";

    data.forEach(item => {
      if (item.admin && !isAdmin) return;
      if (item.url === currentPage) return;

      const icon = document.createElement("div");
      icon.className = "topRightIcon";
      icon.innerText = item.emoji;

      icon.onclick = () => {
        if (item.url === "logout") logout();
        else window.location.href = item.url;
      };

      container.appendChild(icon);
    });
  }

  loadTopRightIcons();

  /* -----------------------------
     Score Table + Chart
  ----------------------------- */
  function formatTimestamp(ts) {
    const d = new Date(ts);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = String(d.getFullYear()).slice(-2);
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yy} ${hh}:${min}`;
  }

  async function loadScores() {
    const { data: scores, error } = await supabase
      .from("userpracticemcqscores")
      .select("*")
      .eq("userid", userId)
      .order("created_at", { ascending: true });

    if (error) return;

    const tableBody = document.querySelector("#scoreTable tbody");

    scores.forEach(entry => {
      const percent = Math.round((entry.score / entry.numberofquestions) * 100);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${formatTimestamp(entry.created_at)}</td>
        <td>${entry.numberofquestions}</td>
        <td>${entry.score}</td>
        <td>${percent}%</td>
        <td><button class="deleteBtn" onclick="deleteScore(${entry.id})">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });

    buildChart(scores);
  }

  async function deleteScore(id) {
    if (!confirm("Are you sure you want to delete this score?")) return;

    const { error } = await supabase
      .from("userpracticemcqscores")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete score: " + error.message);
      return;
    }

    location.reload();
  }

  window.deleteScore = deleteScore;

  function buildChart(scores) {
    const labels = scores.map(s => formatTimestamp(s.created_at));
    const percentages = scores.map(s => Math.round((s.score / s.numberofquestions) * 100));

    const ctx = document.getElementById('scoreChart').getContext('2d');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Score (%)',
          data: percentages,
          borderColor: '#6fa8ff',
          backgroundColor: 'rgba(111,168,255,0.2)',
          borderWidth: 3,
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: '#2a4c8a',
          pointBorderColor: '#6fa8ff'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: '#fff' }
          },
          x: {
            ticks: { color: '#fff', maxRotation: 45, minRotation: 45 }
          }
        },
        plugins: {
          legend: { labels: { color: '#fff' } }
        }
      }
    });
  }

  loadScores();

  /* ----------------------------------------------------
     PDF REPORT BUTTON + MODAL
  ---------------------------------------------------- */
  const reportBtn = document.getElementById("downloadReportBtn");
  const modal = document.getElementById("reportModal");
  const modalGenerate = document.getElementById("reportGenerateBtn");
  const modalCancel = document.getElementById("reportCancelBtn");

  if (reportBtn) {
    reportBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  modalCancel.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modalGenerate.addEventListener("click", async () => {
    const name = document.getElementById("reportName").value.trim();
    const start = document.getElementById("reportStart").value;
    const end = document.getElementById("reportEnd").value;

    if (!name || !start || !end) {
      alert("Please fill in all fields.");
      return;
    }

    const { data: scores } = await supabase
      .from("userpracticemcqscores")
      .select("*")
      .eq("userid", userId)
      .gte("created_at", start)
      .lte("created_at", end)
      .order("created_at", { ascending: true });

    modal.style.display = "none";

    generatePdfReport(name, start, end, scores);
  });

  /* ----------------------------------------------------
     PDF GENERATION
  ---------------------------------------------------- */
  async function generatePdfReport(name, start, end, scores) {
    const doc = new jsPDF();

    // Favicon
    const favicon = await fetch("favicon.ico")
      .then(r => r.blob())
      .then(blob => new Promise(res => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(blob);
      }));

    doc.addImage(favicon, "PNG", 10, 10, 20, 20);

    doc.setFontSize(18);
    doc.text("Neuroreg", 40, 22);

    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 10, 45);
    doc.text(`Report Dates: ${start} → ${end}`, 10, 55);

    // Chart image
    const chartCanvas = document.getElementById("scoreChart");
    const chartImg = chartCanvas.toDataURL("image/png");

    doc.addImage(chartImg, "PNG", 10, 70, 180, 60);

    // Table
    let y = 140;
    doc.setFontSize(12);
    doc.text("Score History", 10, y);
    y += 10;

    scores.forEach(s => {
      const percent = Math.round((s.score / s.numberofquestions) * 100);
      doc.text(
        `${formatTimestamp(s.created_at)} | Q: ${s.numberofquestions} | Score: ${s.score} | ${percent}%`,
        10,
        y
      );
      y += 8;
    });

    doc.save("Neuroreg_Report.pdf");
  }

});