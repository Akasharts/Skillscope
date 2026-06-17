import { GoogleGenerativeAI } from "@google/generative-ai";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model= genAi.getGenerativeModel({ model: "gemini-2.5-flash"});
export async function extractTextFromPDF(file)
{
    const arrayBuffer=await file.arrayBuffer();
    const pdf=await pdfjsLib.getDocument({data:arrayBuffer}).promise;
    let fullText="";
    for(let i=1;i<=pdf.numPages;i++)
    {
        const page=await pdf.getPage(i);
        const textContent=await page.getTextContent();
        const text=textContent.items.map(item=>item.str).join(' ');
        fullText+=text+"\n";
    }
    return fullText;
}
export async function analyzeResume(file)
{
    const resumeText=await extractTextFromPDF(file)
    const prompt=`You are a professional ATS resume analyzer.

                Analyze the given resume carefully from both ATS and recruiter perspectives.

                Return STRICT JSON only.

                IMPORTANT:
                - Do NOT return markdown.   
                - Do NOT add explanations outside JSON.
                - Score must be realistic and should be OUT OF 10.
                - Do NOT return text with *
                Format:

                {
                "ats_score": 0,
                "skills": [],
                "strengths": [],
                "weaknesses": [],
                "suggestions": [],
                "best_roles": []
                }

            Resume: ${resumeText}`;

    const result=await model.generateContent(prompt);
    const response=await result.response;
    const text=response.text();
     const cleanedText =
      text
         .replace(/```json/g,"")
         .replace(/```/g,"")
         .trim();

   return JSON.parse(
      cleanedText);
}
