// Script de réparation avec génération d’un rapport en format .txt

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const errorList = [
  '1. Vérification incorrecte de "a" (faux négatif si a = 0)',
  '2. Mauvaise gestion de b === 0 (le test n\'est pas nécessaire)',
  '3. Erreur d\'opération (a - b au lieu de a + b)'
];

const errorExplanation = `
Erreurs détectées dans sum.js :
${errorList.join('\n')}
Souhaitez-vous appliquer les correctifs ? (y/n) : `;

function generateTxtReport({ accepted, message }) {
  const now = new Date();
  const reportText = [
    `===== RAPPORT DE RÉPARATION =====`,
    `Date : ${now.toLocaleString()}`,
    ``,
    `Erreurs détectées :`,
    ...errorList,
    ``,
    `Correction appliquée : ${accepted ? "OUI" : "NON"}`,
    ``,
    `Résumé :`,
    message,
    ``,
    `=================================`
  ].join('\n');

  fs.writeFileSync('repair-report.txt', reportText);
  console.log('\n📝 Rapport généré : repair-report.txt');
}

function repair() {
  rl.question(errorExplanation, function (answer) {
    const accepted = answer.trim().toLowerCase() === 'y';

    let message = '';

    if (accepted) {
      const fixedCode = `
// ✅ Version réparée
function sum(a, b) {
  return a + b;
}

module.exports = sum;
`;
      fs.writeFileSync('sum.js', fixedCode);
      message = "Les erreurs ont été corrigées automatiquement. La fonction sum utilise maintenant 'a + b'.";
      console.log('\n✅ Corrections appliquées. Vous pouvez relancer les tests avec: npm test');
    } else {
      message = "L'utilisateur a refusé les corrections. Le code contient toujours les erreurs.";
      console.log('\n❌ Corrections annulées. Les erreurs persistent.');
    }

    generateTxtReport({ accepted, message });
    rl.close();
  });
}

repair();
