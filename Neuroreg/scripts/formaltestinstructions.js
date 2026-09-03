/* ----------------------------------------------------
   Supabase Connection
---------------------------------------------------- */
import {createClient} from "https://esm.sh/@supabase/supabase-js@2";
import {SUPABASE_URL, SUPABASE_KEY} from "../myenv.js";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ----------------------------------------------------
   MAIN PAGE LOGIC
---------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    /* ----------------------------------------------------
       Exit Warning
    ---------------------------------------------------- */
    function confirmExitExam() {
        return confirm(
            "If you leave this page you may not be allowed back into the examination.\n\nDo you want to continue?"
        );
    }

    /* ----------------------------------------------------
       Event Title
    ---------------------------------------------------- */
    const storedTitle = localStorage.getItem("currentEventTitle");
    document.getElementById("combinedHeading").textContent =
        storedTitle || "Event Instructions";

    /* ----------------------------------------------------
       Event Time Window
    ---------------------------------------------------- */
    const start = localStorage.getItem("currentEventStart");
    const finish = localStorage.getItem("currentEventFinish");

    if (start && finish) {
        document.getElementById("timeWindowText").textContent =
            `You must begin your attempt between ${start} and ${finish}.`;
    }

    /* ----------------------------------------------------
       Participant Name
    ---------------------------------------------------- */
    const nameInput = document.getElementById("participantName");
    const storedName = localStorage.getItem("participantName");

    if (storedName) nameInput.value = storedName;

    nameInput.addEventListener("input", () => {
        localStorage.setItem("participantName", nameInput.value);
    });

    /* ----------------------------------------------------
       Start Now → examination.html
    ---------------------------------------------------- */
    document.getElementById("startNowBtn").addEventListener("click", () => {
        localStorage.setItem("examLocked", "true");
        window.location.href = "examination.html";
    });

    /* ----------------------------------------------------
       Back Button
    ---------------------------------------------------- */
    document.getElementById("closeBtn").addEventListener("click", () => {
        if (confirmExitExam()) {
            window.history.back();
        }
    });
});