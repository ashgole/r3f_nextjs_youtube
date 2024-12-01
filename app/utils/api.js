export const sendMessageM = async (input) => {
    const response = await fetch('http://localhost:3000/api/chat/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
    });
    return response
};