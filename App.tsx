import React, { useState } from 'react';
import AudioPlayer from './components/AudioPlayer';
import Quiz from './components/Quiz';
import { PODCAST_TITLE, PODCAST_TEXT, INSTRUCTIONS } from './constants';
import { SpeakerIcon } from './components/icons';

// A helper component to render text with bold tags
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
    return (
        <>
            {text.split('**').map((part, index) =>
                index % 2 === 1 ? <strong key={index}>{part}</strong> : <span key={index}>{part}</span>
            )}
        </>
    );
};

const App: React.FC = () => {
    const [quizStarted, setQuizStarted] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <header className="bg-teal-700 shadow-lg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">{PODCAST_TITLE}</h1>
                    <p className="text-teal-200 mt-1">Un quiz interactif pour tester vos connaissances</p>
                </div>
            </header>
            
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-8">
                             <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-2xl font-bold text-slate-800 mb-4">Le texte à écouter</h2>
                                 <AudioPlayer />
                                <div className="mt-4 prose prose-slate max-w-none text-sm text-slate-600 max-h-48 overflow-y-auto">
                                   {PODCAST_TEXT.split('\n\n').map((paragraph, index) => (
                                       <p key={index}><FormattedText text={paragraph} /></p>
                                   ))}
                                </div>
                            </div>
                        </div>

                         <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Instructions pour l'élève</h2>
                            <ul className="space-y-3">
                                {INSTRUCTIONS.map((instruction, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3 mt-1">
                                            {index + 1}
                                        </div>
                                        <span className="text-slate-600">{instruction}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        {!quizStarted && (
                            <button
                                onClick={() => setQuizStarted(true)}
                                className="bg-rose-500 text-white font-bold text-lg py-4 px-10 rounded-full shadow-xl hover:bg-rose-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-rose-300"
                            >
                                Commencer le Quiz !
                            </button>
                        )}
                    </div>

                    {quizStarted && (
                        <div className="mt-10">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Le Quiz d'exercices</h2>
                                <p className="text-slate-500 mt-2">Répondez aux questions ci-dessous.</p>
                            </div>
                            <Quiz />
                        </div>
                    )}

                </div>
            </main>

            <footer className="bg-slate-800 text-slate-400 mt-12 py-6 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Dinosaur Podcast Quiz. Créé avec passion.</p>
            </footer>
        </div>
    );
};

export default App;
