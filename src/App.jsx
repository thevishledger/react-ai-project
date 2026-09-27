import { useState } from "react";
import "./App.css";
import { URL } from "./constants";
import Answer from "./components/Answer";

function App() {
  const [question, setQuestion] = useState("");
  const [result, SetResult] = useState(undefined);

  const askQuestion = async () => {
    const payload = {
      contents: [
        {
          parts: [{ text: question }],
        },
      ],
    };

    let response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    response = await response.json();
    console.log(response);

    if (!response.candidates || response.candidates.length === 0) {
      SetResult(["SERVER ERROR TRY AGAIN"]);
      return;
    }

    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    SetResult(dataString);
  };

  return (
    <div className="grid grid-cols-5 h-screen text-center bg-zinc-900">
      <div className="col-span-1 bg-zinc-800 text-white p-4 text-left">
        <h2 className="text-xl font-semibold">AI Tool</h2>
      </div>
      <div className="col-span-4 p-10">
        <div className="container h-110 overflow-y-auto">
          <ul className="text-white space-y-2">
            {result &&
              result.map((item, index) => (
                <li key={index} className="text-left p-1">
                  <Answer
                    ans={item}
                    totalResult={result.length}
                    index={index}
                  />
                </li>
              ))}
          </ul>
        </div>
        <div className="bg-zinc-800 w-1/2 p-1 pr-2 text-white m-auto rounded-4xl h-16 border border-zinc-700 flex items-center">
          <input
            onChange={(event) => setQuestion(event.target.value)}
            value={question}
            type="text"
            className="w-full h-full p-3 outline-none bg-transparent"
            placeholder="Ask me anything"
          />
          <button
            onClick={askQuestion}
            className="bg-white text-zinc-900 px-5 py-2 rounded-full font-medium hover:bg-zinc-200 transition"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
