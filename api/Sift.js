// api/sift.js
export default async function handler(req, res) {
    const { text } = req.body;
    const apiKey = process.env.GEMINI_API_KEY; // Pulled from Vercel Environment Variables

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Summarize this messy text into 3 actionable bullet points: " + text }] }]
            })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        res.status(200).json({ summary: aiText });
    } catch (error) {
        res.status(500).json({ error: "AI Sifting failed" });
    }
}
