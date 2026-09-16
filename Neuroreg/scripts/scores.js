import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User ID missing:", userId);
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
          legend: { labels: { color: '#fff' } }
        }
      }
    });
  }

  loadScores();

  /* ----------------------------------------------------
     PDF REPORT BUTTON + MODAL
  ---------------------------------------------------- */
async function generatePdfReport(name, start, end, scores) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    unit: "pt",
    format: "a4"
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 40;
  let y = margin;

  /* -----------------------------
     HEADER BAR
  ----------------------------- */
  doc.setFillColor(42, 76, 138); // Neuroreg blue
  doc.rect(0, 0, pageWidth, 60, "F");

  // Favicon
  const favicon = await fetch("favicon.ico")
    .then(r => r.blob())
    .then(blob => new Promise(res => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.readAsDataURL(blob);
    }));

  doc.addImage(favicon, "PNG", margin, 15, 30, 30);

  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("Neuroreg Progress Report", margin + 50, 40);

  y = 80;

  /* -----------------------------
     USER INFO SECTION
  ----------------------------- */
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);

  doc.text(`Name: ${name}`, margin, y);
  y += 20;

  doc.text(`Report Dates: ${start} → ${end}`, margin, y);
  y += 30;

  /* -----------------------------
     CHART SECTION
  ----------------------------- */
  doc.setFontSize(16);
  doc.text("Performance Chart", margin, y);
  y += 10;

  const chartCanvas = document.getElementById("scoreChart");
  const chartImg = chartCanvas.toDataURL("image/png", 1.0);

  doc.addImage(chartImg, "PNG", margin, y, pageWidth - margin * 2, 150);
  y += 170;

  /* -----------------------------
     TABLE HEADER
  ----------------------------- */
  doc.setFontSize(16);
  doc.text("Score History", margin, y);
  y += 20;

  doc.setFontSize(12);
  doc.setFillColor(230, 230, 230);
  doc.rect(margin, y, pageWidth - margin * 2, 22, "F");

  doc.text("Date", margin + 10, y + 15);
  doc.text("Questions", margin + 150, y + 15);
  doc.text("Score", margin + 250, y + 15);
  doc.text("Percent", margin + 330, y + 15);

  y += 30;

  /* -----------------------------
     TABLE ROWS
  ----------------------------- */
  scores.forEach(s => {
    const percent = Math.round((s.score / s.numberofquestions) * 100);

    // Page break
    if (y > 750) {
      doc.addPage();
      y = margin;
    }

    doc.text(formatTimestamp(s.created_at), margin + 10, y);
    doc.text(String(s.numberofquestions), margin + 150, y);
    doc.text(String(s.score), margin + 250, y);
    doc.text(percent + "%", margin + 330, y);

    y += 22;
  });

  /* -----------------------------
     FOOTER
  ----------------------------- */
  const footerY = doc.internal.pageSize.getHeight() - 30;
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Generated by Neuroreg • Confidential", margin, footerY);

  doc.save("Neuroreg_Report.pdf");
}
});