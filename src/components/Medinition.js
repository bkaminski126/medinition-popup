import { useState, useEffect } from "react";
import OpenAI from "openai";

export default function Medinition(props) {
  const { sel } = props;
  let val = sel;

  // let rects = Array.from(
  //   document.getSelection().getRangeAt(0).getClientRects()
  // );
  // let x = Math.round(
  //   (Math.max(...rects.map((r) => r.left)) +
  //     Math.max(...rects.map((r) => r.right))) /
  //     2
  // );
  // //adjust for center - make sure it matches with the style
  // x = x - Math.max(parseInt(window.innerWidth / 6), 125);
  // x = x < 125 ? 10 : x; //check if running off page
  // x = x > window.innerWidth - 275 ? window.innerWidth - 285 : x;

  // let y =
  //   Math.max(...rects.map((r) => r.bottom)) > 200
  //     ? Math.round(Math.min(...rects.map((r) => r.top)))
  //     : Math.round(Math.max(...rects.map((r) => r.bottom)));

  // y = y + 30;

  let x = 15;
  let y = 15;

  const [response, setResponse] = useState("N/A");
  const [loading, setLoading] = useState(false);
  // const openai = new OpenAI({
  //   apiKey: process.env["REACT_APP_OPENAI_API_KEY"],
  //   dangerouslyAllowBrowser: true,
  // });

  function checkSel(sel) {
    console.log(response);

    //sim a request from openai
    const later = (delay, value) =>
      new Promise((resolve) => setTimeout(resolve, delay, value));

    async function main() {
      setLoading(true);
      // openai.chat.completions
      //   .create({
      //     messages: [
      //       {
      //         role: "system",
      //         content:
      //           `You are an assistant that defines health-related words for potential patients.
      //           Give a definition of the term provided in relatively simple English, in less than 50 words.
      //           If the term is not related to health, say 'N/A'.
      //           Write the definition, and only the definition, without rewriting the word first. Term:
      //           ` + sel.toString().slice(0, 50).trim(),
      //       },
      //     ],
      //     model: "gpt-3.5-turbo",
      //   })
      later(
        200,
        `The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. 
      The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each
       minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] 
       Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the 
       sound, your test is over. The test will begin on the word start. On your mark, get ready, start. `.substring(
          Math.floor(Math.random() * 100),
          Math.floor(100 + Math.random() * 700)
        )
      ).then((r) => {
        // setResponse(r["choices"]["0"]["message"]["content"]);
        setResponse(r);
        setLoading(false);
      });
    }
    main();
  }
  useEffect(() => {
    checkSel(sel);
  }, [sel]);

  useEffect(() => {
    let defs = localStorage.medinitions.split("<split>").slice(1);
    defs = defs.map((r) => r.split("<val>"));
    // defs.forEach((d) => console.log(d[0] + ": " + d[1]));
  });
  return (
    <div
      style={{
        position: "fixed",
        bottom: `${y}px`,
        right: `${x}px`,
        overflowY: "auto",
        width: "33vw",
        minWidth: "300px",
        userSelect: "none",
      }}
      className={`fadeIn z-40 rounded-2xl items-center flex-col text-center content-center bg-black p-[15px] m-0`}
    >
      {response.trim() !== "N/A" && !loading ? (
        <a
          className="font-serif font-bold text-lg text-[#1B6EF2] drop-shadow mb-[5px] hover:text-blue-300"
          rel="noreferrer"
          target="_blank"
          href={
            "https://www.healthline.com/search?q1=" + val.slice(0, 50).trim()
          }
        >
          {val.slice(0, 50).trim()}
        </a>
      ) : (
        <p
          className={
            "font-serif font-bold text-lg text-[#1B6EF2] drop-shadow mb-[5px]"
          }
          id="test-title"
        >
          {val.slice(0, 50).trim()}
        </p>
      )}
      <p className="font-sans text-base text-slate-200" id="popup-text">
        {loading
          ? "Loading..."
          : response.trim() === "N/A"
          ? "Not a medical term."
          : response.trim()}
      </p>
      <p className="pt-2 text-sm text-slate-200 font-sans">
        {response !== "N/A" && !loading && (
          <button
            className={"text-blue-400 mr-2 hover:text-blue-100"}
            onClick={() => {
              let prevVal = localStorage.getItem("medinitions")
                ? localStorage.getItem("medinitions")
                : "";
              localStorage.setItem(
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
  );
}
