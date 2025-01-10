import wordlist from 'word-list-json';

export const checkWord = (req, res) => {
  try {
    const word = "SUPER";
    const attempt = req.body;
    let correctLetters = 0;

    const stringAttempt = attempt.join("").toLowerCase();
    console.log(stringAttempt);
    

    if (!wordlist.includes(stringAttempt)) {
        return res.status(400).json({error: "This word doesn't exist."});
    }

    const result = [];
    for (let i = 0; i < attempt.length; i++) {
      let letter = {
        content: attempt[i],
        place: i === word.indexOf(attempt[i]),
        exists: word.includes(attempt[i]),
      };
      result.push(letter);

      if (i === word.indexOf(attempt[i])) {
        correctLetters++;
      }
    }

    return res.status(200).json({result, correctLetters});
  } catch (error) {
    return res.status(500).json({error: "There was a server error."});
  }
};
