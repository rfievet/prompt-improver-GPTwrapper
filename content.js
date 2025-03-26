chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "send_prompt") {
        const chatInput = document.getElementById("prompt-textarea");

        if (chatInput) {
            chatInput.innerHTML = `<p>${message.prompt}</p>`;
            chatInput.dispatchEvent(new Event("input", { bubbles: true }));

            // Simulate pressing Enter
            const enterEvent = new KeyboardEvent("keydown", {
                bubbles: true,
                cancelable: true,
                key: "Enter",
                code: "Enter"
            });
            chatInput.dispatchEvent(enterEvent);
        } else {
            console.error("ChatGPT input box not found.");
        }
    }
});