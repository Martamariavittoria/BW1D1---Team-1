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
let flagNumScelte;
let registro = []; // per racciare le risposte sbagliate e corrette
let verifica; //bool da aggiungere a verifica in caso di risposta giusta o errata
let esito = "";
let timerInterval; // Variabile globale per il timer
let btn = document.getElementById("conferma"); //pulsante di conferma

//funzioni

function startTimer() {
    let tempo = 10; // Imposta il tempo per ogni domanda 
    const countdown = document.getElementById("timer"); //visualizzo il conto alla rovescia su html 

    // Cancella il vecchio timer se esiste (utile quando si passa alla nuova domanda)
    clearInterval(timerInterval);

    // Avvia il nuovo timer
    timerInterval = setInterval(function () {
        countdown.textContent = tempo;// aggiorna il testo del timer sullo schermo
        tempo--; //-1 al tempo

        //quanto tempo rimane? 
        const percentualeTempo = (tempo / 10) * 100;
        const cerchioDiv = document.querySelector('.cerchio');

        //aggiorna il cerchio del timer con un gradiente in base al tempo rimanente
        cerchioDiv.style.background = 'conic-gradient(' +
            '#00ffff ' + percentualeTempo + '%, ' +
            'rgba(255, 255, 255, 0.1) ' + percentualeTempo + '% 100%' +
            ')';

        /*   cerchioDiv.style.background = `conic-gradient(
            rgba(255, 255, 255, 0.1) ${percentualeTempo}%, 
            #00ffff ${percentualeTempo}% 100% 
          )`;  */


        //se scade il tempo passa alla domanda successiva:
        if (tempo < 0) {
            clearInterval(timerInterval); // Ferma il timer
            passaAllaProssimaDomanda(); // Passa automaticamente alla prossima domanda
        }
    }, 1000); //intervallo di 1s (1000ms)
}

//Funzione per passare alla domanda successiva
function passaAllaProssimaDomanda() {
    verificaRisposta(); // Prima verifica la risposta attuale
    currentQuestionIndex++; //incremente l'indice della domanda

    //se ci sono ancora domande (< question.lenght), vai alla prossima e fai ripartire il timer
    if (currentQuestionIndex < questions.length) {
        creaDomande(); // Carica la prossima domanda
        startTimer(); // Riparte il timer per la nuova domanda
    } else {
        clearInterval(timerInterval); //se non ci sono più domande ferma il timer
        mostraFineQuiz(); //mostra la pagina della fine del quiz
    }
}


//funzione per creare la domanda e visualizzarla
/* function creaDomande() {

    startTimer(); //avvia il timer per la nuova domanda

    const domandaDiv = document.getElementById("domanda"); //prendi il contenitore della domanda
    const risposte = document.getElementById("risposte"); //prendi il contenitore della risposta

    domandaDiv.textContent = ""; // Reset del contenuto della domanda

    // Mostra il numero della domanda corrente
    const numDomanda = document.getElementById("numDomanda");
    numDomanda.innerHTML = `<strong>QUESTION ${currentQuestionIndex + 1}<span style="color:#d936eb"> / ${questions.length}</span></strong>`;

    const currentQuestion = questions[currentQuestionIndex]; //prendi lìoggetto della domanda corrente

    // Imposta e crea la domanda in HTML
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
        checkbox = false;
    }

    // Gestione del numero di checkbox in base al tipo di domanda
    if (currentQuestion.type === "boolean") {
        // Domanda boolean: mostra solo 2 opzioni
        for (let i = 0; i < casellelab.length; i++) {
            if (i < 2) {
                // Mostra solo i primi due checkbox e label
                casellelab[i].classList.remove("vis"); //mostra label
                casellelab[i].textContent = selezioni[i]; //imposta il testo della risposta
                checkboxes[i].classList.remove("vis");//mostra il checkbox
                checkboxes[i].value = selezioni[i];//imposta il valore della risposra
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
                casellelab[i].textContent = selezioni[i]; //testo risposta
                casellelab[i].classList.remove("vis"); //label
                checkboxes[i].classList.remove("vis"); //checkbox
                checkboxes[i].value = selezioni[i]; //valore della risposa
            } 
            
            
            else {
                // Nascondi i checkbox e label in eccesso
                casellelab[i].classList.add("vis");
                checkboxes[i].classList.add("vis");
            }
        }
    }
} */



function creaDomande() {
    startTimer(); // Avvia il timer per la nuova domanda

    const domandaDiv = document.getElementById("domanda"); // Contenitore della domanda
    const risposte = document.getElementById("risposte"); // Contenitore delle risposte

    domandaDiv.textContent = ""; // Reset del contenuto della domanda

    // Mostra il numero della domanda corrente
    const numDomanda = document.getElementById("numDomanda");
    numDomanda.innerHTML = `<strong>QUESTION ${currentQuestionIndex + 1}<span style="color:#d936eb"> / ${questions.length}</span></strong>`;

    const currentQuestion = questions[currentQuestionIndex]; // Ottieni l'oggetto della domanda corrente

    // Imposta e crea la domanda in HTML
    const questionText = document.createElement("h2");
    questionText.textContent = currentQuestion.question;
    domandaDiv.appendChild(questionText);

    // Combina le risposte corrette e sbagliate
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
                casellelab[i].classList.remove("vis"); // Mostra la label
                casellelab[i].textContent = selezioni[i]; // Imposta il testo della risposta
                checkboxes[i].classList.remove("vis"); // Mostra il checkbox
                checkboxes[i].value = selezioni[i]; // Imposta il valore della risposta
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
                casellelab[i].textContent = selezioni[i]; // Testo risposta
                casellelab[i].classList.remove("vis"); // Mostra la label
                checkboxes[i].classList.remove("vis"); // Mostra il checkbox
                checkboxes[i].value = selezioni[i]; // Imposta il valore della risposta

                // Aggiungi un event listener per fare in modo che solo un checkbox sia selezionato alla volta
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


    //funzione per verificare la risposta selezionata dall'utente
    function verificaRisposta() {
        const checkboxes = document.getElementsByClassName("myCheckbox"); //prendi tutti i checkbox
        let selectedValue = null;

        // Trova il checkbox selezionato
        for (let checkbox of checkboxes) {
            if (checkbox.checked) {
                selectedValue = checkbox.value; // Ottieni il valore del checkbox selezionato
                break; // Ferma il ciclo una volta trovato
            }
        }

        // se l'utente seleziona una risposta
        if (selectedValue !== null) {
            const currentQuestion = questions[currentQuestionIndex]; // Domanda corrente
            const correctAnswer = currentQuestion.correct_answer; // Risposta corretta

            // Verifica senla risposta selezionata è corretta
            if (selectedValue === correctAnswer) {
                verifica = true; //corretta
            } else {
                verifica = false; //sbagliata
            }
        } else {
            verifica = false; //se utente non seleziona risposta -> risposta sbagliata
            creaDomande(); //richiamo la funzione per ricreare la domanda nuova
        }

        registro[currentQuestionIndex] = verifica; // Registra il risultato della risposta
        console.log(registro);
    }


    //funzione per mostrare il risultato finale una volta terminato il quiz
    function mostraFineQuiz() {

        //nascondi gli elementi che non ci servono nell'ultima schermata
        const clocks = document.querySelector(".cerchiovuoto");
        clocks.innerHTML = "";

        const clock = document.querySelector(".cerchio");
        clock.style.display = "none";

        const butn = document.querySelector(".conferma");
        butn.innerHTML = "";

        const risposte = document.getElementById("risposte");
        risposte.innerHTML = "";

        const domandaDiv = document.getElementById("domanda");
        domandaDiv.innerHTML = "<span style='font-size:60px; text-align:center'> <b> Quiz Completato! </b> </span>";

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
        let voto = (giuste / registro.length) * 100; //calcola il voto in percentuale

        let percentualeGiuste = (giuste / questions.length) * 100; //percentuale risposte giuste

        // Rendi visibile il grafico e imposta le dimensioni
        const graficoDiv = document.querySelector(".grafico");
        graficoDiv.style.position = "relative";
        graficoDiv.style.display = "block";
        graficoDiv.style.width = "200px";
        graficoDiv.style.height = "200px";
        graficoDiv.style.background = `conic-gradient(
  green 0% ${percentualeGiuste}%, 
  red ${percentualeGiuste}% 100%
  )`;

        const graficoDiv1 = document.querySelector(".graficovuoto");
        graficoDiv1.style.position = "absolute";
        graficoDiv1.style.display = "block";
        graficoDiv1.style.width = "180px";
        graficoDiv1.style.height = "180px";
        graficoDiv1.style.display = "flex";
        graficoDiv1.style.justifyContent = "center";
        graficoDiv1.style.alignItems = "center";
        graficoDiv1.style.flexDirection = "column";
        graficoDiv1.innerHTML = "Risposte corrette: " + "<span style='color:green'>" + giuste + "</span>" + "<br>" +
            "Risposte sbagliate: " + "<span style='color:red'>" + sbagliate + "<br>";

        let span = document.createElement("span");
        let votoFin = document.createElement("span");

        //mostra il risultato  in base al punteggio del quiz (passato o no)
        if (giuste >= 6) {
            span.innerHTML = "<span style='color:green; font-size:50px'> Test superato </span>"
        } else {
            span.innerHTML = "<span style='color:red; font-size:50px'> Test non superato </span>"
        }
        votoFin.innerHTML = "<span style='font-size:50px'>il tuo punteggio è di:" + voto + "</span>";

        MostraRis.appendChild(span);
        MostraRis.appendChild(votoFin);


        //mostra all'utente la lista con le domande giuste e quelle sbagliate 
        let divDom = document.querySelector("#listaDomande");

        for (let i = 0; i < registro.length; i++) {
            let li = document.createElement("li");
            if (registro[i] === true) {
                li.innerHTML = `<p><b>Domanda: </b><span>${questions[i].question}</span> <br><br> <b>Risposta esatta: </b> ${questions[i].correct_answer} `;
                li.classList.add("liok"); //classe per le risposte corrette
            } else {
                li.innerHTML = `<p><b>Domanda: </b><span>${questions[i].question}</span> <br><br> <b>Risposta esatta: </b> ${questions[i].correct_answer} `;
                li.classList.add("lino"); //classe per le risposte sbagliate
            }
            divDom.appendChild(li);
        }


        const numDomanda = document.getElementById("numDomanda");
        numDomanda.innerHTML = "";
    }

    //listener per passare alla prossima domanda
    btn.addEventListener('click', () => {
        passaAllaProssimaDomanda();
    });

    // Carica la prima domanda quando la pagina è pronta perche senno esce vuoto
    window.onload = function () {
        creaDomande();
    };

    //chiudo la prima pagina e vado al quiz
    function vaiAdUnAltraPagina() {
        window.location.href = "test.html";
    }





