from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
import PyPDF2 as pdf
from dotenv import load_dotenv
import json


load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def get_gemini_response(input_text):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(input_text)
    return response.text

def input_pdf_text(uploaded_file):
    reader = pdf.PdfReader(uploaded_file)
    text = ""
    for page_num in range(len(reader.pages)):
        page = reader.pages[page_num]
        text += page.extract_text()
    return text

input_prompt = """
You are an experienced Application Tracking System (ATS) with expertise in evaluating resumes
for a wide range of job roles across different industries. Your task is to assess the candidate's
suitability for the role based on the provided job description.

Please assign a percentage match based on how well the resume aligns with the job description
and highlight any missing keywords with high accuracy.

Key areas to evaluate:
- Relevant skills and competencies
- Professional experience and achievements
- Educational background and qualifications
- Certifications and training
- Knowledge of industry-specific tools and technologies
- Soft skills and personal attributes
- Alignment with the job responsibilities and requirements

resume: {text}
job_description: {job_description}

I want the response in a structured format:
{{"JD Match": "%", "MissingKeywords": [], "Profile Summary": ""}}
"""

@app.route('/process', methods=['POST'])
def process():
    job_description = request.form['job_description']
    uploaded_file = request.files['resume']
    
    try:
        resume_text = input_pdf_text(uploaded_file)
        input_prompt_filled = input_prompt.format(text=resume_text, job_description=job_description)
        response = get_gemini_response(input_prompt_filled)
        response_json = json.loads(response)
        
        return jsonify(response_json)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
