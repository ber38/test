
import React, { useState, useCallback } from 'react';
import { QUIZ_DATA } from '../constants';
import { Question, QuestionType, AnswerState } from '../types';
import { CheckIcon, XIcon } from './icons';

const Quiz: React.FC = () => {
    const [answers, setAnswers] = useState<AnswerState>({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);

    const handleAnswerChange = useCallback((questionId: string, answer: any) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    }, []);

    const handleSubmit = () => {
        let currentScore = 0;
        let maximumScore = 0;

        QUIZ_DATA.forEach(q => {
            maximumScore += q.points;
            const userAnswer = answers[q.id];
            if (userAnswer === undefined || userAnswer === null) return;
            
            let isCorrect = false;
            switch (q.type) {
                case QuestionType.SINGLE_CHOICE:
                    isCorrect = userAnswer === q.correctAnswer;
                    break;
                case QuestionType.TABLE_CHOICE:
                     if (Array.isArray(userAnswer)) {
                        isCorrect = userAnswer.every((ans, index) => ans === q.correctAnswer[index]);
                    }
                    break;
                case QuestionType.TEXT_INPUT:
                    if(Array.isArray(userAnswer) && Array.isArray(q.correctAnswer)) {
                        const sortedUserAnswers = [...userAnswer].map(a => a.toLowerCase().trim()).sort();
                        const sortedCorrectAnswers = [...q.correctAnswer].map(a => a.toLowerCase().trim()).sort();
                        isCorrect = JSON.stringify(sortedUserAnswers) === JSON.stringify(sortedCorrectAnswers);
                    }
                    break;
                case QuestionType.TEXT_INPUT_PAIRS:
                    if (typeof userAnswer === 'object' && userAnswer !== null) {
                        let correctPairs = 0;
                        const expectedPairs = q.numInputs || 0;
                        for (let i = 0; i < expectedPairs; i++) {
                            const name = (userAnswer[`${i}-name`] || '').toLowerCase().trim();
                            const diet = (userAnswer[`${i}-diet`] || '').toLowerCase().trim();
                            if(name && diet && q.correctAnswer[name] === diet) {
                                correctPairs++;
                            }
                        }
                        isCorrect = correctPairs >= expectedPairs;
                    }
                    break;
                case QuestionType.TEXT_AREA:
                    isCorrect = typeof userAnswer === 'string' && userAnswer.toLowerCase().includes(q.correctAnswer.toLowerCase());
                    break;
            }

            if (isCorrect) {
                currentScore += q.points;
            }
        });

        setScore(currentScore);
        setMaxScore(maximumScore);
        setShowResults(true);
        window.scrollTo(0, 0);
    };

    const getResultIcon = (question: Question) => {
        if (!showResults) return null;
        const userAnswer = answers[question.id];
        if (userAnswer === undefined) return <span className="text-sm font-semibold text-slate-500">Non répondu</span>;
        
        // Simplified correctness check for display
        let isCorrect = false;
        switch (question.type) {
            case QuestionType.SINGLE_CHOICE: isCorrect = userAnswer === question.correctAnswer; break;
            case QuestionType.TABLE_CHOICE: isCorrect = Array.isArray(userAnswer) && userAnswer.every((a, i) => a === question.correctAnswer[i]); break;
            case QuestionType.TEXT_INPUT: {
                 const sortedUser = [...(userAnswer || [])].map(a => a.toLowerCase().trim()).sort();
                 const sortedCorrect = [...question.correctAnswer].map(a => a.toLowerCase().trim()).sort();
                 isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);
                 break;
            }
            case QuestionType.TEXT_INPUT_PAIRS: {
                let correctPairs = 0;
                for (let i = 0; i < (question.numInputs || 0); i++) {
                    const name = (userAnswer[`${i}-name`] || '').toLowerCase().trim();
                    const diet = (userAnswer[`${i}-diet`] || '').toLowerCase().trim();
                    if(name && diet && question.correctAnswer[name] === diet) correctPairs++;
                }
                isCorrect = correctPairs >= (question.numInputs || 0);
                break;
            }
            case QuestionType.TEXT_AREA: isCorrect = typeof userAnswer === 'string' && userAnswer.toLowerCase().includes(question.correctAnswer.toLowerCase()); break;
            default: isCorrect = false;
        }

        return isCorrect ? <CheckIcon className="w-6 h-6 text-green-500" /> : <XIcon className="w-6 h-6 text-red-500" />;
    };
    
    const renderQuestion = (question: Question, index: number) => {
        const userAnswer = answers[question.id];

        const baseInputClasses = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500";
        const disabledClasses = "disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none";

        return (
            <div key={question.id} className="bg-white p-6 rounded-lg shadow-md mb-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">{`QUESTION ${index + 1}`}</h3>
                    {getResultIcon(question)}
                </div>
                <p className="text-slate-600 mb-4">{question.questionText}</p>
                
                { question.type === QuestionType.SINGLE_CHOICE && question.options && (
                    <div className="space-y-3">
                        {question.options.map(option => {
                            const isChecked = userAnswer === option;
                            const isCorrect = option === question.correctAnswer;
                            let ringClass = '';
                            if (showResults) {
                                if (isChecked && isCorrect) ringClass = 'ring-2 ring-green-500';
                                else if (isChecked && !isCorrect) ringClass = 'ring-2 ring-red-500';
                                else if (!isChecked && isCorrect) ringClass = 'ring-2 ring-green-300';
                            }
                            return (
                                <label key={option} className={`flex items-center p-3 rounded-lg border transition-colors ${isChecked ? 'bg-teal-50 border-teal-200' : 'bg-white border-slate-200'} ${ringClass}`}>
                                    <input
                                        type="radio"
                                        name={question.id}
                                        value={option}
                                        checked={isChecked}
                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                        disabled={showResults}
                                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                                    />
                                    <span className="ml-3 text-sm text-slate-700">{option}</span>
                                </label>
                            );
                        })}
                    </div>
                )}

                { question.type === QuestionType.TABLE_CHOICE && question.table && (
                     <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                           <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"></th>
                                    {question.table.headers.map(header => <th key={header} className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">{header}</th>)}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {question.table.rows.map((row, rowIndex) => {
                                    const rowAnswer = userAnswer ? userAnswer[rowIndex] : null;
                                    return (
                                        <tr key={row.label}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{row.label}</td>
                                            {question.table.headers.map(header => {
                                                const isChecked = rowAnswer === header;
                                                const isCorrect = header === question.correctAnswer[rowIndex];
                                                let cellClass = '';
                                                if (showResults) {
                                                    if (isChecked && isCorrect) cellClass = 'bg-green-100';
                                                    else if (isChecked && !isCorrect) cellClass = 'bg-red-100';
                                                    else if (!isChecked && isCorrect) cellClass = 'bg-green-50';
                                                }
                                                return (
                                                <td key={header} className={`px-6 py-4 text-center ${cellClass}`}>
                                                    <input
                                                        type="radio"
                                                        name={`${question.id}-${rowIndex}`}
                                                        checked={isChecked}
                                                        onChange={() => {
                                                            const newAnswers = [...(userAnswer || [])];
                                                            newAnswers[rowIndex] = header;
                                                            handleAnswerChange(question.id, newAnswers);
                                                        }}
                                                        disabled={showResults}
                                                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300"
                                                    />
                                                </td>
                                            )})}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
                
                { question.type === QuestionType.TEXT_INPUT && (
                    <div className="space-y-3">
                        {Array.from({ length: question.numInputs || 1 }).map((_, i) => (
                             <input
                                key={i}
                                type="text"
                                className={`${baseInputClasses} ${disabledClasses}`}
                                disabled={showResults}
                                value={(userAnswer && userAnswer[i]) || ''}
                                onChange={e => {
                                    const newAnswers = [...(userAnswer || [])];
                                    newAnswers[i] = e.target.value;
                                    handleAnswerChange(question.id, newAnswers);
                                }}
                            />
                        ))}
                    </div>
                )}

                { question.type === QuestionType.TEXT_INPUT_PAIRS && (
                    <div className="space-y-4">
                        {Array.from({ length: question.numInputs || 1 }).map((_, i) => (
                            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                 <input
                                    type="text"
                                    placeholder="Nom du dinosaure"
                                    className={`${baseInputClasses} ${disabledClasses}`}
                                    disabled={showResults}
                                    value={(userAnswer && userAnswer[`${i}-name`]) || ''}
                                    onChange={e => handleAnswerChange(question.id, {...userAnswer, [`${i}-name`]: e.target.value})}
                                />
                                 <input
                                    type="text"
                                    placeholder="Régime (herbivore/carnivore)"
                                    className={`${baseInputClasses} ${disabledClasses}`}
                                    disabled={showResults}
                                    value={(userAnswer && userAnswer[`${i}-diet`]) || ''}
                                    onChange={e => handleAnswerChange(question.id, {...userAnswer, [`${i}-diet`]: e.target.value})}
                                />
                            </div>
                        ))}
                    </div>
                )}

                { question.type === QuestionType.TEXT_AREA && (
                    <textarea
                        rows={3}
                        className={`${baseInputClasses} ${disabledClasses}`}
                        disabled={showResults}
                        value={userAnswer || ''}
                        onChange={e => handleAnswerChange(question.id, e.target.value)}
                    />
                )}
            </div>
        );
    };

    return (
        <div className="mt-8">
            {showResults && (
                <div className="bg-teal-50 border-l-4 border-teal-500 text-teal-800 p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-2xl font-bold">Résultats du Quiz</h3>
                    <p className="mt-2 text-lg">Votre score est de <span className="font-extrabold">{score}</span> sur <span className="font-extrabold">{maxScore}</span>.</p>
                </div>
            )}
            <div>
                {QUIZ_DATA.map(renderQuestion)}
            </div>
            {!showResults && (
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-teal-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300"
                    >
                        Valider mes réponses
                    </button>
                </div>
            )}
        </div>
    )
};

export default Quiz;
