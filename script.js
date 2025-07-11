// Initialize votes from localStorage or set to 0
let chart;
let votes = {
  react: parseInt(localStorage.getItem("reactVotes")) || 0,
  vue: parseInt(localStorage.getItem("vueVotes")) || 0,
  angular: parseInt(localStorage.getItem("angularVotes")) || 0
};

// Function to vote
 function vote(option) {
//   ✅ Step 1: Check if user already voted
  // if (localStorage.getItem("voted")) {
  //   alert("You've already voted!");
  //   return;
  // }

  // ✅ Step 2: Increase vote count
  votes[option]++;
  localStorage.setItem(option + "Votes", votes[option]);
  localStorage.setItem("voted", "true");

  // ✅ Step 3: Show confetti celebration
  confetti({
  particleCount: 150,
  angle: 90,
  spread: 100,
  origin: { y: 0.6 },
  colors: ['#00ffaa', '#42B883', '#61DBFB', '#DD0031']
});

  // ✅ Step 4: Update UI
  updateUI();

  // ✅ Step 5: Update chart (optional)
  if (chart) {
    chart.data.datasets[0].data = [votes.react, votes.vue, votes.angular];
    chart.update();
  }
}

// Update UI vote counts
function updateUI() {
  document.getElementById("reactCount").textContent = votes.react;
  document.getElementById("vueCount").textContent = votes.vue;
  document.getElementById("angularCount").textContent = votes.angular;
}

// On load
updateUI();

window.onload = function () {
  const ctx = document.getElementById('pollChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['React', 'Vue', 'Angular'],
      datasets: [{
        label: 'Votes',
        data: [votes.react, votes.vue, votes.angular],
        backgroundColor: ['#61DBFB', '#42B883', '#DD0031']
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });

  updateUI();
};



function resetVotes() {
  votes = { react: 0, vue: 0, angular: 0 };
  localStorage.clear();
  updateUI();
  if (chart) chart.update();
}
