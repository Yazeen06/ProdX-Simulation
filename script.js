
const nameScreen = document.getElementById("nameScreen");
const enterGameBtn = document.getElementById("enterGameBtn");
const playerNameInput = document.getElementById("playerNameInput");
const playerDisplay = document.getElementById("playerDisplay");




// ================= ROUND 1 VARIABLES =================
let maxIcons = 3;
let placedIcons = new Set();
let draggedItem = null;

let currentGoalIndex = 0;
let totalScore = 0;

const goalIntro = document.getElementById("goalIntro");
const introTitle = document.getElementById("introTitle");
const startBtn = document.getElementById("startBtn");
const gameContainer = document.getElementById("gameContainer");
const leaderboard = document.getElementById("leaderboard");

const iconContainer = document.getElementById("iconContainer");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const goalTitle = document.getElementById("goalTitle");

const zones = document.querySelectorAll(".zone");

// ================= GOALS DATA =================
const goals = [
    {
        title: "Goal 1: Increase Conversion Rate",
        icons: [
            {name:"Flash Sale", score:8},
            {name:"Countdown", score:7},
            {name:"Free Shipping", score:9},
            {name:"Trust Badge", score:6},
            {name:"COD", score:6},
            {name:"EMI", score:5},
            {name:"One-Click Checkout", score:10},
            {name:"Price Drop", score:7},
            {name:"Low Stock", score:6},
            {name:"Rating", score:8},
            {name:"Easy Return", score:5},
            {name:"Coupon", score:7}
        ]
    },
    {
        title: "Goal 2: Increase Average Order Value",
        icons: [
            {name:"Bundle Discount", score:9},
            {name:"Buy 2 Get 1", score:8},
            {name:"Frequently Bought", score:9},
            {name:"Premium Membership", score:6},
            {name:"Cart Upsell", score:10},
            {name:"Cross-Sell", score:8},
            {name:"Cashback ₹2000+", score:7},
            {name:"Gift Wrap", score:4},
            {name:"Subscription Offer", score:6},
            {name:"Extended Warranty", score:5},
            {name:"Free Shipping Threshold", score:8},
            {name:"Combo Offer", score:9}
        ]
    },
    {
        title: "Goal 3: Improve Customer Retention",
        icons: [
            {name:"Loyalty Points", score:9},
            {name:"Membership Badge", score:8},
            {name:"Reorder Button", score:7},
            {name:"Wishlist Reminder", score:6},
            {name:"Saved Address", score:6},
            {name:"Cashback Wallet", score:7},
            {name:"Referral Program", score:9},
            {name:"Birthday Offer", score:5},
            {name:"App Only Discount", score:7},
            {name:"Order History", score:6},
            {name:"Personalized Rec", score:8},
            {name:"Push Notification", score:5}
        ]
    },
    {
        title: "Goal 4: Increase Engagement",
        icons: [
            {name:"Spin & Win", score:8},
            {name:"Daily Rewards", score:7},
            {name:"Live Deals", score:8},
            {name:"Video Reviews", score:6},
            {name:"Trending Carousel", score:7},
            {name:"Scratch Card", score:9},
            {name:"Poll Section", score:5},
            {name:"Influencer Picks", score:6},
            {name:"Flash Games", score:7},
            {name:"Product Quiz", score:6},
            {name:"Limited Drops", score:8},
            {name:"Social Reviews", score:7}
        ]
    },
    {
        title: "Goal 5: Reduce Cart Abandonment",
        icons: [
            {name:"Exit Discount", score:9},
            {name:"Delivery Guarantee", score:8},
            {name:"EMI Breakdown", score:6},
            {name:"Low Stock Alert", score:7},
            {name:"Price Lock", score:7},
            {name:"Saved Cart Reminder", score:8},
            {name:"Trust Badge Checkout", score:9},
            {name:"Address Autofill", score:8},
            {name:"Coupon Auto Apply", score:9},
            {name:"Payment Guarantee", score:8},
            {name:"COD Reminder", score:6},
            {name:"Easy Return Checkout", score:7}
        ]
    }
];


// ================= ROUND 1 FUNCTIONS =================

function loadGoal() {
    placedIcons.clear();
    iconContainer.innerHTML = "";

    introTitle.innerText = goals[currentGoalIndex].title;
    goalTitle.innerText = goals[currentGoalIndex].title;

    goals[currentGoalIndex].icons.forEach(iconData => {
        const div = document.createElement("div");
        div.className = "icon";
        div.innerText = iconData.name;
        div.dataset.score = iconData.score;
        makeDraggable(div);
        iconContainer.appendChild(div);
    });

    zones.forEach(zone => {
        zone.querySelectorAll(".icon").forEach(icon => icon.remove());
    });

    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
}

function makeDraggable(element) {
    element.setAttribute("draggable", "true");
    element.addEventListener("dragstart", function () {
        draggedItem = element;
    });
}

zones.forEach(zone => {
    zone.addEventListener("dragover", e => e.preventDefault());

    zone.addEventListener("drop", function (e) {
        e.preventDefault();
        if (!draggedItem) return;

        const isNewIcon = !placedIcons.has(draggedItem);

        if (isNewIcon && placedIcons.size >= maxIcons) {
            if (!zone.querySelector(".icon")) {
                alert("Maximum 3 icons allowed!");
                return;
            }
        }

        if (zone.querySelector(".icon")) {
            const existingIcon = zone.querySelector(".icon");
            iconContainer.appendChild(existingIcon);
            placedIcons.delete(existingIcon);
        }

        zone.appendChild(draggedItem);
        placedIcons.add(draggedItem);
    });
});

iconContainer.addEventListener("dragover", e => e.preventDefault());

iconContainer.addEventListener("drop", function (e) {
    e.preventDefault();
    if (!draggedItem) return;
    iconContainer.appendChild(draggedItem);
    placedIcons.delete(draggedItem);
});

// START ROUND 1
startBtn.addEventListener("click", function () {
    goalIntro.style.display = "none";
    gameContainer.style.display = "block";
});

// SUBMIT ROUND 1
submitBtn.addEventListener("click", function () {
    let roundScore = 0;

    placedIcons.forEach(icon => {
        const zone = icon.parentElement;
        const multiplier = parseFloat(zone.dataset.multiplier);
        const score = parseInt(icon.dataset.score);
        roundScore += score * multiplier;
    });

    totalScore += roundScore;

    submitBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
});

// NEXT GOAL OR MOVE TO ROUND 2
nextBtn.addEventListener("click", function () {
    currentGoalIndex++;

    if (currentGoalIndex < goals.length) {
        gameContainer.style.display = "none";
        goalIntro.style.display = "flex";
        loadGoal();
    } else {
        startRound2Flow();
    }
});

// ================= ROUND 2 VARIABLES =================

let sprint = 1;
let maxSprints = 4;
let growth = 50;
let happiness = 50;
let stability = 50;
let capacity = 10;
let selectedActions = [];
let round2Score = 0;

const round2Intro = document.getElementById("round2Intro");
const round2Game = document.getElementById("round2Game");
const startRound2 = document.getElementById("startRound2");
const confirmSprint = document.getElementById("confirmSprint");

const growthEl = document.getElementById("growth");
const happinessEl = document.getElementById("happiness");
const stabilityEl = document.getElementById("stability");
const capacityEl = document.getElementById("capacity");
const selectedCountEl = document.getElementById("selectedCount");
const sprintTitle = document.getElementById("sprintTitle");
const actionContainer = document.getElementById("actionContainer");

// ================= ROUND 2 ACTIONS =================

const actions = [
    {name:"Build Feature", cost:5, g:10, h:0, s:-5},
    {name:"Fix Bugs", cost:4, g:0, h:5, s:12},
    {name:"Improve Onboarding", cost:4, g:8, h:6, s:0},
    {name:"User Research", cost:2, g:3, h:5, s:0},
    {name:"Refactor Code", cost:6, g:-3, h:0, s:15},
    {name:"Launch Experiment", cost:5, g:12, h:-6, s:0}
];

// ================= ROUND 2 FLOW =================

function startRound2Flow() {
    gameContainer.style.display = "none";
    round2Intro.style.display = "flex";
}

startRound2.addEventListener("click", () => {
    round2Intro.style.display = "none";
    round2Game.style.display = "block";
    loadSprint();
});

function loadSprint() {
    sprintTitle.innerText = "🚀 Sprint " + sprint + " of 4";
    actionContainer.innerHTML = "";
    capacity = 10;
    selectedActions = [];

    capacityEl.innerText = capacity;
    selectedCountEl.innerText = 0;

    actions.forEach(action => {
        const card = document.createElement("div");
        card.className = "action-card";

        function statClass(value) {
            if (value > 0) return "positive";
            if (value < 0) return "negative";
            return "neutral";
        }

        card.innerHTML = `
            <strong>${action.name}</strong><br>
            <small>Cost: ${action.cost} energy</small>
            <div class="${statClass(action.g)}">📈 Growth ${action.g > 0 ? "+" : ""}${action.g}</div>
            <div class="${statClass(action.h)}">❤️ Happiness ${action.h > 0 ? "+" : ""}${action.h}</div>
            <div class="${statClass(action.s)}">🛠 Stability ${action.s > 0 ? "+" : ""}${action.s}</div>
        `;

        card.addEventListener("click", () => toggleAction(card, action));
        actionContainer.appendChild(card);
    });
}

function toggleAction(card, action) {
    const isSelected = card.classList.contains("selected");

    if (!isSelected) {
        if (selectedActions.length >= 3) return;
        if (capacity - action.cost < 0) return;

        card.classList.add("selected");
        selectedActions.push(action);
        capacity -= action.cost;
    } else {
        card.classList.remove("selected");
        selectedActions = selectedActions.filter(a => a !== action);
        capacity += action.cost;
    }

    capacityEl.innerText = capacity;
    selectedCountEl.innerText = selectedActions.length;
}

confirmSprint.addEventListener("click", () => {

    selectedActions.forEach(action => {
        growth += action.g;
        happiness += action.h;
        stability += action.s;
    });

    if (growth < 15 || happiness < 15 || stability < 15) {
        alert("Startup Failed!");
        showFinal();
        return;
    }

    growthEl.innerText = growth;
    happinessEl.innerText = happiness;
    stabilityEl.innerText = stability;

    sprint++;

    if (sprint > maxSprints) {
        round2Score = growth + happiness + stability;
        round2Game.style.display = "none";
        round3Intro.style.display = "flex";
        
    } else {
        loadSprint();
    }
});

// function showFinal() {
//     round2Game.style.display = "none";
//     leaderboard.style.display = "flex";

//     const finalTotal = totalScore + round2Score;

//     document.getElementById("finalScore").innerText =
//         "Round 1 Score: " + totalScore.toFixed(2) +
//         "\nRound 2 Score: " + round2Score +
//         "\nTotal Championship Score: " + finalTotal.toFixed(2);
// }

// INIT
// loadGoal();

// ================= ROUND 3 =================

let round3Score = 0;
let currentQuestion = 0;

const round3Intro = document.getElementById("round3Intro");
const round3Game = document.getElementById("round3Game");
const startRound3Btn = document.getElementById("startRound3");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");

const round3Questions = [
{question:"Full feature takes 4 months. Simple version takes 4 weeks. What do you do?",options:["Wait 4 months","Launch simple version and learn","Cancel feature","Delay until perfect"],answer:1},
{question:"CEO wants feature but no data supports it. What do you do?",options:["Build immediately","Ignore CEO","Run validation experiment","Launch premium only"],answer:2},
{question:"Improve onboarding (10% retention) or build feature (5% users)?",options:["Improve onboarding","Build feature","Redesign homepage","Do both small"],answer:0},
{question:"Users complain app is slow. What first?",options:["Add features","Improve performance","Increase ads","Change logo"],answer:1},
{question:"Retention dropped 20%. First step?",options:["Run ads","User interviews","Redesign UI","Push notifications"],answer:1},
{question:"Revenue up but NPS down. What do you do?",options:["Ignore NPS","Investigate dissatisfaction","Increase prices","More marketing"],answer:1},
{question:"Competitor launched big feature. What now?",options:["Copy immediately","Study impact first","Ignore","Launch random feature"],answer:1},
{question:"Low feature adoption. Why?",options:["Users don't care","Check onboarding","Increase pricing","Remove feature"],answer:1},
{question:"No data available. What do you do?",options:["Guess","Run small experiment","Delay forever","Ask employees"],answer:1},
{question:"Engineering vs Business conflict. What do you do?",options:["Feature only","Refactor only","Balance roadmap","Ignore both"],answer:2}
];

startRound3Btn.addEventListener("click", () => {
    round3Intro.style.display = "none";
    round3Game.style.display = "flex";
    loadQuestion();
});

// function loadQuestion() {
//     nextQuestionBtn.style.display = "none";
//     optionsContainer.innerHTML = "";

//     const q = round3Questions[currentQuestion];
//     questionText.innerText = "Question " + (currentQuestion + 1) + " / 10\n\n" + q.question;

//     q.options.forEach((option, index) => {
//         const div = document.createElement("div");
//         div.className = "option-card";
//         div.innerText = option;

//         div.onclick = () => {
//             document.querySelectorAll(".option-card").forEach(o => o.classList.remove("selected"));
//             div.classList.add("selected");
//             div.dataset.index = index;
//             nextQuestionBtn.style.display = "inline-block";
//         };

//         optionsContainer.appendChild(div);
//     });
// }

function loadQuestion() {

    nextQuestionBtn.style.display = "none";
    optionsContainer.innerHTML = "";

    const q = round3Questions[currentQuestion];

    questionText.innerText =
        "Question " + (currentQuestion + 1) + " / 10\n\n" + q.question;

    q.options.forEach((option, index) => {

        const div = document.createElement("div");
        div.className = "option-card";
        div.innerText = option;

        div.onclick = () => handleAnswerSelection(div, index);

        optionsContainer.appendChild(div);
    });
}

function handleAnswerSelection(selectedDiv, selectedIndex) {

    const correctIndex = round3Questions[currentQuestion].answer;
    const allOptions = document.querySelectorAll(".option-card");

    // Disable further clicking
    allOptions.forEach(option => {
        option.classList.add("disabled");
    });

    if (selectedIndex === correctIndex) {
        selectedDiv.classList.add("correct");
        round3Score += 10;
    } else {
        selectedDiv.classList.add("wrong");

        // Highlight correct one in green
        allOptions[correctIndex].classList.add("correct");
    }

    nextQuestionBtn.style.display = "inline-block";
}

nextQuestionBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < round3Questions.length) {
        loadQuestion();
    } else {
        showFinal();
    }
});

// ================= FINAL =================

function showFinal() {

    round2Game.style.display = "none";
    round3Game.style.display = "none";
    leaderboard.style.display = "flex";

    const finalTotal = totalScore + round2Score + round3Score;

    playerDisplay.innerText = "Team: " + playerName;

    document.getElementById("finalScore").innerText =
        "Round 1: " + totalScore.toFixed(2) +
        "\nRound 2: " + round2Score +
        "\nRound 3: " + round3Score +
        "\nTotal Score: " + finalTotal.toFixed(2);
}

// INIT
loadGoal();

let playerName = "";

document.getElementById("enterGameBtn").addEventListener("click", function () {
    const input = document.getElementById("playerNameInput").value.trim();

    if (input === "") {
        alert("Please enter your name!");
        return;
    }

    playerName = input;

    document.getElementById("nameScreen").style.display = "none";
    document.getElementById("goalIntro").style.display = "flex";
});
// document.getElementById("playerDisplay").innerText =
//     "Player: " + playerName;

enterGameBtn.addEventListener("click", function () {

    const inputName = playerNameInput.value.trim();

    if (inputName === "") {
        alert("Please enter your Team Name");
        return;
    }

    playerName = inputName;

    nameScreen.style.display = "none";
    goalIntro.style.display = "flex";

    loadGoal();
});