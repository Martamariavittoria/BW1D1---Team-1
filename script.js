 const questions = [
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "What does CPU stand for?",
        correct_answer: "Central Processing Unit",
        incorrect_answers: [
          "Central Process Unit",
          "Computer Personal Unit",
          "Central Processor Unit",
        ],
      },

      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
        correct_answer: "Final",
        incorrect_answers: ["Static", "Private", "Public"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "The logo for Snapchat is a Bell.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question:
          "Pointers were not used in the original C programming language; they were added later on in C++.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "What is the most preferred image format used for logos in the Wikimedia database?",
        correct_answer: ".svg",
        incorrect_answers: [".png", ".jpeg", ".gif"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "In web design, what does CSS stand for?",
        correct_answer: "Cascading Style Sheet",
        incorrect_answers: [
          "Counter Strike: Source",
          "Corrective Style Sheet",
          "Computer Style Sheet",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "What is the code name for the mobile operating system Android 7.0?",
        correct_answer: "Nougat",
        incorrect_answers: [
          "Ice Cream Sandwich",
          "Jelly Bean",
          "Marshmallow",
        ],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question: "On Twitter, what is the character limit for a Tweet?",
        correct_answer: "140",
        incorrect_answers: ["120", "160", "100"],
      },
      {
        category: "Science: Computers",
        type: "boolean",
        difficulty: "easy",
        question: "Linux was first created as an alternative to Windows XP.",
        correct_answer: "False",
        incorrect_answers: ["True"],
      },
      {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
      },
    ];
  

  //dati
  let currentQuestionIndex = 0; // Per tenere traccia della domanda attuale
  let flagNumScelte ;
  let registro = []; // per racciare le risposte sbagliate e corrette
  let verifica; //bool da aggiungere a verifica in caso di risposta giusta o errata
  let giuste;
  let sbagliate;
  let esito = "";

  //funzioni

function creaDomande() {
  const domandaDiv = document.getElementById("domanda");
  const risposte = document.getElementById("risposte");
  
  domandaDiv.textContent = ""; // Reset del contenuto della domanda

  // Mostra il numero della domanda corrente
  const numDomanda = document.getElementById("numDomanda");
  numDomanda.innerHTML = `<strong>QUESTION ${currentQuestionIndex + 1}<span style="color:#d936eb"> / ${questions.length}</span></strong>`;

  const currentQuestion = questions[currentQuestionIndex];

  // Imposta la domanda
  const questionText = document.createElement("h2");
  questionText.textContent = currentQuestion.question;
  domandaDiv.appendChild(questionText);

  // Combina le risposte giuste e sbagliate
  let selezioni = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);

  // Ottieni tutti i checkbox e le label
  const casellelab = risposte.getElementsByClassName("label");
  const checkboxes = document.getElementsByClassName("myCheckbox");

  // Reset dei checkbox (deseleziona tutti)
  for (let checkbox of checkboxes) {
      checkbox.checked = false;
  }

  // Gestione del numero di checkbox in base al tipo di domanda
  if (currentQuestion.type === "boolean") {
      // Domanda boolean: mostra solo 2 opzioni
      for (let i = 0; i < casellelab.length; i++) {
          if (i < 2) {
              // Mostra solo i primi due checkbox e label
              casellelab[i].classList.remove("vis");
              casellelab[i].textContent = selezioni[i];
              checkboxes[i].classList.remove("vis");
              checkboxes[i].value = selezioni[i];
          } else {
              // Nascondi gli altri checkbox e label
              casellelab[i].classList.add("vis");
              checkboxes[i].classList.add("vis");
          }
      }
  } else {
      // Domanda multiple: mostra tutte le opzioni
      for (let i = 0; i < casellelab.length; i++) {
          if (selezioni[i]) {
              // Mostra la label e il checkbox corrispondente
              casellelab[i].textContent = selezioni[i];
              casellelab[i].classList.remove("vis");
              checkboxes[i].classList.remove("vis");
              checkboxes[i].value = selezioni[i];
          } else {
              // Nascondi i checkbox e label in eccesso
              casellelab[i].classList.add("vis");
              checkboxes[i].classList.add("vis");
          }
      }
  }
}

function verificaRisposta() {
  const checkboxes = document.getElementsByClassName("myCheckbox");
  let selectedValue = null;

  // Trova il checkbox selezionato
  for (let checkbox of checkboxes) {
      if (checkbox.checked) {
          selectedValue = checkbox.value; // Ottieni il valore del checkbox selezionato
          break; // Ferma il ciclo una volta trovato
      }
  }

  if (selectedValue !== null) {
      const currentQuestion = questions[currentQuestionIndex]; // Domanda corrente
      const correctAnswer = currentQuestion.correct_answer; // Risposta corretta

      // Confronta la risposta selezionata con la risposta corretta
      if (selectedValue === correctAnswer) {
          /* alert("Risposta corretta!"); */
          verifica = true;
      } else {
          /* alert("Risposta sbagliata. La risposta corretta era: " + correctAnswer); */
          verifica = false;
      }
  } else {
      alert("Seleziona una risposta!");
      creaDomande();
  }

  registro[currentQuestionIndex] = verifica; // Registra il risultato della risposta
  console.log(registro);
}

function mostraFineQuiz() {
  const domandaDiv = document.getElementById("domanda");
  domandaDiv.textContent = "Hai completato il quiz!";

  const MostraRis = document.getElementById("finequiz"); 
  MostraRis.innerHTML = ""; // Pulisci il contenuto precedente

  let giuste = 0; 
  let sbagliate = 0; 

  // Calcola le risposte corrette e sbagliate
  for (let i = 0; i < registro.length; i++) {
    if (registro[i]) {
      giuste += 1; 
    } else {
      sbagliate += 1; 
    }
  }

  // Crea un nuovo elemento span per visualizzare il risultato
  let span = document.createElement("span"); 
  span.innerHTML = "Hai risposto correttamente a: " + "<span style='color:green'>" + giuste + " domande" +"</span>"+ "<br>" +
                   "Hai sbagliato: " + "<span style='color:red'>"+ sbagliate + " domande";
  MostraRis.appendChild(span); 

  const risposte = document.getElementById("risposte");
  risposte.innerHTML = ""; // svuota liste

  const numDomanda = document.getElementById("numDomanda");
  numDomanda.innerHTML = "<strong>Quiz Terminato!</strong>";

}


let btn = document.getElementById("conferma");

btn.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    verificaRisposta();  // Prima verifica la risposta attuale
    currentQuestionIndex++;  

    if (currentQuestionIndex < questions.length) {
      creaDomande(); // Carica la prossima domanda
    } else {
      mostraFineQuiz(); // Mostra il messaggio di fine quiz
    }
  }
});

// Carica la prima domanda quando la pagina è pronta perche o seno mi esce vuoto
window.onload = function() {
  creaDomande(); 
};

//chiudo la prima pagina e vado al quiz
function vaiAdUnAltraPagina() {
  window.location.href = "test.html"; // Sostituisci con la tua URL
}

  

    
