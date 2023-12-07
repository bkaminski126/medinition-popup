import HighlightPop from "react-highlight-pop";
import "./index.css";
import { useState } from "react";
import OpenAI from "openai";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function App() {
  const [val, setVal] = useState(
    "Highlight over a medical word or phrase to see its definition here! Powered by ChatGPT."
  );
  const [saveVal, setSaveVal] = useState(" Welcome to Medinition!");
  const [response, setResponse] = useState();
  const [lang, setLang] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const openai = new OpenAI({
    apiKey: process.env["REACT_APP_OPENAI_API_KEY"],
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    async function main(val) {
      setLoading(true);
      openai.chat.completions
        .create({
          messages: [
            {
              role: "system",
              content:
                `You are an assistant that defines health-related words for potential patients. 
                Give a definition of the term provided in relatively simple English, in less than 50 words.
                If the term is not related to health, say 'N/A'. 
                Write the definition, and only the definition, without rewriting the word first. Term: 
                ` + val.slice(0, 50).trim(),
            },
          ],
          model: "gpt-3.5-turbo",
        })
        .then((r) => {
          setResponse(r["choices"]["0"]["message"]["content"]);
          setLoading(false);
        });
    }
    main(val);
  }, [val]);

  return (
    <div className="App m-5">
      <HighlightPop
        place="bottom"
        popoverItems={() => (
          <div className="w-60 md:w-[400px] flex items-center flex-col text-center content-center bg-transparent p-[15px] m-0">
            <p
              className="font-serif font-bold text-lg text-[#1B6EF2] drop-shadow mb-[5px]"
              id="test-title"
            >
              {val.slice(0, 50).trim()}
            </p>
            {/* <hr className="border-slate-400 border-2 w-[80%] m-[5px] h-0" /> */}
            <p className="font-sans text-base text-slate-200" id="popup-text">
              {loading
                ? "Loading..."
                : response.trim().toUpperCase() === "N/A"
                ? "Not a medical term."
                : response.trim()}
            </p>
            <p className="pt-2 text-sm text-slate-200 font-sans">
              {response !== "N/A" && !loading && (
                <button
                  className={"text-blue-400 mr-2 hover:text-blue-100"}
                  onClick={() => {
                    let prevVal = cookies.medinitions
                      ? cookies.medinitions
                      : "";
                    setCookie(
                      "medinitions",
                      prevVal +
                        "<split>" +
                        val.slice(0, 50).trim() +
                        "<val>" +
                        response
                    );
                  }}
                >
                  {"Save Medinition"}
                </button>
              )}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://rvohealth.slack.com/archives/C066QQN27R8"
                className="text-blue-400 hover:text-blue-200"
              >
                Report Issue
              </a>
            </p>
          </div>
        )}
        onHighlightPop={() => {
          setVal(window.getSelection().toString());
        }}
      >
        <p className="text-3xl mb-5 font-bold">
          Colds vs. allergies: How to tell the difference
        </p>
        <p className="text-lg mb-5">
          Since colds and allergies have many of the same symptoms, it may be
          hard to tell the two conditions apart.
        </p>
        <p className="text-2xl font-bold mb-5">What are they?</p>
        <p className="text-lg mb-5">
          {" "}
          A cold, also known as the common cold, is caused by a virus. Many
          different types of viruses are responsible for colds. While the
          symptoms and severity may vary, colds generally share some basic
          characteristics. Despite its name, you can get a cold at any time of
          the year, even in summer. The Centers for Disease Control and
          Prevention (CDC) estimate that the average healthy adult gets two or
          three colds per year.
        </p>
        <p className="text-lg mb-5">
          Allergies occur when your immune system has an adverse reaction to
          certain substances. When you’re exposed to an allergy trigger, known
          as an allergen, your immune system releases multiple chemicals called
          histamine. This release of histamine is what causes allergy symptoms.
        </p>
        <p className="text-lg mb-5">
          Every year, more than 50 million U.S. adults experience allergies.
          Seasonal allergens such as tree, grass, and weed pollen are common
          triggers, but you might be allergic to certain substances year-round.
          Other allergy triggers can include:{" "}
        </p>
        <ul className="ml-5 list-disc">
          <li>dust mites</li>
          <li>animal dander or saliva, such as from a cat or dog</li>{" "}
          <li>mold</li>{" "}
          <li>foods, such as peanuts, tree nuts, milk, and eggs.</li>
        </ul>
      </HighlightPop>
    </div>
  );
}

export default App;
