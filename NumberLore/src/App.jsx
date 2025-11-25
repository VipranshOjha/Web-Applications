import React, { useState } from 'react';
import { 
  Sparkles, 
  Hash, 
  Calculator, 
  Infinity as InfinityIcon, 
  Search, 
  X,
  RefreshCcw,
  Zap,
  Binary,
  Divide,
  Shapes,
  Fingerprint
} from 'lucide-react';

// --- Custom CSS (Dark Theme) ---
const customStyles = `
  .perspective-1000 { perspective: 1000px; }
  .preserve-3d { transform-style: preserve-3d; }
  .backface-hidden { backface-visibility: hidden; }
  .rotate-y-180 { transform: rotateY(180deg); }
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

// --- New Data Structure: NUMBERS ---
const CATEGORIES = {
  DIGIT: { id: 'digit', label: 'Digit-Based', color: 'bg-emerald-500', light: 'bg-emerald-900/50', text: 'text-emerald-400', icon: Hash },
  DIVISOR: { id: 'divisor', label: 'Divisors & Factors', color: 'bg-blue-500', light: 'bg-blue-900/50', text: 'text-blue-400', icon: Divide },
  SHAPE: { id: 'shape', label: 'Sequences & Shapes', color: 'bg-amber-500', light: 'bg-amber-900/50', text: 'text-amber-400', icon: Shapes },
  IDENTITY: { id: 'identity', label: 'Unique Identity', color: 'bg-purple-500', light: 'bg-purple-900/50', text: 'text-purple-400', icon: Fingerprint },
};

const NUMBER_DATA = [
  // --- DIGIT-BASED PROPERTIES ---
  {
    id: 'automorphic',
    term: '1. Automorphic Number',
    category: 'digit',
    definition: 'A number whose square ends in the same digits as the number itself.',
    examples: [
      { input: 'Square of 5', output: '25 (Ends in 5)' },
      { input: 'Square of 6', output: '36 (Ends in 6)' },
      { input: 'Square of 25', output: '625 (Ends in 25)' },
      { input: 'Square of 76', output: '5776 (Ends in 76)' },
      { input: 'Square of 376', output: '141376' }
    ],
    emoji: 'mn'
  },
  {
    id: 'happy',
    term: '2. Happy Number',
    category: 'digit',
    definition: 'Repeatedly sum the squares of digits until you reach 1 (or loop endlessly).',
    examples: [
      { input: 'Start: 19', output: '1² + 9² = 82' },
      { input: 'Next: 82', output: '8² + 2² = 68' },
      { input: 'Next: 68', output: '6² + 8² = 100' },
      { input: 'Next: 100', output: '1² + 0 + 0 = 1 (Happy!)' },
      { input: 'Start: 7', output: 'Eventually hits 1' }
    ],
    emoji: '🙂'
  },
  {
    id: 'harshad',
    term: '3. Harshad Number',
    category: 'digit',
    definition: 'A number divisible by the sum of its own digits (also called Niven numbers).',
    examples: [
      { input: 'Number 18', output: 'Sum: 9 -> 18/9 = 2' },
      { input: 'Number 21', output: 'Sum: 3 -> 21/3 = 7' },
      { input: 'Number 153', output: 'Sum: 9 -> 153/9 = 17' },
      { input: 'Number 12', output: 'Sum: 3 -> Divisible!' },
      { input: 'Counter Ex:', output: '11 (Sum 2, not div)' }
    ],
    emoji: '➗'
  },
  {
    id: 'kaprekar_num',
    term: '4. Kaprekar Number',
    category: 'digit',
    definition: 'Square it, split the result into two parts; their sum equals the original.',
    examples: [
      { input: '9 (Square 81)', output: '8 + 1 = 9' },
      { input: '45 (Square 2025)', output: '20 + 25 = 45' },
      { input: '297 (Sq 88209)', output: '88 + 209 = 297' },
      { input: '1 (Square 01)', output: '0 + 1 = 1' },
      { input: '55 (Square 3025)', output: '30 + 25 = 55' }
    ],
    emoji: '✂️'
  },
  {
    id: 'narcissistic',
    term: '5. Narcissistic Number',
    category: 'digit',
    definition: 'Sum of digits each raised to the power of the number of digits equals the number.',
    examples: [
      { input: '153 (3 digits)', output: '1³+5³+3³ = 153' },
      { input: '370 (3 digits)', output: '3³+7³+0³ = 370' },
      { input: '371', output: '3³+7³+1³ = 371' },
      { input: '407', output: '4³+0³+7³ = 407' },
      { input: '9474 (4 digits)', output: '9⁴+4⁴+7⁴+4⁴ = 9474' }
    ],
    emoji: '🪞'
  },
  {
    id: 'palindrome',
    term: '6. Palindrome Number',
    category: 'digit',
    definition: 'A number that reads the same backward as forward.',
    examples: [
      { input: 'Simple', output: '121' },
      { input: 'Cube of 11', output: '1331' },
      { input: '5-digit', output: '58385' },
      { input: 'Even length', output: '4004' },
      { input: 'Single digit', output: 'All are palindromes' }
    ],
    emoji: '🔁'
  },
  {
    id: 'spy',
    term: '7. Spy Number',
    category: 'digit',
    definition: 'A number where the sum of digits equals the product of digits.',
    examples: [
      { input: '1124 (Sum)', output: '1+1+2+4 = 8' },
      { input: '1124 (Prod)', output: '1×1×2×4 = 8' },
      { input: '123', output: 'Sum=6, Prod=6' },
      { input: '22', output: 'Sum=4, Prod=4' },
      { input: '132', output: 'Sum=6, Prod=6' }
    ],
    emoji: '🕵️'
  },
  {
    id: 'strobogrammatic',
    term: '8. Strobogrammatic',
    category: 'digit',
    definition: 'A number that looks the same when rotated 180 degrees (upside down).',
    examples: [
      { input: 'Two digits', output: '69' },
      { input: 'Reversed', output: '96' },
      { input: 'Symmetric', output: '88' },
      { input: 'Triple', output: '101' },
      { input: 'Longer', output: '6009' }
    ],
    emoji: '🙃'
  },

  // --- DIVISOR & FACTOR PROPERTIES ---
  {
    id: 'abundant',
    term: '9. Abundant Number',
    category: 'divisor',
    definition: 'Sum of proper divisors (excluding self) is greater than the number.',
    examples: [
      { input: 'Number 12', output: '1+2+3+4+6 = 16 (>12)' },
      { input: 'Number 18', output: '1+2+3+6+9 = 21' },
      { input: 'Number 20', output: 'Sum is 22' },
      { input: 'Smallest odd?', output: '945' },
      { input: 'Type', output: 'Very common' }
    ],
    emoji: '📈'
  },
  {
    id: 'amicable',
    term: '10. Amicable Numbers',
    category: 'divisor',
    definition: 'A pair where each number equals the sum of the other\'s proper divisors.',
    examples: [
      { input: 'Partner of 220?', output: '284' },
      { input: 'Check 220', output: 'Sum divisors = 284' },
      { input: 'Check 284', output: 'Sum divisors = 220' },
      { input: 'Next pair', output: '1184 & 1210' },
      { input: 'Next pair', output: '2620 & 2924' }
    ],
    emoji: '🤝'
  },
  {
    id: 'deficient',
    term: '11. Deficient Number',
    category: 'divisor',
    definition: 'Sum of proper divisors is less than the number itself.',
    examples: [
      { input: 'Number 10', output: '1+2+5 = 8 (<10)' },
      { input: 'Number 4', output: '1+2 = 3' },
      { input: 'Number 8', output: '1+2+4 = 7' },
      { input: 'Primes?', output: 'All primes are deficient' },
      { input: 'Powers of 2', output: 'Always deficient' }
    ],
    emoji: '📉'
  },
  {
    id: 'perfect',
    term: '12. Perfect Number',
    category: 'divisor',
    definition: 'Sum of proper divisors is exactly equal to the number.',
    examples: [
      { input: 'Number 6', output: '1 + 2 + 3 = 6' },
      { input: 'Number 28', output: '1+2+4+7+14 = 28' },
      { input: 'Number 496', output: 'Sum divisors = 496' },
      { input: 'Next one', output: '8128' },
      { input: 'Common?', output: 'Extremely rare' }
    ],
    emoji: '✨'
  },

  // --- SEQUENCES & SHAPES ---
  {
    id: 'fibonacci',
    term: '13. Fibonacci Number',
    category: 'shape',
    definition: 'A sequence where each number is the sum of the two preceding ones.',
    examples: [
      { input: 'Start', output: '0, 1' },
      { input: 'Next (0+1)', output: '1' },
      { input: 'Next (1+1)', output: '2' },
      { input: 'Sequence', output: '3, 5, 8, 13...' },
      { input: 'Nature', output: 'Pinecones & Spirals' }
    ],
    emoji: '🐚'
  },
  {
    id: 'square',
    term: '14. Square Number',
    category: 'shape',
    definition: 'The product of an integer multiplied by itself. Forms a square grid.',
    examples: [
      { input: '1 x 1', output: '1' },
      { input: '2 x 2', output: '4' },
      { input: '3 x 3', output: '9' },
      { input: '4 x 4', output: '16' },
      { input: '5 x 5', output: '25' }
    ],
    emoji: '🟦'
  },
  {
    id: 'taxicab',
    term: '15. Taxicab Number',
    category: 'shape',
    definition: 'The smallest number expressible as the sum of two cubes in n distinct ways.',
    examples: [
      { input: 'Hardy-Ramanujan', output: '1729' },
      { input: 'Way 1', output: '1³ + 12³ = 1729' },
      { input: 'Way 2', output: '9³ + 10³ = 1729' },
      { input: 'Next (Ta(3))', output: '87,539,319' },
      { input: 'Origin', output: 'Ramanujan\'s Taxi' }
    ],
    emoji: '🚕'
  },
  {
    id: 'triangular',
    term: '16. Triangular Number',
    category: 'shape',
    definition: 'Numbers that can form a triangular grid (Sum of 1 to n).',
    examples: [
      { input: '1 dot', output: '1' },
      { input: 'Row 2 (1+2)', output: '3' },
      { input: 'Row 3 (1+2+3)', output: '6' },
      { input: 'Row 4 (+4)', output: '10' },
      { input: 'Row 5 (+5)', output: '15' }
    ],
    emoji: '🔺'
  },

  // --- UNIQUE IDENTITY ---
  {
    id: 'transcendental',
    term: '17. Transcendental',
    category: 'identity',
    definition: 'Cannot be the root of a polynomial equation with rational coefficients.',
    examples: [
      { input: 'Famous One', output: 'Pi (π)' },
      { input: 'Another', output: 'Euler\'s Number (e)' },
      { input: 'Algebraic?', output: 'No (Opposite)' },
      { input: 'Liouville', output: 'First proved constant' },
      { input: 'Common?', output: 'Most numbers are!' }
    ],
    emoji: '👻'
  }
];

// --- Helper Component: Dark Theme Flip Card ---
const UniversalFlipCard = ({ examples }) => {
  const [flipped, setFlipped] = useState(false);
  const [idx, setIdx] = useState(0);
  const current = examples[idx];

  const handleNext = (e) => {
    e.stopPropagation();
    setFlipped(false);
    setTimeout(() => {
      setIdx((prev) => (prev + 1) % examples.length);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div 
        className="cursor-pointer perspective-1000 w-full max-w-xs h-48 relative mb-4 group"
        onClick={() => setFlipped(!flipped)}
      >
        <div className={`w-full h-full transition-all duration-500 transform preserve-3d relative ${flipped ? 'rotate-y-180' : ''}`}>
          {/* Front (Dark) */}
          <div className="absolute w-full h-full backface-hidden bg-slate-800 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center shadow-lg group-hover:border-slate-500 transition-colors p-4 text-center">
            <span className="text-slate-400 text-xs uppercase tracking-widest mb-2 font-bold">Input / Query</span>
            <span className="text-2xl font-bold text-slate-100">{current.input}</span>
            <div className="mt-4 text-emerald-400 text-sm flex items-center gap-1 font-semibold animate-pulse">Tap to Reveal <RefreshCcw size={12}/></div>
          </div>
          {/* Back (Dark Accent) */}
          <div className="absolute w-full h-full backface-hidden bg-slate-950 border-2 border-emerald-500 rounded-2xl rotate-y-180 flex flex-col items-center justify-center text-white shadow-xl shadow-emerald-900/20 p-4 text-center">
            <span className="text-emerald-300 text-xs uppercase tracking-widest mb-2 font-bold">Result</span>
            <span className="text-2xl font-bold">{current.output}</span>
          </div>
        </div>
      </div>
      <button 
        onClick={handleNext}
        className="px-6 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm font-bold text-slate-300 hover:bg-slate-700 hover:text-white transition-all shadow-lg"
      >
        Next Example ({idx + 1}/{examples.length})
      </button>
    </div>
  );
};

// --- Main Application (Dark Theme) ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNum, setSelectedNum] = useState(null);

  const filteredNumbers = NUMBER_DATA.filter(num => {
    const matchesCategory = activeCategory === 'all' || num.category === activeCategory;
    const matchesSearch = num.term.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCardClick = (num) => {
    setSelectedNum(num);
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-emerald-500 selection:text-white pb-20">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Header (Dark) */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500 p-2 rounded-xl rotate-3 shadow-lg shadow-emerald-500/20">
                <Binary className="text-slate-900" size={24} />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
                Number<span className="text-emerald-400">Lore</span>
              </h1>
            </div>
            
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Find a number type..." 
                className="pl-10 pr-4 py-2 w-full md:w-64 rounded-full bg-slate-800 focus:bg-slate-700 border-2 border-transparent focus:border-emerald-500 outline-none transition-all text-slate-200 placeholder-slate-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filters (Dark) */}
          <div className="flex gap-2 mt-6 overflow-x-autoQl pb-2 scrollbar-hide">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-all ${activeCategory === 'all' ? 'bg-slate-100 text-slate-900 shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
            >
              All Numbers
            </button>
            {Object.values(CATEGORIES).map(cat => {
              const Icon = cat.icon;
              return (
                <button 
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 whitespace-nowrap transition-all ${activeCategory === cat.id ? `${cat.color} text-white shadow-lg scale-105` : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Grid (Dark) */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {filteredNumbers.length === 0 ? (
          <div className="text-center py-20 opacity-50 text-slate-400">
            <h2 className="text-2xl font-bold mb-2">No numbers found!</h2>
            <p>Try searching for 'Happy' or 'Perfect'.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNumbers.map(num => {
              const catTheme = Object.values(CATEGORIES).find(c => c.id === num.category);
              return (
                <div 
                  key={num.id}
                  onClick={() => handleCardClick(num)}
                  className={`group relative bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer transform hover:-translate-y-1 overflow-hidden`}
                >
                  <div className={`absolute top-0 right-0 p-3 rounded-bl-2xl ${catTheme.light}`}>
                    <span className="text-2xl">{num.emoji}</span>
                  </div>
                  
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 ${catTheme.light} ${catTheme.text}`}>
                    {catTheme.label.split(' ')[0].toUpperCase()}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-emerald-400 transition-colors">
                    {num.term}
                  </h3>
                  
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {num.definition}
                  </p>

                  <div className="flex items-center text-xs font-bold text-slate-600 group-hover:text-slate-300 transition-colors">
                    Tap to explore <RefreshCcw size={12} className="ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Detail Modal (Dark) */}
      {selectedNum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`relative p-8 ${CATEGORIES[selectedNum.category.toUpperCase()].color} text-white overflow-hidden`}>
              <button 
                onClick={() => setSelectedNum(null)}
                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              
              <Zap className="absolute -bottom-6 -right-6 text-white/20 rotate-12" size={120} />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="text-6xl bg-black/20 p-4 rounded-2xl backdrop-blur-md shadow-inner">
                  {selectedNum.emoji}
                </div>
                <div>
                  <div className="text-white/80 font-bold tracking-wider text-sm uppercase mb-1">
                    {CATEGORIES[selectedNum.category.toUpperCase()].label}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold">{selectedNum.term}</h2>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 max-h-[60vh] overflow-y-auto">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
                  <Search size={20} className="text-emerald-400" />
                  Definition
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed">{selectedNum.definition}</p>
              </div>

              {/* Interactive Section */}
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800">
                <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
                  <Calculator size={20} className="text-indigo-400" />
                  Examples
                </h3>

                <div className="flex justify-center">
                  <UniversalFlipCard examples={selectedNum.examples} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}