import "./index.css";
import { useState, useEffect } from "react";
import OpenAI from "openai";
import Medinition from "./components/Medinition";

function App() {
  const [sel, setSel] = useState("");
  useEffect(() => {
    const saveSelection = () => {
      setSel(window.getSelection().toString());
    };
    document.addEventListener("mouseup", saveSelection);
    return () => document.removeEventListener("mouseup", saveSelection);
  }, []);

  return (
    <div className="App m-5">
      {sel && sel !== "" && !sel.isCollapsed && <Medinition sel={sel} />}
      <p className="text-3xl mb-5 font-bold">
        Colds vs. allergies: How to tell the difference
      </p>
      <p className="text-lg mb-5">
        Since colds and allergies have many of the same symptoms, it may be hard
        to tell the two conditions apart.
      </p>
      <p className="text-2xl font-bold mb-5">What are they?</p>
      <p className="text-lg mb-5">
        {" "}
        A cold, also known as the common cold, is caused by a virus. Many
        different types of viruses are responsible for colds. While the symptoms
        and severity may vary, colds generally share some basic characteristics.
        Despite its name, you can get a cold at any time of the year, even in
        summer. The Centers for Disease Control and Prevention (CDC) estimate
        that the average healthy adult gets two or three colds per year.
      </p>
      <p className="text-lg mb-5">
        Allergies occur when your immune system has an adverse reaction to
        certain substances. When you’re exposed to an allergy trigger, known as
        an allergen, your immune system releases multiple chemicals called
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
      <p className="text-lg mb-5">
        Allergies occur when your immune system has an adverse reaction to
        certain substances. When you’re exposed to an allergy trigger, known as
        an allergen, your immune system releases multiple chemicals called
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
    </div>
  );
}

export default App;
