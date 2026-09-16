import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", () => {
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
    const labels = scores.map(s => formatTimestamp(s.created_at).split(" ")[0]);
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
          borderColor: '#000',
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#000',
          pointBorderColor: '#000'
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: '#000', stepSize: 10 },
            title: { display: true, text: "Percent", color: "#000" },
            grid: { display: false }
          },
          x: {
            ticks: { color: '#000' },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { labels: { color: '#000' } }
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
     PDF GENERATION (enhanced)
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
       HEADER BAR (light grey)
    ----------------------------- */
    doc.setFillColor(230, 230, 230);
    doc.rect(0, 0, pageWidth, 60, "F");

    // Favicon
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
      doc.addImage(favicon, "PNG", margin, 15, 30, 30);
    }

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(22);
    doc.setTextColor(0, 0, 0);
    doc.text("Neuroreg Progress Report", margin + 50, 40);

    /* Space below banner */
    y = 100;

    /* -----------------------------
       USER INFO SECTION
    ----------------------------- */
    const shortId = userId.slice(-6);

    doc.setFontSize(14);
    doc.text(`Name: ${name} (Id ${shortId})`, margin, y);
    y += 25;

    doc.text(`Report Dates: ${start} → ${end}`, margin, y);
    y += 35;

    /* -----------------------------
       CHART SECTION
    ----------------------------- */
    doc.setFontSize(16);
    doc.text("Performance Chart", margin, y);
    y += 25;

    const chartCanvas = document.getElementById("scoreChart");
    const chartImg = chartCanvas.toDataURL("image/png", 1.0);

    doc.addImage(chartImg, "PNG", margin, y, pageWidth - margin * 2, 150);
    y += 180;

    /* -----------------------------
       TABLE HEADER
    ----------------------------- */
    doc.setFontSize(16);
    doc.text("Score History", margin, y);
    y += 25;

    doc.setFontSize(14);
    doc.setFillColor(230, 230, 230);
    doc.rect(margin, y, pageWidth - margin * 2, 26, "F");

    doc.text("Date", margin + 10, y + 18);
    doc.text("Questions", margin + 150, y + 18);
    doc.text("Score", margin + 250, y + 18);
    doc.text("Percent", margin + 330, y + 18);

    y += 32;

    /* -----------------------------
       TABLE ROWS
    ----------------------------- */
    scores.forEach(s => {
      const percent = Math.round((s.score / s.numberofquestions) * 100);

      if (y > pageHeight - 60) {
        doc.addPage();
        y = margin;
      }

      doc.text(formatTimestamp(s.created_at).split(" ")[0], margin + 10, y);
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