const { GoogleGenerativeAI } = require("@google/generative-ai");

class Gemini {
    constructor(api_key) {
        this.genAI = new GoogleGenerativeAI(api_key);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-pro"});
    }

    async run(prompt) {
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    }
    uuid() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    async startChat(){
        const chat = this.model.startChat({
            history: [],
            generationConfig: {
              maxOutputTokens: 100,
            },
        });
        return {id:this.uuid(),chat};
    }
    async runChat(chat,message){
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();
        return text;
    }
      
}
module.exports = Gemini;