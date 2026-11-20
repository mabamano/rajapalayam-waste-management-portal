import React, { useState, useRef, useEffect } from 'react';
import { Geminiservice, ChatMessage } from '../services/geminiService';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { X, Send, Loader2, CornerDownLeft, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SmartBinChatbotProps {
    userRole: 'ADMIN' | 'COLLECTOR' | 'HOUSEHOLD' | 'PUBLIC';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contextData?: any;
    userUid?: string;
    assignedWard?: string;
    householdId?: string;
}

export const SmartBinChatbot: React.FC<SmartBinChatbotProps> = ({
    userRole,
    contextData,
    userUid,
    assignedWard,
    householdId
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const quickQuestions = [
        "Where is the nearest Micro Compost Centre (MCC)?",
        "How do I claim my Property Tax Rebate for segregation?",
        "What are the morning collection timings in Rajapalayam?",
        "How should textile mill cotton lint be segregated?"
    ];

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = async (messageText?: string) => {
        const query = messageText || input;
        if (!query.trim()) return;

        const userMsg: ChatMessage = { role: 'user', parts: [{ text: query }] };
        setMessages(prev => [...prev, userMsg]);
        if (!messageText) setInput('');
        setIsLoading(true);

        try {
            const responseText = await Geminiservice.sendMessage(
                query,
                messages,
                {
                    role: userRole,
                    uid: userUid,
                    assignedWard,
                    householdId,
                    dataSnapshot: contextData
                }
            );

            const botMsg: ChatMessage = { role: 'model', parts: [{ text: responseText }] };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Chat error", error);
            const errorMsg: ChatMessage = { role: 'model', parts: [{ text: "Service temporarily unavailable. Please check API configuration." }] };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="h-11 px-4 rounded-none bg-white text-zinc-900 border border-zinc-300 hover:border-zinc-500 transition-colors duration-150 flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider shadow-md"
                    aria-label="Open Municipal Copilot"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="font-medium">Intelligence Copilot</span>
                    <MessageSquare className="w-3.5 h-3.5 text-zinc-500 ml-1" />
                </button>
            )}

            {isOpen && (
                <Card className="w-[360px] sm:w-[420px] h-[560px] flex flex-col rounded-none overflow-hidden border border-zinc-200 bg-white shadow-2xl z-50">
                    {/* Header */}
                    <CardHeader className="bg-zinc-50 border-b border-zinc-200 py-3 px-4 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                            <div>
                                <div className="flex items-center gap-2">
                                    <CardTitle className="text-xs font-mono uppercase tracking-wider text-zinc-950 font-semibold">
                                        Municipal SWM Intelligence
                                    </CardTitle>
                                    <Badge variant="outline" className="text-[10px] font-mono border-zinc-200 text-zinc-600 py-0 h-4 bg-white">
                                        GEMINI 2.5
                                    </Badge>
                                </div>
                                <p className="text-[10px] text-zinc-500 font-mono">RAJAPALAYAM ADVISORY PROTOCOL</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="h-7 w-7 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 rounded-none"
                        >
                            <X className="h-3.5 w-3.5" />
                        </Button>
                    </CardHeader>

                    {/* Chat Messages Body */}
                    <CardContent className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans bg-white">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col justify-center items-start text-left p-2 space-y-4">
                                <div className="space-y-1">
                                    <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-semibold">
                                        Active Query Console
                                    </div>
                                    <h4 className="font-sans font-medium text-zinc-950 text-sm">
                                        Rajapalayam Waste Management Advisor
                                    </h4>
                                    <p className="text-zinc-600 text-xs leading-relaxed max-w-[42ch]">
                                        Verified intelligence for doorstep segregation, MCC processing schedules, and municipal property tax rebates.
                                    </p>
                                </div>

                                <div className="space-y-1.5 w-full pt-3 border-t border-zinc-100">
                                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold">
                                        Standard Regulatory Prompts:
                                    </p>
                                    {quickQuestions.map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSend(q)}
                                            className="w-full text-left p-2 rounded-none bg-zinc-50 border border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100 text-zinc-800 text-xs transition-colors flex items-center justify-between group font-mono"
                                        >
                                            <span className="truncate text-[11px]">{q}</span>
                                            <CornerDownLeft className="w-3 h-3 text-zinc-400 group-hover:text-zinc-800 transition-colors shrink-0 ml-2" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex gap-2 max-w-[90%]",
                                        msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 flex items-center justify-center text-[10px] font-mono shrink-0 border font-semibold",
                                        msg.role === 'user'
                                            ? "bg-zinc-900 text-white border-zinc-900"
                                            : "bg-zinc-100 text-zinc-700 border-zinc-200"
                                    )}>
                                        {msg.role === 'user' ? 'U' : 'AI'}
                                    </div>
                                    <div
                                        className={cn(
                                            "p-3 text-xs leading-relaxed border",
                                            msg.role === 'user'
                                                ? "bg-zinc-900 text-white border-zinc-900 font-sans"
                                                : "bg-zinc-50 text-zinc-800 border-zinc-200 font-sans"
                                        )}
                                    >
                                        <p className="whitespace-pre-wrap">{msg.parts[0]?.text}</p>
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex gap-2 mr-auto items-center text-zinc-600 text-xs font-mono">
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-600" />
                                <span className="text-[11px] text-zinc-500">Querying Rajapalayam SWM corpus...</span>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </CardContent>

                    {/* Chat Input Footer */}
                    <CardFooter className="p-3 bg-zinc-50 border-t border-zinc-200 flex gap-2">
                        <Input
                            placeholder="Type regulatory or operational query..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isLoading}
                            className="h-9 text-xs bg-white border-zinc-200 focus:border-zinc-500 rounded-none text-zinc-900 placeholder:text-zinc-400 font-mono"
                        />
                        <Button
                            onClick={() => handleSend()}
                            disabled={isLoading || !input.trim()}
                            className="h-9 px-3 rounded-none bg-zinc-900 text-white hover:bg-zinc-800 font-mono text-xs uppercase shrink-0 transition-colors"
                        >
                            <Send className="h-3.5 w-3.5" />
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};
