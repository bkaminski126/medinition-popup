import React, { useState, useEffect } from 'react';
// import './highlight.css';

export default function Highlighter() {
  const [highlightedText, setHighlightedText] = useState(
    'highlighted text will be shown here!'
  );
  useEffect(() => {
    const saveSelection = () => {
      setHighlightedText(window.getSelection().toString());
    };
    document.addEventListener('mouseup', saveSelection);
    return () => document.removeEventListener('mouseup', saveSelection);
  }, []);
  return (
    <>
      <section className="card">
        <div>
          <div className="margin-top-zero txt">
            Here is react text highlighter with hook and use state/Effect, 
            understand if you have any question just email or add issue in above git ripo!
         
          </div>
          {/* {ghasem} */}
          <div className="txt">{highlightedText}</div>
          <div // parent of button
          >
            <button className="btn"> Add Highlighted text </button>
          </div>
        </div>
      </section>
    </>
  );
}