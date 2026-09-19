/* --- SUPABASE CLIENT (MODULE IMPORTS) --- */
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { SUPABASE_URL, SUPABASE_KEY } from "../myenv.js";
import { initHelpPopup } from "./helpPopup.js";
import { logout } from "./logout.js";

let openHelpPopup;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
window.supabase = supabase;

/* --- MAIN LOGIC --- */
window.addEventListener("DOMContentLoaded", () => {

  /* HELP POPUP INIT */
  openHelpPopup = initHelpPopup(supabase);

  /* LOGIN CHECK */
  const token = localStorage.getItem("sessionToken");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  /* ------------------------------
     HAMBURGER MENU LOADER
  ------------------------------ */
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
      console.error("Hamburger menu load failed:", error);
      dropdown.innerHTML = "<div class='dropdownItem'>Menu failed to load</div>";
      return;
    }

    let currentSection = null;

    data.forEach(item => {
      if (item.admin && !isAdmin) return;
      if (item.url === currentPage) return;

      if (currentSection !== null && item.hamburgersection !== currentSection) {
        const separator = document.createElement("div");
        separator.className = "dropdownSeparator";
        dropdown.appendChild(separator);
      }

      currentSection = item.hamburgersection;

      const div = document.createElement("div");
      div.className = "dropdownItem";
      div.innerText = (item.emoji ? item.emoji + " " : "") + item.displayname;

      div.onclick = () => {
        if (item.url === "help" || item.url === "help.html") {
          openHelpPopup();
          return;
        }
        if (item.url === "logout") logout();
        else window.location.href = item.url;
      };

      dropdown.appendChild(div);
    });
  }

  /* ------------------------------
     TOP-RIGHT ICON LOADER
  ------------------------------ */
  async function loadTopRightIcons() {
    const container = document.getElementById("topRightIcons");
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const currentPage = window.location.pathname.split("/").pop();

    const { data, error } = await supabase
      .from("menuitems")
      .select("*")
      .eq("topright", true)
      .order("toprightorder", { ascending: true });

    if (error) {
      console.error("Top-right icons load failed:", error);
      return;
    }

    container.innerHTML = "";

    data.forEach(item => {
      if (item.admin && !isAdmin) return;
      if (item.url === currentPage) return;

      const icon = document.createElement("div");
      icon.className = "topRightIcon";
      icon.innerText = item.emoji;

      icon.onclick = () => {
        if (item.url === "help" || item.url === "help.html") {
          openHelpPopup();
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

  /* ------------------------------
     HAMBURGER TOGGLE
  ------------------------------ */
  function initHamburgerToggle() {
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
  }

  /* INIT MENUS + TOGGLE */
  initHamburgerToggle();
  loadHamburgerMenu();
  loadTopRightIcons();

  /* ------------------------------
     MCQ OPTION SELECTOR
  ------------------------------ */
  window.selectOption = function (qIndex, optIndex, element) {
    const allOptions = document.querySelectorAll(`label.optionLabel[data-q="${qIndex}"]`);
    allOptions.forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");

    const radio = element.querySelector("input[type='radio']");
    radio.checked = true;
  };

  /* ------------------------------
     SCORE STORAGE
  ------------------------------ */
  window.storeScore = async function (score, numberOfQuestions) {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const { error } = await supabase
      .from("userpracticemcqscores")
      .insert({
        userid: userId,
        score,
        numberofquestions: numberOfQuestions
      });

    if (error) console.error("Score insert failed:", error);
  };

  /* ------------------------------
     SCALPEL POINTS LOAD
  ------------------------------ */
  window.loadScalpelPoints = async function () {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const { data, error } = await supabase
      .from("profiles")
      .select("scalpel_points")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Could not load scalpel points:", error);
      return;
    }

    localStorage.setItem("scalpelPoints", String(data.scalpel_points || 0));
  };

  /* ------------------------------
     SCALPEL POINTS UPDATE
  ------------------------------ */
  window.updateScalpelPoints = async function (newPoints) {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const { error } = await supabase
      .from("profiles")
      .update({ scalpel_points: newPoints })
      .eq("id", userId);

    if (error) console.error("Failed to update scalpel points:", error);
  };

  /* ------------------------------
     FETCH QUESTIONS
  ------------------------------ */
  window.fetchQuestionsFromDB = async function () {
    const { data, error } = await supabase
      .from("mcqquestions")
      .select("*");

    if (error) {
      console.error("Could not fetch questions:", error);
      return [];
    }

    return data;
  };

  /* ------------------------------
     FETCH POINTS FOR SCORE
  ------------------------------ */
  window.fetchPointsForScore = async function (score) {
    const { data, error } = await supabase
      .from("points_for_mcqs")
      .select("points")
      .eq("score", score)
      .single();

    if (error || !data) {
      console.error("Could not fetch points for score:", error);
      return 0;
    }

    return data.points ?? 0;
  };

  /* ------------------------------
     FETCH RANK DISTRIBUTION
     (based on scalpel_points)
  ------------------------------ */
  window.fetchRankDistribution = async function () {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.warn("No userId found, using default distribution.");
      return { mrcs: 10, frcs: 0, challenge: 0 };
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("scalpel_points")
      .eq("id", userId)
      .single();

    if (profileError || !profile) {
      console.error("Could not load scalpel points:", profileError);
      return { mrcs: 10, frcs: 0, challenge: 0 };
    }

    const points = profile.scalpel_points ?? 0;

    const { data: rankRow, error: rankError } = await supabase
      .from("rank")
      .select("mrcs_level, frcs_level, challenge_level")
      .lte("minimum_score", points)
      .gte("maximum_score", points)
      .single();

    if (rankError || !rankRow) {
      console.error("Could not match scalpel_points to rank:", rankError);
      return { mrcs: 10, frcs: 0, challenge: 0 };
    }

    return {
      mrcs: rankRow.mrcs_level ?? 0,
      frcs: rankRow.frcs_level ?? 0,
      challenge: rankRow.challenge_level ?? 0
    };
  };

    /* ------------------------------
     MCQ GENERATOR (RANK-BASED)
  ------------------------------ */
  window.copilot = {
    generateMCQs: async () => {
      const TOTAL_QUESTIONS = 10;

      let pool = await window.fetchQuestionsFromDB();

      /* Remove over-flagged questions */
      pool = pool.filter(q => (q.flaggedset || 0) < 5);

      /* Shuffle pool */
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      if (!pool.length) {
        console.warn("Question pool is empty after filtering.");
        return [];
      }

      /* Get difficulty distribution from rank table */
      const dist = await window.fetchRankDistribution();

      const byLevel = (level) =>
        pool.filter(q => q.level && q.level.toLowerCase() === level.toLowerCase());

      const selected = [];
      const usedIds = new Set();

      const takeFromLevel = (level, count) => {
        const candidates = byLevel(level);
        let taken = 0;
        for (let i = 0; i < candidates.length && taken < count; i++) {
          const q = candidates[i];
          if (usedIds.has(q.id)) continue;
          selected.push(q);
          usedIds.add(q.id);
          taken++;
        }
      };

      /* Take questions according to rank distribution */
      takeFromLevel("MRCS", dist.mrcs);
      takeFromLevel("FRCS", dist.frcs);
      takeFromLevel("Challenge", dist.challenge);

      /* Fill remaining slots with any questions */
      if (selected.length < TOTAL_QUESTIONS) {
        const remaining = pool.filter(q => !usedIds.has(q.id));
        for (let i = 0; i < remaining.length && selected.length < TOTAL_QUESTIONS; i++) {
          selected.push(remaining[i]);
          usedIds.add(remaining[i].id);
        }
      }

      /* Trim if too many */
      if (selected.length > TOTAL_QUESTIONS) {
        selected.length = TOTAL_QUESTIONS;
      }

      /* Final shuffle */
      for (let i = selected.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selected[i], selected[j]] = [selected[j], selected[i]];
      }

      /* Convert to MCQ format */
      return selected.map(q => {
        const options = [
          { text: q.option1, correct: true },
          { text: q.option2, correct: false },
          { text: q.option3, correct: false },
          { text: q.option4, correct: false }
        ];

        /* Shuffle options */
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }

        return {
          id: q.id,
          stem: q.stem,
          topic: q.topic,
          level: q.level,
          explanation: q.explanation,
          flaggedset: q.flaggedset,
          options: options.map(o => o.text),
          correctIndex: options.findIndex(o => o.correct)
        };
      });
    }
  };

  /* ------------------------------
     FLAG QUESTION
  ------------------------------ */
  window.flagQuestion = async function (questionId, buttonElement) {
    const { data, error } = await supabase
      .from("mcqquestions")
      .select("flaggedset")
      .eq("id", questionId)
      .single();

    if (error) {
      console.error("Flag fetch failed:", error);
      return alert("Could not flag question.");
    }

    const current = data.flaggedset || 0;
    if (current >= 5) {
      alert("Already flagged 5 times.");
      buttonElement.disabled = true;
      buttonElement.textContent = "Flagged";
      return;
    }

    const updated = current + 1;

    const { error: updateError } = await supabase
      .from("mcqquestions")
      .update({ flaggedset: updated })
      .eq("id", questionId);

    if (updateError) {
      console.error("Flag update failed:", updateError);
      return alert("Could not update flag count.");
    }

    alert(`Question flagged (${updated}/5)`);
    buttonElement.disabled = true;
    buttonElement.textContent = "Flagged";
  };

    /* ------------------------------
     RENDER + MARK MCQs
  ------------------------------ */
  window.generateMCQs = async function () {
    const container = document.getElementById("mcqquestions");
    const scoreDisplay = document.getElementById("scoreDisplay");

    container.innerHTML = "";
    scoreDisplay.innerHTML = "";

    let questions = await window.copilot.generateMCQs();
    if (!questions.length) {
      alert("No questions available.");
      return;
    }

    /* Render questions */
    questions.forEach((q, index) => {
      const block = document.createElement("div");
      block.className = "questionBlock";

      block.innerHTML = `
        <p><strong>Q${index + 1} (${q.level}):</strong> ${q.stem}</p>
        ${q.options
          .map(
            (opt, j) => `
          <label class="optionLabel" data-q="${index}" onclick="selectOption(${index}, ${j}, this)">
            <input type="radio" name="q${index}" value="${j}">
            <span class="optionText">${opt}</span>
          </label>
        `
          )
          .join("")}
      `;

      block.dataset.correct = q.correctIndex;
      block.dataset.explanation = q.explanation;
      block.dataset.id = q.id;

      container.appendChild(block);
    });

    /* Submit button */
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";

    submitBtn.onclick = async () => {
      submitBtn.remove();

      let score = 0;

      const blocks = document.querySelectorAll(".questionBlock");

      blocks.forEach((block, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const correct = block.dataset.correct;
        const explanation = block.dataset.explanation;

        const isCorrect = selected && Number(selected.value) === Number(correct);
        const isAnswered = !!selected;

        if (isCorrect) {
          score += 1;
          block.style.border = "2px solid #2e8b57";
          block.insertAdjacentHTML(
            "beforeend",
            `<p class="resultTag correct"><strong>Correct</strong></p>`
          );
        } else if (isAnswered) {
          block.style.border = "2px solid #b30000";
          block.insertAdjacentHTML(
            "beforeend",
            `<p class="resultTag wrong"><strong>Incorrect</strong></p>`
          );
        } else {
          block.style.border = "2px solid #2f1bb0";
          block.insertAdjacentHTML(
            "beforeend",
            `<p class="resultTag wrong"><strong>Not answered</strong></p>`
          );
        }

        const explanationDiv = document.createElement("div");
        explanationDiv.className = "explanation";
        explanationDiv.innerHTML = `<strong>Explanation:</strong> ${explanation}`;
        block.appendChild(explanationDiv);

        const flagBtn = document.createElement("button");
        flagBtn.textContent = "Flag";
        flagBtn.className = "flagBtn";
        flagBtn.onclick = () => flagQuestion(block.dataset.id, flagBtn);
        block.appendChild(flagBtn);
      });

      /* ------------------------------
         POINTS AWARDED (REPLACEMENT MODE)
         score → lookup in points_for_mcqs
      ------------------------------ */
      const awardedPoints = await window.fetchPointsForScore(score);

      let currentPoints = parseInt(localStorage.getItem("scalpelPoints")) || 0;
      let newPoints = Math.max(0, currentPoints + awardedPoints);

      localStorage.setItem("scalpelPoints", String(newPoints));
      window.updateScalpelPoints(newPoints);

      scoreDisplay.innerHTML =
        `<p><strong>Score:</strong> ${score}/${blocks.length}</p>
         <p><strong>Points change:</strong> ${awardedPoints}</p>`;

      /* SCORE SAVING */
      window.storeScore(score, blocks.length);
    };

    container.appendChild(submitBtn);
   };

     /* ------------------------------
     AUTO-START MCQs
  ------------------------------ */
  (async () => {
    await window.loadScalpelPoints();
    window.generateMCQs();
  })();

}); // END OF DOMContentLoaded
