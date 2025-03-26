// document.getElementById("sendButton").addEventListener("click", () => {
//     const prompt = document.getElementById("promptInput").value;

//     // Send the prompt to ChatGPT's input field
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             function: insertPrompt,
//             args: [prompt]
//         });
//     });
// });

document.getElementById("sendButton").addEventListener("click", async () => {
    const promptInput = document.getElementById("promptInput");
    const prompt = promptInput.value;
    const statusMessage = document.getElementById("statusMessage");

    if (!prompt) return;

    statusMessage.textContent = "Processing...";
    // Send prompt to Ollama for improvement
    const improvedPrompt = await improvePromptWithOllama(prompt);
    console.log("Improved prompt:", improvedPrompt);

    statusMessage.textContent = "Response received!";
    // Send the improved prompt to ChatGPT
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: insertAndSubmitPrompt,
                args: [improvedPrompt]
            });
        }
    });
});


async function improvePromptWithOllama(userPrompt) {
    try {
        console.log("Sending request to Ollama...");

        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "mistral-small",  // Ensure this model exists
                prompt: `Make this prompt like a your are a senior product manager with 10 years of experience,and the most proffesional possible and you are writing a prompt for ChatGPT. Only respond with the prompt and nothing else. Here is the prompt to improve: '"${userPrompt}"'.  remember to ONLY print the prompt! do not print anything like: 'Here's an i
... mproved version of your prompt:'"`,
                stream: false
            }),
        });

        // Check if response is OK (status 200)
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        // Try to parse JSON response
        const text = await response.text();
        console.log("Raw Ollama response:", text); // Debugging step

        const data = JSON.parse(text);
        if (!data || !data.response) {
            throw new Error("Ollama returned an invalid JSON response.");
        }

        console.log("Ollama improved prompt:", data.response.trim());
        return data.response.trim() || userPrompt; // Return improved prompt, or fallback to original

    } catch (error) {
        console.error("Ollama request failed:", error);
        alert(`Ollama error: ${error.message}`);
        return userPrompt; // Fallback to original prompt if Ollama fails
    }
}

function insertAndSubmitPrompt(prompt) {
    const chatInput = document.getElementById("prompt-textarea");
    const statusMessage = document.getElementById("statusMessage");

    if (chatInput) {
        chatInput.focus();
        document.execCommand("insertText", false, prompt);
        chatInput.dispatchEvent(new InputEvent("input", { bubbles: true }));

        setTimeout(() => {
            const enterEvent = new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                key: "Enter",
                code: "Enter"
            });
            chatInput.dispatchEvent(enterEvent);
        }, 100);
    } else {
        statusMessage.textContent = "Error occurred.";

        alert("ChatGPT input box not found. Please open chat.openai.com.");
    }
}


function insertPrompt(prompt) {
    // Find ChatGPT's input box (now a <div> instead of <textarea>)
    const chatInput = document.getElementById("prompt-textarea");

    if (chatInput) {
        // Set text content and trigger input event
        chatInput.innerHTML = `<p>${prompt}</p>`;
        chatInput.dispatchEvent(new Event("input", { bubbles: true }));

        // Simulate pressing Enter to send the message
        const enterEvent = new KeyboardEvent("keydown", {
            bubbles: true,
            cancelable: true,
            key: "Enter",
            code: "Enter"
        });
        chatInput.dispatchEvent(enterEvent);
    } else {
        alert("ChatGPT input box not found. Please open chat.openai.com and start a conversation.");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById("sendButton");
    const promptInput = document.getElementById("promptInput");
    const statusMessage = document.getElementById("statusMessage");

    // sendButton.addEventListener("click", async () => {
    //     const prompt = promptInput.value;
    //     if (!prompt) return;

    //     statusMessage.textContent = "Processing...";

    //     try {
    //         // Simulating API call delay (Replace with actual API request)
    //         await new Promise(resolve => setTimeout(resolve, 2000));
    //         statusMessage.textContent = "Response received!";
    //     } catch (error) {
    //         statusMessage.textContent = "Error occurred.";
    //     }
    // });

    // Allow pressing Enter to submit the prompt
    promptInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});