window.addEventListener("DOMContentLoaded", () => {

  /* LOGIN CHECK */
  const token = localStorage.getItem("sessionToken");
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  /* SELECT OPTION */
  window.selectOption = function (qIndex, optIndex, element) {
    const allOptions = document.querySelectorAll(`label.optionLabel[data-q="${qIndex}"]`);
    allOptions.forEach(opt => opt.classList.remove("selected"));
    element.classList.add("selected");

    const radio = element.querySelector("input[type='radio']");
    radio.checked = true;
  };

  /* STORE SCORE */
  window.storeScore = async function (score, numberOfQuestions, topic, level) {
    const userId = parseInt(localStorage.getItem("userId"));
    if (!userId) return;

    await window.supabase
      .from("userpracticemcqscores")
      .insert({
        userid: userId,
        score,
        numberofquestions: numberOfQuestions,
        topic,
        level
      });
  };

  /* MCQ BUILDER */
  window.copilot = {
    generateMCQs: async ({count, topic, level}) => {
      let pool = await window.fetchQuestionsFromDB();

      pool = pool.map(q => {
        const options = [
          {text: q.option1, correct: true},
          {text: q.option2, correct: false},
          {text: q.option3, correct: false},
          {text: q.option4, correct: false}
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

      /* Remove over-flagged questions */
      pool = pool.filter(q => (q.flaggedset || 0) < 5);

      /* Topic filter */
      if (topic !== "all") {
        pool = pool.filter(q => q.topic.toLowerCase() === topic.toLowerCase());
      }

      /* Level filter */
      if (level !== "all") {
        pool = pool.filter(q => q.level.toLowerCase() === level.toLowerCase());
      }

      /* Shuffle pool */
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }

      return pool.slice(0, count);
    }
  };

  /* FLAG QUESTION */
  window.flagQuestion = async function (questionId, buttonElement) {
    const {data, error} = await window.supabase
      .from("mcqquestions")
      .select("flaggedset")
      .eq("id", questionId)
      .single();

    if (error) return alert("Could not flag question.");

    const current = data.flaggedset || 0;
    if (current >= 5) return alert("Already flagged 5 times.");

    const updated = current + 1;

    const {error: updateError} = await window.supabase
      .from("mcqquestions")
      .update({flaggedset: updated})
      .eq("id", questionId);

    if (updateError) return alert("Could not update flag count.");

    alert(`Question flagged (${updated}/5)`);
    buttonElement.disabled = true;
  };

  /* RENDER + MARK MCQs */
  window.generateMCQs = async function () {
    const count = parseInt(document.getElementById("mcqCount").value);
    const topic = document.getElementById("mcqAreas").value;
    const level = document.getElementById("mcqLevel").value;

    if (!count || count < 1) {
      alert("Please enter a valid number of questions.");
      return;
    }

    document.getElementById("mcqSetup").style.display = "none";

    const container = document.getElementById("mcqquestions");
    container.innerHTML = "";
    document.getElementById("scoreDisplay").innerHTML = "";

    let questions = await window.copilot.generateMCQs({count, topic, level});
    if (!questions.length) return alert("No questions available.");

    /* Progress button (created BEFORE submit button) */
    const scoresBtn = document.createElement("button");
    scoresBtn.textContent = "Progress";
    scoresBtn.className = "progressBtn";
    scoresBtn.style.display = "none";
    scoresBtn.onclick = () => window.location.href = "scores.html";

    /* Render questions */
    questions.forEach((q, index) => {
      const block = document.createElement("div");
      block.className = "questionBlock";

      block.innerHTML = `
        <p><strong>Q${index + 1} (${q.level}):</strong> ${q.stem}</p>
        ${q.options.map((opt, j) => `
          <label class="optionLabel" data-q="${index}" onclick="selectOption(${index}, ${j}, this)">
            <input type="radio" name="q${index}" value="${j}">
            ${opt}
          </label>
        `).join("")}
      `;

      block.dataset.correct = q.correctIndex;
      block.dataset.explanation = q.explanation;
      block.dataset.id = q.id;

      container.appendChild(block);
    });

    /* Submit button */
    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";

    submitBtn.onclick = () => {
      submitBtn.remove();
      scoresBtn.style.display = "inline-block";

      let score = 0;
      let scalpelDelta = 0;

      const blocks = document.querySelectorAll(".questionBlock");

      blocks.forEach((block, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const correct = block.dataset.correct;
        const explanation = block.dataset.explanation;

        const isCorrect = selected && selected.value === correct;

        /* Correct */
        if (isCorrect) {
          score++;
          scalpelDelta += 2;
          block.style.border = "2px solid #2e8b57";
          block.insertAdjacentHTML("beforeend",
            `<p class="resultTag correct"><strong>Correct (+2)</strong></p>`
          );
        }

        /* Wrong */
        else {
          scalpelDelta -= 1;
          block.style.border = "2px solid #b30000";
          block.insertAdjacentHTML("beforeend",
            `<p class="resultTag wrong"><strong>Wrong (-1)</strong></p>`
          );
        }

        /* Explanation */
        const explanationDiv = document.createElement("div");
        explanationDiv.className = "explanation";
        explanationDiv.innerHTML = `<strong>Explanation:</strong> ${explanation}`;
        block.appendChild(explanationDiv);

        /* Flag button */
        const flagBtn = document.createElement("button");
        flagBtn.textContent = "Flag";
        flagBtn.className = "flagBtn";
        flagBtn.onclick = () => flagQuestion(block.dataset.id, flagBtn);
        block.appendChild(flagBtn);
      });

      /* Update scalpel points */
      let currentPoints = parseInt(localStorage.getItem("scalpelPoints")) || 0;
      let newPoints = Math.max(0, currentPoints + scalpelDelta);
      localStorage.setItem("scalpelPoints", String(newPoints));

      /* Score display */
      document.getElementById("scoreDisplay").innerHTML =
        `<p><strong>Score:</strong> ${score}/${questions.length}</p>
         <p><strong>Points change:</strong> ${scalpelDelta > 0 ? "+" : ""}${scalpelDelta}</p>`;

      storeScore(score, questions.length, topic, level);
    };

    container.appendChild(submitBtn);
    container.appendChild(scoresBtn);
  };

  document.getElementById("startSubmitBtn").onclick = window.generateMCQs;
});