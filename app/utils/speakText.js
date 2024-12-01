export const speakText = (answer, setIsTalking) => {
    // Stop any ongoing speech before speaking the new answer
    speechSynthesis.cancel();

    // Create a new SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(answer);
    utterance.lang = 'en-US'; // Set the language for the speech
    utterance.pitch = 1; // Optional: Set pitch (1 is the default)
    utterance.rate = 1; // Optional: Set rate of speech (1 is normal speed)

    // Set isTalking to true when speech starts
    setIsTalking(true);

    // Set isTalking to false when speech ends
    utterance.onend = () => {
        setIsTalking(false);
    };

    // Speak the answer
    speechSynthesis.speak(utterance);
};
