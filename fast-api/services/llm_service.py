import json
import re
from openai import AsyncOpenAI
from core.config import settings    

client = AsyncOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)


async def test_llm():
    response = await client.chat.completions.create(
        model="meta-llama/llama-3.1-8b-instruct",
        messages=[
            {"role": "user", "content": "Reply as a hospital financial analyst saying hello"}
        ],
    )

    return response.choices[0].message.content

async def generate_recommendation_cards(financial_data):
    prompt = f"""You are a healthcare revenue cycle management expert.

Financial Data:
Risk Level: {financial_data['risk_level']}
Collection Rate: {financial_data['collection_rate']}%
Pending Percentage: {financial_data['pending_percentage']}%
Reasons: {", ".join(financial_data['reasons'])}

Generate exactly 3 actionable recommendation cards for the clinic staff.

Return ONLY valid JSON in the following format:
[
  {{
    "title": "short heading",
    "priority": "HIGH | MEDIUM | LOW",
    "action": "clear action",
    "impact": "financial impact"
  }}
]

Do not include any introductory or concluding text. Return only the JSON list.
"""

    response = await client.chat.completions.create(
        model="meta-llama/llama-3.1-8b-instruct",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,
    )

    content = response.choices[0].message.content

    # Extract JSON if the LLM was chatty
    try:
        # Find the first '[' and the last ']'
        match = re.search(r'\[.*\]', content, re.DOTALL)
        if match:
            json_str = match.group(0)
            return json.loads(json_str)
        else:
            # Fallback to direct load
            return json.loads(content)
    except Exception as e:
        print(f"Error parsing LLM response: {e}")
        # Return a fallback list to avoid crashing the whole request if validation fails
        return []
