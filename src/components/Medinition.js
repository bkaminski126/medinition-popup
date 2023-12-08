export default function Medinition(props) {
  const { sel, response, loading } = props;
  let val = sel.toString();

  let rects = Array.from(window.getSelection().getRangeAt(0).getClientRects());
  let x = Math.round((Math.max(...rects.map(r => r.left)) + Math.max(...rects.map(r => r.right))) / 2)
  console.log(x)
  let y = Math.max(...rects.map(r => r.bottom)) > 200 ? Math.round(Math.min(...rects.map(r => r.top))) : Math.round(Math.max(...rects.map(r => r.bottom)))
  console.log(y);

  return (
    <div className={`fadeIn z-20 w-60 md:w-[400px] left-[${x}px] top-[${y}px] absolute items-center flex-col text-center content-center bg-black p-[15px] m-0`}>
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
      <hr className="border-slate-400 border-2 w-[80%] m-[5px] h-0" />
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
              // let prevVal = cookies.medinitions
              //   ? cookies.medinitions
              //   : "";
              // setCookie(
              //   "medinitions",
              //   prevVal +
              //     "<split>" +
              //     val.slice(0, 50).trim() +
              //     "<val>" +
              //     response
              // );
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
