# AI Context Export

## Purpose

Structured JSON knowledge for every calculator, designed for AI assistants, RAG systems, chatbots, LLMs, and clinical decision support.

## JSON Schema

```json
{
  "slug": "string",
  "title": "string",
  "category": "string",
  "specialty": "string",
  "description": "string",
  "purpose": "string",
  "formula": { "type": "string", "expression": "string" },
  "inputs": [{ "id": "string", "label": "string", "unit": "string", "required": boolean }],
  "classification": [{ "label": "string", "status": "string", "min": number, "max": number }],
  "clinicalGuidance": { "advice": [...], "warnings": [...], "followUp": [...] },
  "faq": [{ "question": "string", "answer": "string" }],
  "evidence": ["string"],
  "relatedCalculators": ["string"],
  "comparisonCalculators": ["string"],
  "navigation": { "previous": "string", "next": "string", "seeAlso": ["string"] }
}
```

## How AI Should Use the Data

1. **Load the index** (`exports/ai/index.json`) to discover all calculators
2. **Load individual context** (`exports/ai/<slug>.json`) for detailed knowledge
3. **Use the description and purpose** to explain what the calculator does
4. **Use clinical guidance** to provide medical advice context
5. **Use classification** to interpret results
6. **Use navigation** to suggest related calculators

## Example Prompts

### Explain a Calculator

```
User: "What is BMI?"
AI: Load bmi.json → Use title, description, purpose, inputs
```

### Interpret Results

```
User: "My BMI is 32"
AI: Load bmi.json → Use classification to classify as "Obese"
```

### Suggest Related

```
User: "What other calculators should I use?"
AI: Load bmi.json → Use navigation.seeAlso and relatedCalculators
```

## Example RAG Workflow

1. **Index**: Load all `exports/ai/*.json` files into vector database
2. **Embed**: Create embeddings from `title`, `description`, `purpose`, `clinicalGuidance`
3. **Retrieve**: On user query, find most relevant calculator(s)
4. **Generate**: Use retrieved context to generate accurate response
5. **Navigate**: Use navigation data to suggest follow-up calculators

## Future MCP Integration

This data can be served via MCP (Model Context Protocol) tools:

```typescript
// Example MCP tool definition
mcp.tool({
  name: "get_calculator_context",
  description: "Get AI context for a medical calculator",
  input: { slug: z.string() },
  handler: async ({ slug }) => {
    return readJSON(`exports/ai/${slug}.json`);
  }
});
```
