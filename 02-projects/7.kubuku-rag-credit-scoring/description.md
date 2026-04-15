# KuBuku - RAG-Powered Credit Scoring for Ultra-Micro Businesses

## Metadata

**Type:** Hackathon Project  
**Date:** November 2025  
**Status:** Completed  
**Award:** 🥉 3rd Place - Amartha x GDG Jakarta Hackathon  

**Technologies:** Google Gemini 2.0 Flash, Python, RAG, BM25, Pinecone, Vector Database, LightGBM, FastAPI, React

**Links:**
- 🔗 GitHub: [Add your repository URL here](https://github.com/yourusername/kubuku)
- 📹 Demo Video: [Add demo URL here](https://youtube.com/...)
- 📊 Presentation: [Add presentation URL here](https://docs.google.com/presentation/...)
- 🏆 Related Competition: [GDG Jakarta Hackathon 2025](../../03-competitions-and-awards/gdg-jakarta-hackathon-2025-bronze/description.md)

**Team Size:** [Add team size]  
**Role:** [Add your specific role]

---

## Short Description

AI-powered credit scoring system achieving 90%+ retrieval recall and 11 RMSE using Google Gemini 2.0 Flash multimodal ingestion, hybrid RAG (BM25 + Pinecone), and custom Kubuku Score Index algorithm for credit invisibility solutions.

## Long Description

KuBuku reimagines credit assessment for Indonesia's ultra-micro business sector—street vendors, home-based producers, and small shop owners operating outside traditional financial systems. The core challenge: how do you assess creditworthiness when conventional documentation doesn't exist?

## The Problem

Indonesia's ultra-micro entrepreneurs face systematic exclusion from formal lending. Banks require tax returns, bank statements, and financial histories that informal businesses don't generate. This "credit invisibility" traps talented entrepreneurs in subsistence, unable to access capital for growth at reasonable rates.

Traditional credit scoring assumes structured financial data. But ultra-micro businesses operate in cash, maintain minimal records, and have irregular income streams. Existing models simply don't work for this population.

## The Solution

KuBuku builds on a fundamental insight: ultra-micro entrepreneurs possess rich information about their businesses—it's just not in formats banks recognize. They can describe their operations, show their inventory, discuss customer patterns, and explain seasonal variations. Our system extracts creditworthiness signals from these natural interactions.

### Architecture

**Multimodal Ingestion** - Google Gemini 2.0 Flash processes both voice recordings and images. Entrepreneurs describe their business in natural conversation or photograph their shop/inventory. The system structures these unstructured inputs into analyzable data.

**Hybrid RAG System** - We implemented dual-retrieval combining BM25 sparse search for keyword precision with Pinecone dense vector search for semantic understanding. This achieved over 90% recall on financial literacy queries, enabling entrepreneurs to ask questions in natural Indonesian and receive relevant guidance.

**Kubuku Score Index (KSI)** - Our custom credit scoring algorithm synthesizes unstructured behavioral data into risk assessments. Instead of requiring traditional financial documents, KSI analyzes business descriptions, inventory photos, sales patterns, customer interactions, and comparative industry data.

The KSI model predicts credit scores with 11 RMSE, demonstrating that alternative data can support responsible lending decisions. This accuracy makes the difference between a research prototype and a deployable system.

## Technical Deep Dive

The retrieval architecture balances speed and accuracy. BM25 provides fast, exact keyword matching—crucial when answering specific regulatory questions. Dense vector retrieval captures semantic relationships—understanding that "modal usaha" (business capital) relates to "pinjaman" (loans) even without shared keywords.

Pinecone's vector database enables real-time similarity search at scale. As the knowledge base grows with more financial literacy content and regulatory updates, the system maintains query performance.

Google Gemini 2.0 Flash handles multimodal ingestion with impressive Indonesian language understanding. Processing voice requires handling varied dialects, speaking patterns, and background noise from market environments. Image processing deals with varying lighting, angles, and clutter in real shop photos.

The KSI algorithm combines multiple signals: descriptive features from business narratives, visual features from inventory/shop images, temporal patterns in described sales cycles, and contextual factors like location and industry. An ensemble approach aggregates these diverse signals into coherent risk scores.

## Impact

KuBuku addresses a market gap affecting millions. Indonesia has roughly 60 million micro-enterprises, most struggling to access affordable financing. Even small improvements in credit assessment accuracy could unlock billions in productive lending.

But technical excellence alone doesn't create impact. The system must be usable by people with varying digital literacy, work in environments with unreliable connectivity, and integrate with existing financial infrastructure.

The multimodal interface lowers barriers. Voice descriptions work for users uncomfortable with text entry. Photo capture is intuitive and fast. The RAG system provides financial literacy education alongside assessment, empowering entrepreneurs with knowledge they can use regardless of whether they receive loans.

## Lessons Learned

**Multimodal AI Opens New Doors** - Supporting voice and image inputs fundamentally expands who can access AI systems. Text-only interfaces exclude significant populations.

**Hybrid Approaches Outperform Single Methods** - Combining sparse and dense retrieval beats either alone. Different retrieval methods capture complementary relevance signals.

**Domain Adaptation Matters** - Indonesian-language financial content required careful tuning. Generic English-trained models struggled with nuances in Indonesian business terminology.

**Alternative Data Shows Promise** - Traditional credit scoring isn't the only way. Behavioral signals and unstructured data contain genuine predictive information if properly extracted.

## Future Directions

Production deployment would require handling privacy/security for sensitive financial data, integration with banking systems and regulatory frameworks, scalability testing with thousands of simultaneous users, and continuous model updates as lending outcomes provide feedback.

The KSI algorithm could deepen with more data, incorporating repayment outcomes to refine risk predictions. The RAG knowledge base could expand with region-specific content, industry-specific guidance, and multilingual support for Indonesia's linguistic diversity.

KuBuku demonstrates that thoughtful AI application can address real social challenges. Financial inclusion isn't just morally important—it's economically rational, unlocking productive capacity currently trapped by systemic barriers.
