import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { initHelpPopup } from "./helpPopup.js";   // ⭐ NEW
let openHelpPopup;   // ⭐ NEW


const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", () => {
     openHelpPopup = initHelpPopup(supabase);   // ⭐ NEW
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User ID missing — cannot load scores.");
    return;
  }

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
    if (item.url === "help" || item.url === "help.html") {
        openHelpPopup();   // ⭐ NEW
        return;
    }

    if (item.url === "logout") {
        logout();
        return;
    }

    window.location.href = item.url;
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
    tableBody.innerHTML = "";

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

    if (window.scoreChartInstance) {
      window.scoreChartInstance.destroy();
    }

    window.scoreChartInstance = new Chart(ctx, {
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
  legend: { display: false }
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

    const startISO = new Date(start + "T00:00:00").toISOString();
    const endISO = new Date(end + "T23:59:59").toISOString();

    const { data: scores } = await supabase
      .from("userpracticemcqscores")
      .select("*")
      .eq("userid", userId)
      .gte("created_at", startISO)
      .lte("created_at", endISO)
      .order("created_at", { ascending: true });

    modal.style.display = "none";

    generatePdfReport(name, start, end, scores);
  });



/* ----------------------------------------------------
   PDF GENERATION (enhanced layout)
---------------------------------------------------- */
async function generatePdfReport(name, start, end, scores) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    unit: "pt",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  let y = margin;

  /* -----------------------------
     HEADER BAR
  ----------------------------- */
  doc.setFillColor(70, 120, 200);
  doc.rect(0, 0, pageWidth, 60, "F");

  let favicon = null;
  try {
    favicon = await fetch("favicon.ico")
      .then(r => r.blob())
      .then(blob => new Promise(res => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(blob);
      }));
  } catch (e) {
    console.warn("Favicon failed to load:", e);
  }

  if (favicon) {
    const iconX = margin + 15;
    const iconY = 30;

    doc.setFillColor(255, 255, 255);
    doc.circle(iconX, iconY, 22, "F");

    doc.addImage(favicon, "PNG", iconX - 15, iconY - 15, 30, 30);
  }

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("Neuroreg Report", margin + 50, 40);

  /* -----------------------------
     USER INFO SECTION
  ----------------------------- */
  y = 105;

  const shortId = userId.slice(-6);

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);

  doc.text(`${name} (id ${shortId})`, pageWidth / 2, y, { align: "center" });
  y += 22;

  function ukDate(d) {
    const dt = new Date(d);
    const dd = String(dt.getDate()).padStart(2, "0");
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const yyyy = dt.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  doc.text(`${ukDate(start)} to ${ukDate(end)}`, pageWidth / 2, y, { align: "center" });
  y += 50;

  /* -----------------------------
     ENGAGEMENT SECTION
  ----------------------------- */
  const { data: profile } = await supabase
    .from("profiles")
    .select("streak_days")
    .eq("id", userId)
    .single();

  const longestStreak = profile?.streak_days ?? 0;

  const numberOfTests = scores.length;
  const totalQuestions = scores.reduce((sum, s) => sum + s.numberofquestions, 0);
  const totalScore = scores.reduce((sum, s) => sum + s.score, 0);

  const avgPercent = totalQuestions === 0
    ? 0
    : Math.round((totalScore / totalQuestions) * 100);

  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Engagement", margin, y);
  doc.setFont(undefined, "normal");
  y += 25;

  doc.setFontSize(12);
  doc.text(`Longest streak (all time): ${longestStreak} days`, margin, y);
  y += 20;

  doc.text(`Number of tests taken: ${numberOfTests}`, margin, y);
  y += 20;

  doc.text(`Total questions answered: ${totalQuestions}`, margin, y);
  y += 20;

  doc.text(`Overall percentage: ${avgPercent}%`, margin, y);
  y += 50;

  /* -----------------------------
     SCORES HEADING
  ----------------------------- */
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Scores", margin, y);
  doc.setFont(undefined, "normal");
  y += 15;

  /* ----------------------------------------------------
     PDF-ONLY CHART (UK DATE FIX APPLIED)
  ---------------------------------------------------- */

  const pdfCanvas = document.createElement("canvas");
  pdfCanvas.width = 800;
  pdfCanvas.height = 350;

  const pdfCtx = pdfCanvas.getContext("2d");

  const labels = scores.map(s => s.created_at);
  const dataPoints = scores.map(s => Math.round((s.score / s.numberofquestions) * 100));

  new Chart(pdfCtx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Score (%)",
        data: dataPoints,
        borderColor: "black",
        backgroundColor: "rgba(0,0,0,0.1)",
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "black"
      }]
    },
    options: {
      responsive: false,
      animation: false,
      scales: {
        y: {
          min: 0,
          max: 100,
          grid: { display: false },
          ticks: {
            color: "black",
            stepSize: 10,
            callback: v => v + "%"
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            color: "black",
            callback: (value, index) => {
              const rawTs = scores[index].created_at;
              const d = new Date(rawTs);

              const dd = String(d.getDate()).padStart(2, "0");
              const mm = String(d.getMonth() + 1).padStart(2, "0");
              const yyyy = d.getFullYear();

              return `${dd}/${mm}/${yyyy}`;   // ⭐ UK format
            }
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });

  const chartImg = pdfCanvas.toDataURL("image/png", 1.0);

  doc.addImage(chartImg, "PNG", margin, y, pageWidth - margin * 2, 225);
  y += 260;

  /* -----------------------------
     TABLE HEADER
  ----------------------------- */
  y += 15;

  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("History", margin, y);
  doc.setFont(undefined, "normal");
  y += 15;

  doc.setFillColor(230, 230, 230);
  doc.rect(margin, y, pageWidth - margin * 2, 22, "F");

  doc.text("Date", margin + 10, y + 15);
  doc.text("Questions", margin + 150, y + 15);
  doc.text("Score", margin + 250, y + 15);
  doc.text("Percent", margin + 330, y + 15);

  y += 38;

  /* -----------------------------
     TABLE ROWS
  ----------------------------- */
  scores.forEach(s => {
    const percent = Math.round((s.score / s.numberofquestions) * 100);

    if (y > pageHeight - 60) {
      doc.addPage();
      y = margin;
    }

    doc.setFontSize(12);
    doc.text(ukDate(s.created_at), margin + 10, y);  // ⭐ UK format here too
    doc.text(String(s.numberofquestions), margin + 150, y);
    doc.text(String(s.score), margin + 250, y);
    doc.text(percent + "%", margin + 330, y);

    y += 22;
  });

  /* -----------------------------
     FOOTER
  ----------------------------- */
  const footerY = pageHeight - 30;
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Generated by Neuroreg • Confidential", margin, footerY);

  doc.save("Neuroreg_Report.pdf");
}
});