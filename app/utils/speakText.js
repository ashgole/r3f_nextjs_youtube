export const speakText = (text) => {
    // Use the SpeechSynthesis API to convert text to speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set the language for the speech
    utterance.pitch = 1; // Optional: Set pitch (1 is the default)
    utterance.rate = 1; // Optional: Set rate of speech (1 is normal speed)

    // Speak the text
    speechSynthesis.speak(utterance);
};