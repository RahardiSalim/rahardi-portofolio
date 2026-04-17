# RefChecker - Citation Recommendation System

## Metadata

**Type:** Competition Project  
**Date:** January 2025  
**Status:** Completed  
**Award:** 🥇 1st Place + Most Creative Approach - GammaFest 2025  

**Technologies:** Python, NLP, BERT, Graph Neural Networks, Neo4j, FastAPI, React, NetworkX, Scikit-learn

**Links:**
- 🔗 GitHub: [Add your repository URL here](https://github.com/yourusername/refchecker)
- 📹 Demo Video: [Add demo URL here](https://youtube.com/...)
- 📊 Presentation: [Add presentation URL here](https://docs.google.com/presentation/...)
- 🏆 Related Competition: [GammaFest 2025](../../03-competitions-and-awards/gammafest-2025-citation-system-gold/description.md)

**Team Size:** [Add team size]  
**Role:** [Add your specific role]

---

## Short Description

Award-winning citation recommendation system combining NLP semantic analysis with graph-based authority metrics, achieving high precision in academic paper discovery through multimodal approach to citation networks.

## Long Description

RefChecker emerged from the GammaFest 2025 challenge to reimagine academic citation discovery. Traditional citation tools rely on simple keyword matching or collaborative filtering, missing the nuanced relationships between papers that make certain citations particularly valuable.

Our innovation was combining semantic understanding from transformer models with graph-based authority analysis. The system extracts meaning from paper abstracts using BERT embeddings while simultaneously analyzing citation network structure with graph neural networks.

The result: recommendations that balance relevance with impact, surfacing both seminal works and emerging research aligned with the author's needs. The dual-approach earned us both first place and the Most Creative Approach award, validating that hybrid methodologies can outperform single-technique solutions.

**Key Features:**
- Semantic similarity using fine-tuned BERT on academic abstracts
- Graph authority metrics from citation network topology  
- Temporal relevance scoring favoring recent high-impact work
- Contextual explanations for why each citation is recommended
- Real-time recommendation API with sub-second response times

**Technical Highlights:**
- Processed 1M+ academic papers into knowledge graph
- Implemented hybrid ranking combining semantic + graph scores
- Deployed production-ready API handling 100+ req/sec
- Created interactive visualization of citation relationships

This project demonstrated that thoughtful architecture combining complementary AI techniques creates more useful systems than relying on single state-of-the-art models alone.
