---
name: city-relocation-researcher
description: >
  Comprehensive multi-domain city research assistant for relocation decisions. Use this skill
  whenever a user wants to evaluate a city for living, moving, or extended stay — even without
  the word "research". Triggers: "I want to move to [city]", "what's it like to live in [city]",
  "is [city] a good place to live", "help me decide between [city A] and [city B]",
  "cost of living in [city]", "compare cities for living", or any livability question.
  Also triggers on equivalent phrases in other languages. This skill runs parallel web research
  across 7 domains — cost of living, crime, public services, accessibility, cleanliness, culture,
  and economy — and delivers a structured report with scores, a monthly cost table, pros/cons,
  and a final recommendation. Always use this skill instead of plain web search for holistic
  city evaluation.
---

# City Relocation Researcher

Skill for conducting exhaustive, multi-domain city research to help users make informed
relocation decisions. This skill produces a structured, scored, actionable report — not
just a list of web search summaries.

---

## Step 0: Clarify if Needed (optional, 1 turn max)

If the destination is ambiguous (e.g., "Jakarta" could mean the city proper or Greater Jakarta),
briefly confirm before searching. If context is clear, skip straight to research. Do not ask
multiple questions — any missing context can be inferred or stated as an assumption in the report.

---

## Step 1: Parallel Research

Conduct web searches across **all 7 domains simultaneously** using multiple queries per domain.
Do not research domains one at a time. Aim for at least 2–3 searches per domain.

Prioritize:
- Data from the last 2 years
- Specific numbers and statistics over vague qualifiers
- Balanced sources: official data, local forums, expat communities, cost-of-living databases
  (Numbeo, Expatistan), local news, government portals

### Research Domains

**1. Cost of Living**
- Monthly rent for 1BR/2BR/3BR apartments, both central and outer areas
- Grocery costs vs. eating out; local markets vs. supermarkets
- Transportation: public vs. private vehicle ownership costs
- Utilities: electricity, water, and internet monthly costs
- Compare against a reference city or national average where useful

**2. Crime & Safety**
- City crime index (Numbeo or official police statistics)
- Most common crime types and vulnerable areas
- Night safety perception; perceived police effectiveness
- Trending direction (improving or worsening over the last 3 years)
- Neighborhoods to avoid vs. recommended safe areas

**3. Public Services**
- Healthcare: hospitals nearby, public vs. private, specialist availability, national health
  insurance (e.g., BPJS in Indonesia) coverage
- Education: school quality if the user has children (infer from context or note it)
- Government services: ease of ID registration, permits, administrative paperwork
- Utilities reliability: power outage frequency, water quality
- Emergency services responsiveness

**4. Accessibility**
- Internet: average download/upload speeds, fiber availability, ISP options
- Public transit: modes available (BRT, MRT, commuter rail, local minibuses, ride-hailing),
  coverage, and reliability
- Shopping: distance to nearest mall, traditional market, supermarket, hypermarket
- Administrative services: online vs. in-person, wait times, digital adoption
- Airport/train station: distance and typical travel time

**5. Cleanliness & Environment**
- Air quality index (AQI average, worst months)
- Waste management: coverage, cleanliness of public spaces and waterways
- Flood risk: frequency, affected areas, city mitigation efforts
- Natural disaster exposure: earthquake zones, landslide risk, volcanic activity
- Green space: parks, urban forests, recreational outdoor areas

**6. Culture & Social Life**
- Local culture, social norms, and pace of life
- Openness toward newcomers and migrants from other regions
- Food scene: local cuisine quality, variety of options available
- Entertainment and recreation: nightlife, arts, sports, hobbies
- Religious/ethnic community composition; social tolerance climate
- Language: is the national language dominant day-to-day, or is a local dialect prevalent?

**7. Economy & Job Opportunities**
- Main economic sectors and largest employers
- Job market conditions for common professions
- Remote work infrastructure: co-working spaces, cafes with reliable WiFi
- Business environment: ease of starting a business, local regulations
- Regional minimum wage (UMR/UMK) as a cost-of-living reference point

---

## Step 2: Synthesize & Score

After gathering data, synthesize findings for each domain. Assign a score from 1–10 using
this rubric:

| Score | Meaning |
|-------|---------|
| 9–10  | Exceptional — a genuine strength of this city |
| 7–8   | Good — above average, with only minor drawbacks |
| 5–6   | Average — adequate but with notable issues |
| 3–4   | Below average — significant concerns |
| 1–2   | Poor — a serious deterrent to living here |

Score on absolute quality **and** relative value for money where relevant (a 5/10
cost-of-living score means: expensive relative to what you get, not just expensive in
absolute terms).

---

## Step 3: Generate the Report

ALWAYS produce the final report using this exact template:

```
# 🏙️ Relocation Research Report: [City Name]
**Research Date:** [today's date]

**Data Sources:** Multi-source web search (most recent available data)

---

## 📖 Table of Contents

- [Executive Summary](#executive-summary)
- [Livability Scores](#livability-scores)
- [Cost of Living](#cost-of-living)
- [Safety & Crime](#safety-crime)
- [Public Services](#public-services)
- [Accessibility](#accessibility)
- [Cleanliness & Environment](#cleanliness-environment)
- [Culture & Social Life](#culture-social-life)
- [Economy & Job Opportunities](#economy-job-opportunities)
- [Pros & Cons](#pros-cons)
- [Conclusion & Recommendation](#conclusion-recommendation)
- [Data Sources](#data-sources)

---

## 📋 Executive Summary

[3–4 paragraphs. Answer: What is the overall impression of this city? What are its biggest
strengths? What are the biggest challenges? Who is this city best suited for?
Don't just list facts — give a nuanced, honest assessment.]

---

## 📊 Livability Scores

| Category | Score | Quick Note |
|---|:---:|---|
| 💰 Cost of Living | X/10 | [one-line comment] |
| 🛡️ Safety | X/10 | [one-line comment] |
| 🏥 Public Services | X/10 | [one-line comment] |
| 🚇 Accessibility | X/10 | [one-line comment] |
| 🌿 Cleanliness & Environment | X/10 | [one-line comment] |
| 🎭 Culture & Social Life | X/10 | [one-line comment] |
| 💼 Economy & Opportunity | X/10 | [one-line comment] |
| **🏆 TOTAL** | **X/70** | |

---

## 💰 Cost of Living

[Detailed findings. Always include specific numbers.]

### Estimated Monthly Expenses

| Category | Estimated Cost |
|---|---|
| 1BR apartment (city center) | [currency + range] |
| 1BR apartment (outer area) | [currency + range] |
| Food (cooking at home, 1 person) | [currency + range] |
| Eating out (budget, 1 person) | [currency + range] |
| Transportation (public, monthly) | [currency + range] |
| Home internet | [currency + range] |
| Electricity (2 people) | [currency + range] |
| **Estimated Total (1 person, frugal)** | **[currency + range]** |
| **Estimated Total (1 person, comfortable)** | **[currency + range]** |

---

## 🛡️ Safety & Crime

[Detailed findings including statistics, safe vs. unsafe areas, and trends.]

---

## 🏥 Public Services

[Detailed findings: healthcare, education, government services, utilities.]

---

## 🚇 Accessibility

[Detailed findings: internet, transit, shopping, administrative services.]

---

## 🌿 Cleanliness & Environment

[Detailed findings: AQI, flood risk, cleanliness, natural disasters, green space.]

---

## 🎭 Culture & Social Life

[Detailed findings: local culture, openness to newcomers, entertainment, diversity.]

---

## 💼 Economy & Job Opportunities

[Detailed findings: economic sectors, job market, remote work infrastructure, minimum wage.]

---

## ⚖️ Pros & Cons

### ✅ Pros
- [specific points, not generic praise]
- ...

### ❌ Cons
- [specific points]
- ...

---

## 🎯 Conclusion & Recommendation

[An honest, nuanced closing. Answer:]
- Who is this city best suited for? (e.g., remote workers, young families, retirees)
- What conditions make this a good or bad choice?
- What are the first practical steps if someone decides to move here?
- Are there alternative cities worth considering?

---

## 📚 Data Sources

[List the primary sources used: site/report name, data year.]
```

---

## Quality Standards

- **Specific**: Use real numbers (e.g., $1,200/month) rather than vague qualifiers ("affordable")
- **Honest**: Don't bury serious problems to keep the report upbeat
- **Current**: Flag old data with "Data as of [year]" if no recent source is available
- **Nuanced**: Scores must reflect context — an expensive city that delivers quality is
  different from one that doesn't; score accordingly
- **Actionable**: The report should support a real decision, not just inform abstractly

---

## Output Format

Deliver the report as **formatted markdown** directly in chat. If the user asks for a visual,
PDF, or exportable format, offer to generate an interactive HTML artifact.

When comparing **two or more cities**, produce a separate full report for each, then add
a side-by-side comparison table at the end.
