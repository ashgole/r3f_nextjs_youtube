'use client';
import { sendMessageM } from '@/app/utils/api';
import { loadingAtom, questionAtom, talkingAtom } from '@/app/utils/jotai';
import { speakText } from '@/app/utils/speakText';
import { useAtom } from 'jotai';
import React from 'react';

const UI = () => {
    const [question, setQuestion] = useAtom(questionAtom)
    const [loading, setLoading] = useAtom(loadingAtom)
    const [isTalking, setIsTalking] = useAtom(talkingAtom)

    const sendMessage = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const response = await sendMessageM(question);
            const data = await response.json();
            if (response.ok) {
                speakText(data.reply,setIsTalking);
                setQuestion('')
                setLoading(false)
            } else {
                speakText('there is error , I am reading that error',data.error);
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error communicating with API:', error);
        }
        finally {

        }
    }
    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen z-0">
            <div className="bg-white fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10 w-96 max-w-md">
                <form onSubmit={sendMessage} className="flex items-center bg-white bg-opacity-90 shadow-md p-4 rounded-lg">
                    <input
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        type="text"
                        placeholder="Type your message..."
                        className="flex-grow text-black border border-gray-300 rounded-md p-2 mr-2"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md disabled:bg-gray-300"
                        disabled={loading}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UI;
