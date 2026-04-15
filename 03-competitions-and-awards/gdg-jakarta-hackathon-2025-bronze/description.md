# 3rd Place - Amartha x Google Developer Group Jakarta Hackathon 2025

## Metadata

**Competition:** Amartha x GDG Jakarta Hackathon  
**Date:** November 2025  
**Award:** 🥉 3rd Place (Bronze)  
**Project Name:** KuBuku  

**Links:**
- 📋 Project Details: [KuBuku Full Project](../../02-projects/kubuku-rag-credit-scoring/description.md)
- 📄 Certificate: [View Certificate](media/certificates/)
- 📸 Event Photos: [View Photos](media/photos/)
- 📊 Presentation: [View Slides](artifacts/ppt/)
- 👨‍💻 Code: [View Source](artifacts/code/)

---

## Short Description

Secured bronze medal with "KuBuku" AI-powered credit scoring system achieving 90%+ retrieval recall and 11 RMSE, addressing credit invisibility for ultra-micro businesses using Google Gemini 2.0 Flash and hybrid RAG.

## Long Description

The Amartha x Google Developer Group Jakarta Hackathon presented a compelling challenge: solve credit invisibility for Indonesia's ultra-micro businesses. These entrepreneurs—street vendors, small shop owners, home-based producers—operate outside traditional financial systems, lacking the documentation and credit history that banks require. How do you assess creditworthiness when conventional metrics don't exist?

Our team built KuBuku, an AI-powered dual-pipeline system that reimagines credit scoring for the underbanked. The name itself reflects our mission: "buku" means book in Indonesian, symbolizing how we help write the financial stories of those previously invisible to formal lending.

The technical architecture leveraged Google Gemini 2.0 Flash for multimodal ingestion, processing both voice recordings and images. Ultra-micro entrepreneurs often can't spend hours filling forms, but they can describe their business in conversation or snap photos of their shop. Our system transformed these natural interactions into structured financial profiles.

The retrieval component achieved over 90% recall in financial literacy queries through a hybrid search RAG system. We combined BM25 sparse retrieval for precise keyword matching with dense vector retrieval via Pinecone for semantic understanding. This meant entrepreneurs could ask questions in natural Indonesian and receive relevant, actionable financial guidance.

But the breakthrough was the Kubuku Score Index (KSI)—our custom credit scoring algorithm that synthesizes unstructured behavioral data. Instead of requiring tax returns and bank statements, KSI analyzes business descriptions, inventory photos, sales patterns, and customer interactions. The model predicted credit scores with 11 RMSE, demonstrating that alternative data could indeed support responsible lending decisions.

Competing against professional startup teams and industry practitioners, securing third place validated our approach. We weren't just building a hackathon demo—we prototyped a solution to a real problem affecting millions of Indonesian entrepreneurs.

The judges recognized not just technical execution but impact potential. KuBuku could bridge the financing gap that keeps talented entrepreneurs trapped in subsistence, unable to scale because they can't access capital at reasonable rates.

This project crystallized several lessons: multimodal AI opens new interfaces for underserved populations; hybrid retrieval systems outperform single-method approaches; and the most impactful AI applications solve human problems, not just technical puzzles.
