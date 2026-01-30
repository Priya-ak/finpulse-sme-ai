
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { generateSpeech } from '../services/geminiService';

interface AIAssistantCardProps {
  summary?: string;
}

const AIAssistantCard: React.FC<AIAssistantCardProps> = ({ summary }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const decodeAudio = async (base64: string, ctx: AudioContext) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const dataInt16 = new Int16Array(bytes.buffer);
    const frameCount = dataInt16.length;
    const buffer = ctx.createBuffer(1, frameCount, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  };

  const handleSpeak = async () => {
    if (isPlaying) {
      audioSource?.stop();
      setIsPlaying(false);
      return;
    }

    if (!summary) return;

    setIsLoading(true);
    const base64Audio = await generateSpeech(summary);
    
    if (base64Audio) {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      setAudioContext(ctx);
      const buffer = await decodeAudio(base64Audio, ctx);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => setIsPlaying(false);
      source.start(0);
      setAudioSource(source);
      setIsPlaying(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="glass-card rounded-[2.5rem] p-8 relative overflow-hidden flex flex-col items-center justify-center h-full min-h-[400px]">
      <div className="absolute top-8 left-8">
        <h3 className="text-xl font-medium text-slate-200">AI Financial Guru</h3>
      </div>
      
      <div className="relative w-64 h-64 flex items-center justify-center">
        <div className={`absolute inset-0 bg-blue-500/20 rounded-full blur-3xl opacity-30 ${isPlaying ? 'animate-pulse' : ''} orb-animation`}></div>
        <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          <circle 
            cx="100" 
            cy="100" 
            r={isPlaying ? 90 : 80} 
            fill="url(#orbGradient)" 
            className={`transition-all duration-700 ${isPlaying ? 'scale-110' : 'orb-animation'}`} 
          />
          {[...Array(20)].map((_, i) => (
            <circle
              key={i}
              cx={100 + Math.sin(i) * (isPlaying ? 80 : 60)}
              cy={100 + Math.cos(i) * (isPlaying ? 80 : 60)}
              r={Math.random() * 3}
              fill="white"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>

        <button 
          onClick={handleSpeak}
          disabled={isLoading || !summary}
          className="absolute bottom-[-5%] bg-blue-600/20 border border-blue-500/30 text-blue-400 px-8 py-3 rounded-full text-sm font-bold backdrop-blur-md hover:bg-blue-600/30 transition-all flex items-center gap-2"
        >
          {isLoading ? <Loader2 className="animate-spin" size={18} /> : isPlaying ? <VolumeX size={18} /> : <Volume2 size={18} />}
          {isPlaying ? 'Stop Assistant' : 'Explain Health'}
        </button>
      </div>

      <div className="mt-12 text-center max-w-xs">
        <p className="text-lg text-slate-300 leading-relaxed italic">
          {summary ? `Ready to narrate your analysis.` : `Upload your financial data for a deep dive assessment.`}
        </p>
      </div>
    </div>
  );
};

export default AIAssistantCard;
