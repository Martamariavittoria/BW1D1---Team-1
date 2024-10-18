const questions1 = [
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
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
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

  //parte altre domande
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does RAM stand for?",
    correct_answer: "Random Access Memory",
    incorrect_answers: [
      "Readily Available Memory",
      "Run Active Memory",
      "Randomly Allocated Memory"
    ]
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "HTML stands for Hypertext Markup Language.",
    correct_answer: "True",
    incorrect_answers: ["False"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which company developed the video game 'Minecraft'?",
    correct_answer: "Mojang",
    incorrect_answers: ["Microsoft", "Google", "Valve"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which of the following is not a programming language?",
    correct_answer: "HTML",
    incorrect_answers: ["Python", "Java", "C++"]
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The Python programming language was named after the comedy group Monty Python.",
    correct_answer: "True",
    incorrect_answers: ["False"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which language is primarily used for Android app development?",
    correct_answer: "Java",
    incorrect_answers: ["C#", "Swift", "Ruby"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does GPU stand for in computing?",
    correct_answer: "Graphics Processing Unit",
    incorrect_answers: [
      "General Purpose Unit",
      "Graphical Performance Unit",
      "Geometrical Processing Unit"
    ]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In computing, what is the smallest unit of data?",
    correct_answer: "Bit",
    incorrect_answers: ["Byte", "Nibble", "Kilobyte"]
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The C programming language was developed by Dennis Ritchie.",
    correct_answer: "True",
    incorrect_answers: ["False"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which of these is a popular web browser?",
    correct_answer: "Firefox",
    incorrect_answers: ["Linux", "MySQL", "C++"]
  }
];
    

//dati
  let questions = shuffling();
  let currentQuestionIndex = 0; // Per tenere traccia della domanda attuale
  let flagNumScelte ;
  let registro = []; // per racciare le risposte sbagliate e corrette
  let verifica; //bool da aggiungere a verifica in caso di risposta giusta o errata
  let esito = "";
  let btn = document.getElementById("conferma");
  let timerInterval;

//funzioni

function startTimer(tempoIniziale) {
  let tempo = tempoIniziale-1; // Imposta il tempo per ogni domanda 
  const countdown = document.getElementById("timer");

  // Cancella il vecchio timer se esiste (utile quando si passa alla nuova domanda)
  clearInterval(timerInterval);

  // Avvia il nuovo timer
  timerInterval = setInterval(function () {
    countdown.textContent = tempo;
    tempo--;
    
    const percentualeTempo = (tempo / tempoIniziale) * 100;
    const cerchioDiv = document.querySelector('.cerchio');
    // Aggiorna il conic-gradient per il timer
    cerchioDiv.style.background = `conic-gradient(
      rgba(255, 255, 255, 0.1) ${percentualeTempo}%, 
      #00ffff ${percentualeTempo}% 100% 
    )`;

    if (tempo < 0) {
      clearInterval(timerInterval); // Ferma il timer
      passaAllaProssimaDomanda(); // Passa automaticamente alla prossima domanda
    }
  }, 1000);
}

function passaAllaProssimaDomanda() {
    verificaRisposta(); // Prima verifica la risposta attuale
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      creaDomande(); 
    } else {
      clearInterval(timerInterval);
      mostraFineQuiz();
    }
}

function creaDomande() {
  let tempoDomanda = 0;
  const currentQuestion = questions[currentQuestionIndex];

  if (currentQuestion.type === "boolean") {
    tempoDomanda = 30;
  } else {
    tempoDomanda = 60;
  }

  startTimer(tempoDomanda); 

  const domandaDiv = document.getElementById("domanda");
  const risposte = document.getElementById("risposte");
  
  domandaDiv.textContent = ""; // Reset del contenuto della domanda

  // Mostra il numero della domanda corrente
  const numDomanda = document.getElementById("numDomanda");
  numDomanda.innerHTML = `<strong>QUESTION ${currentQuestionIndex + 1}<span style="color:#d936eb"> / ${questions.length}</span></strong>`;

  /* const currentQuestion = questions[currentQuestionIndex]; */

  // mando la domanda a video
  const questionText = document.createElement("h2");
  questionText.textContent = currentQuestion.question;
  domandaDiv.appendChild(questionText);

  // unisco le risposte giuste e sbagliate
  let selezioni = currentQuestion.incorrect_answers.concat(currentQuestion.correct_answer);

  // prendo tutti i checkbox e le label
  const casellelab = risposte.getElementsByClassName("label");
  const checkboxes = document.getElementsByClassName("myCheckbox");

  // reset checkbox
  for (let checkbox of checkboxes) {
      checkbox.checked = false;
      checkbox = false;
  }

  // Gestione del numero di checkbox in base al tipo di domanda
  if (currentQuestion.type === "boolean") {
      // Domanda boolean mostra solo 2 opzioni con la classe vis che nasconde la label e il check
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
              // marta: Aggiungi un event listener per fare in modo che solo un checkbox sia selezionato alla volta
              checkboxes[i].addEventListener("click", function () {
                // Deseleziona tutti gli altri checkbox
                for (let j = 0; j < checkboxes.length; j++) {
                    if (checkboxes[j] !== this) {
                        checkboxes[j].checked = false;
                    }
                }
            })
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

  // Trova il checkbox selezionato e prendi valore
  for (let checkbox of checkboxes) {
      if (checkbox.checked) {
          selectedValue = checkbox.value; 
          break; 
      }
  }

  if (selectedValue !== null) {
      const currentQuestion = questions[currentQuestionIndex]; // Domanda attuale
      const correctAnswer = currentQuestion.correct_answer; // Risposta corretta

      // Confronta la risposta selezionata con la risposta corretta
      if (selectedValue === correctAnswer) {
          verifica = true;
      } else {
          verifica = false;
      }
  } else {
      verifica = false;
      creaDomande();
  }

  registro[currentQuestionIndex] = verifica; // Registra il risultato della risposta
  console.log(registro);
}

function mostraFineQuiz() {

  const clocks = document.querySelector(".cerchiovuoto");
  clocks.innerHTML = "";

  const clock = document.querySelector(".cerchio");
  clock.style.display = "none";

  const butn = document.querySelector(".conferma");
  butn.innerHTML = "";

  const risposte = document.getElementById("risposte");
  risposte.innerHTML = ""; 

  const domandaDiv = document.getElementById("domanda");
  domandaDiv.innerHTML = "<span style='font-size:60px; text-align:center'> <b> Benchmark Completed ! </b> </span>";

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
  let voto = (giuste/registro.length)*100;

  let percentualeGiuste = (giuste / questions.length) * 100;

  // Rendi visibile il grafico e imposta le dimensioni
  const graficoDiv = document.querySelector(".grafico");
  graficoDiv.style.position = "relative"; 
  graficoDiv.style.display = "block";
  graficoDiv.style.width = "250px"; 
  graficoDiv.style.height = "250px";  
  graficoDiv.style.background = `conic-gradient(
    green 0% ${percentualeGiuste}%, 
    red ${percentualeGiuste}% 100%
)`;
//qui setto l'interno del grafico
  const graficoDiv1 = document.querySelector(".graficovuoto");
  graficoDiv1.style.position = "absolute";
  graficoDiv1.style.display = "block";
  graficoDiv1.style.width = "210px";
  graficoDiv1.style.height = "210px";
  graficoDiv1.style.display = "flex";
  graficoDiv1.style.justifyContent = "center";
  graficoDiv1.style.alignItems = "center";
  graficoDiv1.style.flexDirection = "column";   
  graficoDiv1.innerHTML ="<span style='font-size:22px'>Correct answers: " + "<span style='color:green'>" + giuste +"</span>"+"</span>"+ "<br>" +
  "<span style='font-size:22px'>Wrong answers: " + "<span style='color:red'>"+ sbagliate + "</span>"+"</span>";

  let span = document.createElement("span");
  let votoFin = document.createElement("span");

  if(giuste >= questions.length*0.6){
      span.innerHTML = "<span style='color:green; font-size:50px'> Well done, congrats! </span>"
      let certificato = document.querySelector(".certificato");
      certificato.style.display = "block";
  } else{
      span.innerHTML = "<span style='color:red; font-size:50px'> Better luck next time! </span>"
  }
  votoFin.innerHTML = "<span style='font-size:50px'>Your score is: " + voto +"</span>";

  MostraRis.appendChild(span); 
  MostraRis.appendChild(votoFin);

  let divDom = document.querySelector("#listaDomande");

  for (let i = 0;i<registro.length;i++){
      let li = document.createElement("li");
      if(registro[i] === true){
          li.innerHTML = `<p><b>Domanda: </b><span>${questions[i].question}</span> <br><br> <b>Correct Answer: </b> ${questions[i].correct_answer} ` ;
          li.classList.add("liok");
      }else{
          li.innerHTML = `<p><b>Domanda: </b><span>${questions[i].question}</span> <br><br> <b>Correct Answer: </b> ${questions[i].correct_answer} ` ;
          li.classList.add("lino");
      }
      divDom.appendChild(li);
  }

  const numDomanda = document.getElementById("numDomanda");
  numDomanda.innerHTML = "";
}

btn.addEventListener('click', () => {
  passaAllaProssimaDomanda();
});

// Carica la prima domanda quando la pagina è pronta perche o seno mi esce vuoto
window.onload = function() {
  creaDomande(); 
};

//chiudo la prima pagina e vado al quiz
function vaiAquiz() {
  let scelta = document.querySelector("#checkbox");
  if(scelta.checked){
    window.location.href = "test.html";
  } else {
    alert("You have not given consent to continue! You cannot proceed to the quiz!");
  }  
}

//mischia domande in array e ritorna un array di 10 domande
function shuffling(){
  //funzione di fisher yates per mescolare array
  for (let i = questions1.length - 1; i > 0; i--) {
    // j è un indice casuale che va da 0 fino a i per ogni i del ciclo for per restituire un elemento random non ancora selezionato
    const j = Math.floor(Math.random() * (i + 1));
    //qui esegup uno scambio di variabili con una variabile temporanea
    let VarTemp = questions1[i];
    questions1[i] = questions1[j];
    questions1[j] = VarTemp;
}

// Restituisco i primi 10 elementi mescolati
return questions1.slice(0, 10);
}

function goToPage() {
  let consenso = confirm("The quiz will be canceled!, do you want to proceed anyway?")
  if(consenso){
    window.location.href = 'index.html';
  }else{
    return;
  }
  
}