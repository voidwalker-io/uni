'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const settingsForm = document.getElementById('settings-form');
  const questionCountInput = document.getElementById('question-count');
  const poolInfo = document.getElementById('pool-info');

  const quizSection = document.getElementById('quiz-section');
  const quizContainer = document.getElementById('quiz-container');
  const quizProgress = document.getElementById('quiz-progress');
  const evaluateBtn = document.getElementById('evaluate-btn');
  const quizHint = document.getElementById('quiz-hint');

  const resultsSection = document.getElementById('results-section');
  const resultsSummary = document.getElementById('results-summary');
  const resultsTableContainer = document.getElementById('results-table-container');

  let allQuestions = [];
  let currentQuizQuestions = [];

  // Notenskala (Anteil richtiger Punkte)
  const gradeScale = [
    { min: 0.88, label: '1 – Sehr gut' },
    { min: 0.8,  label: '2 – Gut' },
    { min: 0.7,  label: '3 – Befriedigend' },
    { min: 0.6,  label: '4 – Genügend' },
    { min: 0,    label: '5 – Nicht genügend' }
  ];

  // Fragen aus Backend laden
  fetch('/api/questions')
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data)) {
        throw new Error('questions.json muss ein Array sein.');
      }
      allQuestions = data;
      poolInfo.textContent = `Fragen im Pool: ${allQuestions.length}`;
      if (allQuestions.length > 0) {
        questionCountInput.value = Math.min(20, allQuestions.length);
        questionCountInput.max = allQuestions.length;
      }
    })
    .catch((err) => {
      console.error(err);
      poolInfo.textContent =
        'Fehler beim Laden des Fragenpools. Prüfe questions.json.';
    });

  // Hilfsfunktionen
  function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function getGrade(correctPoints, totalPoints) {
    if (totalPoints === 0) return { label: '-', fraction: 0 };
    const fraction = correctPoints / totalPoints;
    const grade = gradeScale.find((g) => fraction >= g.min) || gradeScale.at(-1);
    return { label: grade.label, fraction };
  }

  function updateProgress() {
    if (!currentQuizQuestions.length) {
      quizProgress.textContent = '0 / 0 beantwortet';
      return;
    }
    const answered = currentQuizQuestions.filter((q) => {
      const radios = document.querySelectorAll(
        `input[name="q-${q._index}"]`
      );
      return Array.from(radios).some((r) => r.checked);
    }).length;
    quizProgress.textContent = `${answered} / ${currentQuizQuestions.length} beantwortet`;
  }

  function renderQuiz(questions) {
    quizContainer.innerHTML = '';
    currentQuizQuestions = questions.map((q, idx) => ({
      ...q,
      _index: idx
    }));

    currentQuizQuestions.forEach((q, idx) => {
      const card = document.createElement('article');
      card.className = 'question-card';
      card.dataset.index = String(idx);

      const header = document.createElement('div');
      header.className = 'question-header';

      const labelSpan = document.createElement('span');
      labelSpan.className = 'question-label';
      labelSpan.textContent = `Frage ${idx + 1}`;

      const metaSpan = document.createElement('span');
      metaSpan.className = 'question-meta';
      const tags = [];
      if (q.topic) tags.push(q.topic);
      if (q.source) tags.push(q.source);
      metaSpan.textContent = tags.join(' · ');

      header.appendChild(labelSpan);
      header.appendChild(metaSpan);

      const textP = document.createElement('p');
      textP.className = 'question-text';
      textP.textContent = q.statement;

      const optionsDiv = document.createElement('div');
      optionsDiv.className = 'question-options';

      const trueId = `q-${idx}-true`;
      const falseId = `q-${idx}-false`;

      const trueLabel = document.createElement('label');
      trueLabel.className = 'option-pill';
      trueLabel.htmlFor = trueId;
      trueLabel.innerHTML = `
        <input type="radio" id="${trueId}" name="q-${idx}" value="true" />
        <span>Wahr</span>
      `;

      const falseLabel = document.createElement('label');
      falseLabel.className = 'option-pill';
      falseLabel.htmlFor = falseId;
      falseLabel.innerHTML = `
        <input type="radio" id="${falseId}" name="q-${idx}" value="false" />
        <span>Falsch</span>
      `;

      optionsDiv.appendChild(trueLabel);
      optionsDiv.appendChild(falseLabel);

      const explanationDiv = document.createElement('div');
      explanationDiv.className = 'explanation hidden';
      explanationDiv.innerHTML = `
        <div class="explanation-title">Erläuterung</div>
        <div class="explanation-text">
          ${q.explanation || 'Keine Erklärung hinterlegt.'}
        </div>
      `;

      card.appendChild(header);
      card.appendChild(textP);
      card.appendChild(optionsDiv);
      card.appendChild(explanationDiv);

      quizContainer.appendChild(card);
    });

    quizSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    updateProgress();
  }

  function allQuestionsAnswered() {
    let allAnswered = true;
    currentQuizQuestions.forEach((q) => {
      const radios = document.querySelectorAll(`input[name="q-${q._index}"]`);
      const answered = Array.from(radios).some((r) => r.checked);
      const cardEl = document.querySelector(
        `.question-card[data-index="${q._index}"]`
      );
      if (!answered) {
        allAnswered = false;
        if (cardEl) {
          cardEl.classList.add('unanswered');
        }
      } else if (cardEl) {
        cardEl.classList.remove('unanswered');
      }
    });
    return allAnswered;
  }

  function evaluateQuiz() {
    if (!currentQuizQuestions.length) return;

    if (!allQuestionsAnswered()) {
      quizHint.textContent =
        'Bitte beantworte alle Fragen (Wahr/Falsch), bevor du auswertest.';
      quizHint.style.color = '#ef4444';
      return;
    } else {
      quizHint.textContent =
        'Die Auswertung wurde durchgeführt. Scrolle herunter, um die Details zu sehen.';
      quizHint.style.color = '#6b7280';
    }

    let totalPoints = 0;
    let achievedPoints = 0;

    const rows = currentQuizQuestions.map((q) => {
      const radios = document.querySelectorAll(`input[name="q-${q._index}"]`);
      const selected = Array.from(radios).find((r) => r.checked);
      const userAnswer = selected ? selected.value === 'true' : null;
      const correctAnswer = Boolean(q.correctAnswer);

      const points = typeof q.points === 'number' ? q.points : 1;
      totalPoints += points;

      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) {
        achievedPoints += points;
      }

      const cardEl = document.querySelector(
        `.question-card[data-index="${q._index}"]`
      );
      if (cardEl) {
        cardEl.classList.remove('unanswered');
        cardEl.classList.add(isCorrect ? 'correct' : 'incorrect');

        const explanationDiv = cardEl.querySelector('.explanation');
        if (explanationDiv) {
          explanationDiv.classList.remove('hidden');
        }
      }

      return {
        q,
        userAnswer,
        correctAnswer,
        points,
        isCorrect
      };
    });

    const grade = getGrade(achievedPoints, totalPoints);
    const percent = totalPoints > 0 ? (achievedPoints / totalPoints) * 100 : 0;

    resultsSummary.innerHTML = `
      <div><strong>Punkte:</strong> ${achievedPoints} / ${totalPoints}</div>
      <div><strong>Quote:</strong> ${percent.toFixed(1)} %</div>
      <div class="grade">
        <strong>Note:</strong>
        <span class="grade-pill">${grade.label}</span>
      </div>
    `;

    const table = document.createElement('table');
    table.className = 'results-table';
    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>#</th>
        <th>Aussage</th>
        <th>Deine Antwort</th>
        <th>Richtige Antwort</th>
        <th>Punkte</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    rows.forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.className = row.isCorrect ? 'correct-row' : 'incorrect-row';

      const userLabel =
        row.userAnswer === null
          ? '—'
          : row.userAnswer
          ? 'Wahr'
          : 'Falsch';
      const correctLabel = row.correctAnswer ? 'Wahr' : 'Falsch';

      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${row.q.statement}</td>
        <td>${userLabel}</td>
        <td>${correctLabel}</td>
        <td class="points-cell">${row.isCorrect ? row.points : 0}</td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);

    resultsTableContainer.innerHTML = '';
    resultsTableContainer.appendChild(table);
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  }

  // Events

  settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!allQuestions.length) return;

    let requested = parseInt(questionCountInput.value, 10);
    if (Number.isNaN(requested) || requested <= 0) {
      requested = Math.min(10, allQuestions.length);
    }
    if (requested > allQuestions.length) {
      requested = allQuestions.length;
    }

    const picked = shuffleArray(allQuestions).slice(0, requested);
    renderQuiz(picked);
  });

  quizContainer.addEventListener('change', (event) => {
    if (!event.target.matches('input[type="radio"]')) return;
    const cardEl = event.target.closest('.question-card');
    if (cardEl) {
      cardEl.classList.remove('unanswered');
    }
    updateProgress();
  });

  evaluateBtn.addEventListener('click', () => {
    evaluateQuiz();
  });
});

