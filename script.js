let compliments = [];
let currentCompliment = "";

fetch("compliments.json")
.then((res) => res.json())
.then((data) => compliments = data)
.catch((err) => console.error("Failed to load compliments: ", err));

// DOM ELEMENTS
const sakuraBtn = document.getElementById("sakuraBtn");
const complimentCard = document.getElementById("complimentCard");
const complimentText = document.getElementById("complimentText");
const copyBtn = document.getElementById("copyBtn");
const copyToast = document.getElementById("copyToast");
const welcomeMessage = document.getElementById("welcomeMessage");

// FUNCTION to show compliment
const showCompliment = () => {
      if (compliments.length === 0) {
    alert("Loading compliments... try again in a second! 🌸");
    return;
  }

  const randomIndex = Math.floor(Math.random() * compliments.length);
  currentCompliment = compliments[randomIndex];

    // Hide welcome message
  welcomeMessage.style.opacity = "0";
  welcomeMessage.style.transform = "translateY(-20px)";

  setTimeout(()=>{
    welcomeMessage.classList.add("hidden");

    // Show compliment
    complimentText.textContent = currentCompliment;
    complimentCard.classList.remove("hidden");

    // animation
    setTimeout(() => {
      complimentCard.style.opacity = "1";
      complimentCard.style.transform = "scale(1)";
    }, 50);
  }, 300)
}

//  FUNCTION to show toast
function showCopyToast() {
    copyToast.style.transform = "translateX(0)";
  setTimeout(() => {
    copyToast.style.transform = "translateX(100%)";
  }, 2000);
}

// FUNCTION to copy to clipboard
async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(currentCompliment);
    showCopyToast();
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = currentCompliment;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    showCopyToast();
  }
}

// Event listeners
sakuraBtn.addEventListener("click", showCompliment);
copyBtn.addEventListener("click", copyToClipboard);

function createFloatingPetal() {
  const petal = document.createElement("div");
  petal.innerHTML = "🌸";
  petal.className = "floating-petal";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.top = "-50px";
  petal.style.animation = `float ${5 + Math.random() * 5}s linear forwards`;
  document.body.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 10000);
}


// Create floating petals occasionally
setInterval(createFloatingPetal, 3000);